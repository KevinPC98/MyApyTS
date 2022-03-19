import bcrypt from "bcryptjs";
export interface IUser {
  username: string;
  email: string;
  password: string;
  //validatePassword(password: string): Promise<boolean>
  //solving fryday
}

export const encrypPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const validatePassword = async function (
  password: string,
  contrasenia: string
): Promise<boolean> {
  return await bcrypt.compare(password, contrasenia);
};
