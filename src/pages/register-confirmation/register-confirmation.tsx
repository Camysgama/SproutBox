import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserPool from "../../services/user-pool";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CognitoUser } from "amazon-cognito-identity-js";
import { UserContext } from "@/context/user-context/user-context";

export default function RegisterConfirmation() {
  const [code, setCode] = useState("");
  const userContext = useContext(UserContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const submit = () => {
    const user = new CognitoUser({
      Username: state.email,
      Pool: UserPool,
    });

    user.confirmRegistration(code, false, (success) => {
      if (success) {
        userContext?.setIsSignedIn(true);
        navigate("/");
      }
    });
  };

  return (
    <div className="flex h-lvh items-center justify-center bg-grass-pattern py-32 max-2xl:px-20 max-xl:px-12 2xl:px-96">
      <div className="rounded-lg bg-white p-24">
        <div className="mb-1 text-sm">Código de verificação</div>
        <div className="flex flex-col items-center">
          <Input
            className="mb-6 w-96 focus-visible:outline-green-600"
            placeholder="Insira o Código"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            variant="default"
            className="rounded-xl bg-green-700 p-6 text-sm hover:bg-green-800"
            onClick={() => submit()}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
