"use client";

import { Button, Input, Spinner } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { MdContactMail } from 'react-icons/md';
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FiLogIn } from "react-icons/fi";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsButtonDisabled(!emailValue.includes("@hlsgroup.com.mx"));
  };
  
  const handleButtonClick = (provider: "google" | "github" | "twitter" | "twitch" | "microsoft-entra-id" | "AzureADProvider" | "spotify") => {
    setIsClicked(true);
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col items-center bg-white relative">
        <div className="mt-10 absolute top-0">
          <img src="/images/logos/logo_azul.jpg" alt="HLS Group" height={"150rem"} width={"380rem"} />
        </div>
        <div className="flex flex-col justify-center items-start w-3/4 h-full absolute" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <h2 className="text-2xl font-bold mb-6 text-left w-full text-[#383c7c]">Iniciar sesión</h2>
          <form className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-4" htmlFor="email">
              Correo electrónico
            </label>
            <Input
              type="email"
              placeholder="Ej: juan.perez@hlsgroup.com.mx"
              startContent={
                <MdContactMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              onChange={handleEmailChange}
              value={email}
            />
            <div className="flex justify-center mt-6">
              <button
                type="button"
                className={`bg-[#383c7c] text-center w-full rounded-2xl h-14 relative font-sans text-white text-xl font-semibold ${isButtonDisabled || isClicked ? "opacity-50 cursor-not-allowed" : "group"}`}
                onClick={() => handleButtonClick("microsoft-entra-id")}
                disabled={isButtonDisabled || isClicked}
              >
                <div className={`bg-[#489c98] rounded-xl h-12 ${isButtonDisabled || isClicked ? "" : "group-hover:w-[98.3%]"} w-[10%] flex items-center justify-center absolute left-1 top-[4px] z-10 duration-700`}>
                  {isClicked ? <Spinner color="secondary" /> : <FiLogIn />}
                </div>
                <p className="translate-x-2">{isClicked ? "Redirigiendo..." : "INGRESAR"}</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 relative">
        <img src="/images/login/robot.png" alt="Robot Hand" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default Login;
