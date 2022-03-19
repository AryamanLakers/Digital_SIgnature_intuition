
![Logo](https://cdn0.iconfinder.com/data/icons/superhero-2/256/Ironman-48.png)


# What's the goal??
I just wanted to implement how digital signatures work for authenticating the sender of the transaction request.

## How does the process work??

- First we hash our message as our message can be very long and therefore we want to compress the whole data in a small chunk.therefore hash algorithms like SHA-256 are used
- After that we make a digital signature by using elliptic curve algorithm, which combines the hash message with private key
- To verify the sender, we decrypt the message using the public key of the sender and if the decrypted message same as the original message, then the send is authenticate as only he has access to private key
- The signer does is create two identical messages: the one that anyone can read and one to accompany it, but which they lock with one of their private locks.
- Then when the receiver gets the message, they can read it, and then use the public key to unlock the locked message and compare the two messages. If the messages are the same, then they know that:
    
    -The unlocked message wasn't tampered with during travel and,

    -The message must have been from the person who has the matching lock to their public key.

