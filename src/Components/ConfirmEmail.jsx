import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { app } from "./realmConfig";

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    async function confrimUser() {
      try {
        const token = searchParams.get("token");
        const tokenId = searchParams.get("tokenId");
        await app.emailPasswordAuth.confirmUser(token, tokenId);
        alert("successfully confirmed");
      } catch (error) {
        alert(error);
      }
    }
    confrimUser();
  });
  return;
}
