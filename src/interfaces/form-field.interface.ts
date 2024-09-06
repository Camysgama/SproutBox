import { LucideIcon } from "lucide-react";

export interface IFormField
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  type?: string;
  icon?: LucideIcon;
}
