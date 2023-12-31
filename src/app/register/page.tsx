"use client";
import Google from "@/icons/Google";
import { Button, Divider } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import ModalContainer from "@/components/layout/ModalContainer";
import Link from "next/link";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreatingUser(true);
    const response = await fetch(`/api/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password}),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      setUserCreated(true);
      setEmail('');
      setPassword('');
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="my-8">
      <h1 className="text-center text-primary text-4xl my-4">
        Sign Up
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} disabled={creatingUser} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} disabled={creatingUser} />
        <Button type="submit" disabled={creatingUser} fullWidth isLoading={creatingUser} className="font-semibold text-medium">Sign Up</Button>
        <div className="text-center mt-4 text-gray-500">
          Already have an account? {' '}
          <Link href={"/login"} className="underline text-secondary">Login</Link>
        </div>
        <div className="my-3 text-center text-gray-500 grid grid-cols-3 items-center">
          <Divider />
          OR
          <Divider />
        </div>
        <Button
          onClick={()=>signIn('google', { callbackUrl:'/'})}
          className="items-center font-semibold text-medium text-gray-700 bg-white border border-gray-300" fullWidth disabled={creatingUser}>
          <Google className={"w-6"} />
          Login with Google
        </Button>
      </form>
      <ModalContainer isOpen={userCreated} onConfirm={() => setUserCreated(false)} title={"Congratulations!"} content={"Registration successful! You can now log in."} redirectLink="/login"/>
      <ModalContainer isOpen={error} onConfirm={() => setError(false)} title={"Error"} content={"Oops, something went wrong. Please try again later."}/>
    </section>
  )
}

export default RegisterPage