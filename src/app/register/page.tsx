"use client";
import GoogleIcon from "@/icons/GoogleIcon";
import { Button, Divider, Link } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import ModalContainer from "@/components/ModalContainer";
import { signIn } from "next-auth/react";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import NameInput from "@/components/NameInput";

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
      <form className="block max-w-lg mx-auto mt-12" onSubmit={handleFormSubmit}>
        <NameInput nameValue={name} setName={setName} disabled={creatingUser} className={"mb-4"} />
        <EmailInput emailValue={email} setEmail={setEmail} disabled={creatingUser} className={"mb-4"} />
        <PasswordInput passwordValue={password} setPassword={setPassword} disabled={creatingUser}/>
        <div className="text-red-600 my-2">{error}</div>
        <Button type="submit" color="primary" fullWidth isLoading={creatingUser} isDisabled={creatingUser} className="mt-6">Sign Up</Button>
        <div className="text-center mt-4 text-gray-500">
          Already have an account? {' '}
          <Link href={"/login"} isDisabled={creatingUser}>Login</Link>
        </div>
        <div className="my-3 text-center text-gray-500 grid grid-cols-3 items-center">
          <Divider />
          OR
          <Divider />
        </div>
        <Button
          fullWidth 
          disabled={creatingUser}
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="font-semibold text-gray-700 bg-white border border-gray-300"
          startContent={<GoogleIcon className={"w-6"} />}>
          Login with Google
        </Button>
      </form>
      <ModalContainer
        isOpen={userCreated}
        title={"Registration successful!"}
        content={"You can now log in."}
        confirmText={"OK"}
        onConfirm={() => setUserCreated(false)}
        redirectLink="/login"
        redirectText="Login"
        />
    </section>
  )
}

export default RegisterPage