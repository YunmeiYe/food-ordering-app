import { IconProps } from "./IconProps";

export const ClockIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    className={`h-auto ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 7v5h3m6 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
)