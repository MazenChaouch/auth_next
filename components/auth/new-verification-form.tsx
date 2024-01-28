"use client";
import {
  DotLoader,
  MoonLoader,
  PropagateLoader,
  PuffLoader,
} from "react-spinners";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { CardWapper } from "./card-wapper";
import { newverification } from "@/actions/newverification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token is Missing!");
      return;
    }
    newverification(token)
      .then((res) => {
        setSuccess(res.success);
        setError(res.error);
      })
      .catch((err) => {
        return { error: "Something went wrong!" };
      });
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWapper
      backButtonLabel="close this tab after the verification"
      headerlabel="Email verification"
      backButtonHref={"#"}
    >
      <div className="flex justify-center">
        {!success && !error ? (
          <PuffLoader size={"75px"} className="m-2" color="#000000" />
        ) : null}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWapper>
  );
};
