"use client";
import Google from "@/icons/Google";
import { Button, Divider } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import ModalContainer from "@/components/layout/ModalContainer";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginInProgress(true);
    const response = await signIn('credentials', { email, password, redirect:false});
    if (response?.ok) {
      router.push('/')
    } else {
      setError(true);
    }
    setLoginInProgress(false);
  }

  return (
    <section className="my-8">
      <h1 className="text-center text-primary text-4xl my-4">
        Login
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} disabled={loginInProgress} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} disabled={loginInProgress} />
        <Button type="submit" disabled={loginInProgress} fullWidth isLoading={loginInProgress} className="font-semibold text-medium">Login</Button>
        <div className="text-center mt-4 text-gray-500">
          Don't have an account? {' '}
          <Link href={"/register"} className="underline text-secondary">Sign Up</Link>
        </div>
        <div className="my-3 text-center text-gray-500 grid grid-cols-3 items-center">
          <Divider />
          OR
          <Divider />
        </div>
        <Button
          onClick={()=>signIn('google', { callbackUrl:'/'})}
          className="items-center font-semibold text-medium text-gray-700 bg-white border border-gray-300" fullWidth disabled={loginInProgress}>
          <Google className={"w-6"} />
          Login with Google
        </Button>
      </form>
      <ModalContainer isOpen={error} onConfirm={() => setError(false)} title={"Error"} content={"Oops, something went wrong. Please try again later."} />
    </section>
  )
}

export default LoginPage