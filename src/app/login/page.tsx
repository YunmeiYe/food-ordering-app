"use client";
import GoogleIcon from "@/icons/GoogleIcon";
import { Button, Divider, Link } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState('');

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginInProgress(true);
    setError('');
    const response = await signIn('credentials', { email, password, redirect: false });
    if (response?.ok) {
      router.push('/')
    } else {
      setError("The email or password you entered is incorrect.");
    }
    setLoginInProgress(false);
  }

  return (
    <section className="my-8">
      <h1 className="text-center text-primary text-4xl my-4">
        Login
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <EmailInput emailValue={email} setEmail={setEmail} disabled={loginInProgress} />
        <PasswordInput passwordValue={password} setPassword={setPassword} disabled={loginInProgress} />
        <div className="text-red-600">{error}</div>
        <Button type="submit" disabled={loginInProgress} fullWidth isLoading={loginInProgress} className="font-semibold text-medium mt-4">Login</Button>
        <div className="text-center mt-4 text-gray-500">
          Don't have an account? {' '}
          <Link href={"/register"}>Sign Up</Link>
        </div>
        <div className="my-3 text-center text-gray-500 grid grid-cols-3 items-center">
          <Divider />
          OR
          <Divider />
        </div>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="items-center font-semibold text-medium text-gray-700 bg-white border border-gray-300" fullWidth disabled={loginInProgress}>
          <GoogleIcon className={"w-6"} />
          Login with Google
        </Button>
      </form>
    </section>
  )
}

export default LoginPage