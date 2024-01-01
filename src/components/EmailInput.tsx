import { MailIcon } from '@/icons/MailIcon';
import { Input } from '@nextui-org/react'
import React, { useMemo } from 'react'

interface EmailInputProps {
  emailValue: string;
  setEmail: (email: string) => void;
  disabled: boolean;
}

const EmailInput = ({ emailValue, setEmail, disabled }: EmailInputProps) => {
  const validateEmail = (email: string) => {
    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const isInvalid = useMemo(() => {
    if (emailValue === '') return false;
    return validateEmail(emailValue) ? false : true;
  }, [emailValue]);

  return (
    <Input
      isRequired
      label="Email"
      placeholder="Enter your email"
      type="email"
      className="mb-3"
      size="lg"
      isInvalid={isInvalid}
      errorMessage={isInvalid && "Please enter a valid email"}
      value={emailValue}
      onChange={e => setEmail(e.target.value)}
      disabled={disabled}
      endContent={
        <MailIcon
          className={`w-6 
          ${isInvalid ? "stroke-red-500" : ""} 
          ${disabled ? "stroke-gray-500 cursor-not-allowed" : ""}`} />
      }
    />
  )
}

export default EmailInput