import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function PleaseLogin() {
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger className="h-10 w-full rounded-full bg-green-800 px-4 py-2 text-sm font-medium uppercase text-primary-foreground shadow-2xl hover:bg-green-600">
        assinar este plano
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader className="mb-6 p-6">
          <DialogTitle className="mb-3 text-lg font-medium text-green-800">
            Cadastre-se ou Faça Login para Desbloquear sua Assinatura!
          </DialogTitle>
          <DialogDescription className="text-black">
            Para aproveitar todos os benefícios da nossa assinatura, faça seu
            registro. Caso já tenha uma conta, basta fazer o login.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => navigate("/Login")}
            className="rounded-xl bg-green-900 text-sm font-bold hover:bg-green-600"
          >
            Entrar/Cadastrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
