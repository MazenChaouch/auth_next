"use client";
import { CardWapper } from "./card-wapper";
import { FormError } from "../form-error";

export const ErrorCard = () => {
  return (
    <CardWapper
      backButtonLabel="Back to home"
      backButtonHref="/auth/login"
      headerlabel="Oops! Something went wrong"
    >
      <FormError
        message="We were unable to complete your request.
        Please try again later."
      />
    </CardWapper>
  );
};
