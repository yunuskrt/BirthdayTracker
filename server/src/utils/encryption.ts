import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export const encryptPassword = async (password:string, encryptionKey: string) : Promise<string> => {
  const iv = randomBytes(16);
  // In this case for aes256, it is 32 bytes.
  const key = (await promisify(scrypt)(encryptionKey, 'salt', 32)) as Buffer;

  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const encryptedText = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);

  const encryptedString = `${iv.toString('hex')}:${encryptedText.toString('hex')}`;
  return encryptedString;
};

export const decryptPassword = async (encryptedPass: string, encryptionKey: string) => {
    const [ivString, encryptedTextString] = encryptedPass.split(':');

    // get iv buffer and encrypted text buffer
    const ivBuffer = Buffer.from(ivString, 'hex');
    const encryptedBuffer = Buffer.from(encryptedTextString, 'hex');

    const key = (await promisify(scrypt)(encryptionKey, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, ivBuffer);
    
    const decryptedText = Buffer.concat([
        decipher.update(encryptedBuffer),
        decipher.final(),
    ]);
    return decryptedText.toString();    
}