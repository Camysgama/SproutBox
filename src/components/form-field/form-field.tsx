import { IFormField } from "@/interfaces/form-field.interface";
import { Input } from "../ui/input";

export default function FormField({
  label,
  placeholder,
  type,
  icon,
  ...props
}: IFormField) {
  return (
    <div>
      <div className="mb-2 font-medium text-green-700">{label}</div>
      <Input
        icon={icon}
        className="focus-visible:outline-green-600"
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
