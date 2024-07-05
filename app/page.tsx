import { Metadata } from "next";
import Login from "./auth/login/page";

export const metadata: Metadata = {
  title:
    "HLS Group | Inicio de Sesión",
};

export default function Home() {
  return (
    <>
        <Login/> 
    </>
  );
}
