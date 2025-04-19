import * as argon2 from 'argon2';

export class HashService {
  async createHash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async match(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
