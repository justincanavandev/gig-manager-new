import z from "zod";

export const isEmailValid = (email: string) => {
  const emailSchema = z.string().email();

  const parsedEmail = emailSchema.safeParse(email);

  return parsedEmail.success;
};

export const isPhoneValid = (number: string) => {
  const phoneSchema = z.string().refine(value => /^1?\d{10}$/.test(value));
  
  const parsedNum = phoneSchema.safeParse(number)
  return parsedNum.success
}
