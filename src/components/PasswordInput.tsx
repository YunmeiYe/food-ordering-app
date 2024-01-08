import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { Input } from "@nextui-org/react"
import { useState } from "react";

interface PasswordInputProps {
  passwordValue: string;
  setPassword: (password: string) => void;
  disabled: boolean;
  className?: string;
}

const PasswordInput = ({ passwordValue, setPassword, disabled, className }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Input
      isRequired
      label="Password"
      placeholder="Enter your password"
      type={isVisible ? "text" : "password"}
      className={className}
      value={passwordValue}
      onChange={e => setPassword(e.target.value)}
      isDisabled={disabled}
      endContent={
        <div
          className="w-6 place-self-center cursor-pointer"
          onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? (
            <EyeSlashFilledIcon className="w-full" />
          ) : (
            <EyeFilledIcon className="w-full" />
          )}
        </div>
      }
    />
  )
}

export default PasswordInput