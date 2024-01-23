"use client";
import GoogleIcon from "@/icons/GoogleIcon";
import { Button, Divider, Link } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import ModalContainer from "@/components/common/ModalContainer";
import { signIn } from "next-auth/react";
import EmailInput from "@/components/common/form/EmailInput";
import PasswordInput from "@/components/common/form/PasswordInput";
import NameInput from "@/components/common/form/NameInput";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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
    <section className="pt-12 pb-20">
      <h1 className="text-center text-primary text-4xl my-4">
        Sign Up
      </h1>
      <form className="flex flex-col gap-2 max-w-lg mx-auto mt-12" onSubmit={handleFormSubmit}>
        <NameInput nameValue={name} setName={setName} disabled={creatingUser} className={"mb-4"} />
        <EmailInput emailValue={email} setEmail={setEmail} disabled={creatingUser} className={"mb-4"} />
        <PasswordInput passwordValue={password} setPassword={setPassword} disabled={creatingUser} />
        <div className="text-danger my-2">{error}</div>
        <Button type="submit" color="primary" fullWidth isLoading={creatingUser} isDisabled={creatingUser} className="font-semibold">Sign Up</Button>
        <div className="text-center mt-4 text-gray-400">
          Already have an account? {' '}
          <Link href={"/login"} isDisabled={creatingUser}>Login</Link>
        </div>
        <div className="my-3 text-center grid grid-cols-3 items-center">
          <Divider />
          OR
          <Divider />
        </div>
        <Button
          fullWidth
          disabled={creatingUser}
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="font-semibold text-dark bg-white border border-dark"
          startContent={<GoogleIcon className={"w-6"} />}>
          Login with Google
        </Button>
      </form>
      <ModalContainer
        isOpen={userCreated}
        title={"Registration successful"}
        content={"You can now log in."}
        confirmText={"OK"}
        onConfirm={() => setUserCreated(false)}
        closeText="Login"
        onClose={() => router.push('/login')}
      />
    </section>
  )
}

export default RegisterPage