import { db } from "@/lib/db";

export const getForgotPasswordTokenByToken = async (token: string) => {
  const forgotPasswordToken = await db.forgotPasswordToken.findUnique({
    where: {
      token,
    },
  });
  return forgotPasswordToken;

};
export const getForgotPasswordTokenByEmail = async (email: string) => {
  const forgotPasswordToken = await db.forgotPasswordToken.findFirst({
    where: {
      email,
    },
  });

  return forgotPasswordToken;
};