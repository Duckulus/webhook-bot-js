import nacl from 'tweetnacl';

export function auth(public_key: string) {
  return (req, res, next) => {
    const signature = req.headers['x-signature-ed25519'] as string;
    const timestamp = req.headers['x-signature-timestamp'];

    let isVerified;
    let error;
    try {
      isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + JSON.stringify(req.body)),
        Buffer.from(signature, 'hex'),
        Buffer.from(public_key, 'hex')
      );
    } catch (e) {
      error = e;
    }

    if (error || !isVerified) {
      res.status(401).send('Unauthorized');
      return;
    } else {
      next();
    }
  };
}
