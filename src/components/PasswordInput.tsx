import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { Input } from "@nextui-org/react"
import { useState } from "react";

interface PasswordInputProps {
  passwordValue: string;
  setPassword: (password: string) => void;
  disabled: boolean;
}

const PasswordInput = ({ passwordValue, setPassword, disabled }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Input
      isRequired
      label="Password"
      placeholder="Enter your password"
      type={isVisible ? "text" : "password"}
      className="mb-2"
      size="lg"
      value={passwordValue}
      onChange={e => setPassword(e.target.value)}
      disabled={disabled}
      endContent={
        <button
          className="w-6 focus:outline-none disabled:bg-transparent"
          type="button"
          disabled={disabled}
          onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? (
            <EyeSlashFilledIcon className="w-full" />
          ) : (
            <EyeFilledIcon className="w-full" />
          )}
        </button>
      }
    />
  )
}

export default PasswordInput