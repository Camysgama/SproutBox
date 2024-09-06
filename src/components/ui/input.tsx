import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: FieldError | boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, error, type, ...props }, ref) => {
    const [typ, setTyp] = React.useState(type);
    const InputIcon = icon;

    const handlePassword = () => {
      setTyp(typ === "password" ? "text" : "password");
    };
    return (
      <div className="relative w-full">
        {InputIcon && (
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
            <InputIcon size={18} className="text-muted-foreground" />
          </div>
        )}
        <input
          type={typ}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "pl-8" : "",
            className,
            error
              ? "border-red-400 focus-visible:outline-red-400"
              : "focus-visible:outline-green-600",
          )}
          ref={ref}
          {...props}
        />
        {type == "password" && (
          <div
            onClick={() => handlePassword()}
            className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer"
          >
            {typ == "password" ? (
              <Eye size={18} className="text-muted-foreground" />
            ) : (
              <EyeOff size={18} className="text-muted-foreground" />
            )}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
