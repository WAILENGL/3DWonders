import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useState } from "react";
import { useAtom } from "jotai";
import { loginSts } from "../../../atom";


export default function AuthPage() {
  const [state, setLoginState] = useState("signup");
  const [user, setUser] = useAtom(loginSts);

  console.log(user)
  return  <>
  {state === "login" ? <LoginForm setUser={setUser} setLoginState={setLoginState}/> :
  <SignUpForm setUser={setUser} setLoginState={setLoginState}/>}
  </>;
}
