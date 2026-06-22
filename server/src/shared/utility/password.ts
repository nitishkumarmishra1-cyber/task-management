import crypto from 'crypto';

export const hashPassword = (password: string): Promise<string> => {
    const salt = crypto.randomBytes(16).toString('hex');

    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100_000, 64, 'sha256', (err, derivedKey) => {
            if (err) return reject(err);
            resolve(`${salt}:${derivedKey.toString('hex')}`);
        });
    });
};

export const verifyPassword = (password: string, storedHash: string): Promise<boolean> => {
    const [salt, originalHash] = storedHash.split(':');

    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100_000, 64, 'sha256', (err, derivedKey) => {
            if (err) return reject(err);
            resolve(derivedKey.toString('hex') === originalHash);
        });
    });
};