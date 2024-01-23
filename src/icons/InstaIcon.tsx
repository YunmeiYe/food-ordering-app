import { IconProps } from "./IconProps";

export const InstaIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    className={`h-auto ${className}`}
  >
    <path
      strokeWidth={2}
      d="M3 11c0-3.771 0-5.657 1.172-6.828C5.343 3 7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172C21 5.343 21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828C18.657 21 16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172C3 18.657 3 16.771 3 13v-2Z"
    />
    <circle cx={16.5} cy={7.5} r={1.5} />
    <circle cx={12} cy={12} r={3} strokeWidth={2} />
  </svg>
)