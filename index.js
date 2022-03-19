const crypto = require("crypto"); //module for hashing,creating keys and signature verification
const secp256k1 = require("secp256k1"); //module for using Elliptic Curve Digital Signature Algorithm
const SECRET_KEY_LENGTH = 32;
class client {
  constructor() {
    this.public_key = null;
    this.private_key = null;
  }
  //we generate private and public key for an object
  async createIdentity() {
    let private_key = await this.generateValidKey();
    let public_key = secp256k1.publicKeyCreate(private_key);
    this.setter(public_key, private_key);
    return new Promise((res) => {
      const object = {
        pubKey: public_key,
        priKey: private_key
      };
      res(object);
    });
  }
  //generating random private key
  generateValidKey() {
    while (true) {
      let privKey = crypto.randomBytes(SECRET_KEY_LENGTH);
      if (secp256k1.privateKeyVerify(privKey))
        return new Promise((res) => res(privKey));
    }
  }
  setter(pubk, prik) {
    this.public_key = pubk;
    this.private_key = prik;
  }
  //to convert the message to Uint8Array for sec256-elliptic curve that we are considering
  MessageConversion(msg) {
    return crypto.createHash("sha256").update(msg).digest("Uint8Array");
  }
  //we encrypt hashed message with private key
  encryptWithPublicKey(priKey, msg) {
    var hash = crypto.randomBytes(SECRET_KEY_LENGTH);
    const signObj = secp256k1.ecdsaSign(msg, priKey);
    return signObj;
  }
  //this method would return true if we decrypted the same message
  decryptWithPrivateKey(pubKey, encrypted, msg) {
    return secp256k1.ecdsaVerify(encrypted.signature, msg, pubKey);
  }
}
const alice = new client();
const bob = new client();
(async () => {
  const aliceKeys = await alice.createIdentity();
  const bobKeys = await bob.createIdentity();

  const secretMessage = "hello there!!";
  const secretMessage1 = "heo there!!";

  const converted_message1 = alice.MessageConversion(secretMessage);
  const converted_message2 = alice.MessageConversion(secretMessage1);

  const encrypted = alice.encryptWithPublicKey(
    aliceKeys.priKey,
    converted_message1
  );
  const decrypted = await bob.decryptWithPrivateKey(
    aliceKeys.pubKey,
    encrypted,
    converted_message2
  );
  console.log(decrypted);
})();
