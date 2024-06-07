import z from "zod";
import { instruments } from "prisma/seedData";

export const isEmailValid = (email: string) => {
  const emailSchema = z.string().email();

  const parsedEmail = emailSchema.safeParse(email);

  return parsedEmail.success;
};

export const phoneValidation = z.string().refine(value => /^1?\d{10}$/.test(value));
export const instNameValidation = z.string().refine(
    (val) => instruments.includes(val),
    (val) => ({ message: `${val} is not a valid instrument!` }),
  )

export const isPhoneValid = (number: string) => {

  const parsedNum = phoneValidation.safeParse(number)
  return parsedNum.success
}

export const gigFormErrors = {
  name: "Name must include 3 or more characters",
  venue: "Venue must be valid venue",
  startTime: "Start Time must be a date",
  endTime: "End Time must be a date",
  instrumentation: "Gig must have at least 1 instrument",
  musicians: "Gig must have at least 1 musician",
  pay: "Pay must be a number above 0"

}

export const userProfileErrors = {
  name: "Name must include 3 or more characters",
  phoneNumber: "Number must be a valid phone number",
  email: "Email must be a valid email address",
  instrumentation: "All instruments must be a valid instrument"
}
