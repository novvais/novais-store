import bcrypt from "bcrypt";

export class Verify {
  static async encryptedPass(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async compareLogin(password: string, clientPassword: string) {
    return await bcrypt.compare(password, clientPassword);
  }
}
