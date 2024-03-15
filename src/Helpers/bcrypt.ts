import bcrypt from "bcrypt";

export class Verify {
  static async encryptedPass(password: string) {
    const encryptedPassword = await bcrypt.hash(password, 10);

    return encryptedPassword;
  }

  static async compareLogin(password: string, clientPassword: string) {
    const validPassword = await bcrypt.compare(password, clientPassword);

    return validPassword;
  }
}
