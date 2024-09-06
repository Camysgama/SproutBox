import { ClipboardPen, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { UserContext } from "@/context/user-context/user-context";
import { useNavigate } from "react-router-dom";

export function Menu() {
  const navigate = useNavigate();
  const logout = () => {
    userContext?.setId("");
    userContext?.setIsSignedIn(false);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: "",
        isSignedIn: false,
      }),
    );
  };

  const userContext = useContext(UserContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="rounded-3xl bg-green-900 text-sm font-bold text-white hover:bg-green-600"
      >
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/my-plan")}>
            <ClipboardPen className="mr-2 h-4 w-4" />
            <span>Minha assinatura</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
