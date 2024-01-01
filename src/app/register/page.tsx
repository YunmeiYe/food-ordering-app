"use client";
import Google from "@/icons/GoogleIcon";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import ModalContainer from "@/components/ModalContainer";
import { signIn } from "next-auth/react";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import { UserIcon } from "@/icons/UserIcon";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState('');

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreatingUser(true);
    setError('');
    const response = await fetch(`/api/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    if (response.error) {
      setError(response.message);
    } else {
      setUserCreated(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="my-8">
      <h1 className="text-center text-primary text-4xl my-4">
        Sign Up
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <Input
          isRequired
          label="Name"
          placeholder="Enter your full name"
          type="text"
          className="mb-3"
          size="lg"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={creatingUser}
          endContent={
            <UserIcon className={`w-6 ${creatingUser ? "stroke-gray-500 cursor-not-allowed" : ""} `}/>
          }
        />
        <EmailInput emailValue={email} setEmail={setEmail} disabled={creatingUser} />
        <PasswordInput passwordValue={password} setPassword={setPassword} disabled={creatingUser}/>
        <div className="text-red-600">{error}</div>
        <Button type="submit" disabled={creatingUser} fullWidth isLoading={creatingUser} className="font-semibold text-medium mt-4">Sign Up</Button>
        <div className="text-center mt-4 text-gray-500">
          Already have an account? {' '}
          <Link href={"/login"} >Login</Link>
        </div>
        <div className="my-3 text-center text-gray-500 grid grid-cols-3 items-center">
          <Divider />
          OR
          <Divider />
        </div>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="items-center font-semibold text-medium text-gray-700 bg-white border border-gray-300" fullWidth disabled={creatingUser}>
          <Google className={"w-6"} />
          Login with Google
        </Button>
      </form>
      <ModalContainer isOpen={userCreated} onConfirm={() => setUserCreated(false)} title={"Registration successful!"} content={"You can now log in."} redirectLink="/login" />
    </section>
  )
}

export default RegisterPage