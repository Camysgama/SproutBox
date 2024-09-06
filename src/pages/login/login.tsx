import Separator from "@/components/separator/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { ArrowLeft, KeyRound, MailIcon } from "lucide-react";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import womanImage from "../../assets/woman.png";
import UserPool from "../../services/user-pool";
import google from "/google-icon.png";
import { UserContext } from "@/context/user-context/user-context";

interface IForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<IForm>();
  const [error, setError] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const submit: SubmitHandler<IForm> = ({ email, password }) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const details = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(details, {
      onSuccess: () => {
        setError(false);
        userContext?.setId(user.getUsername());
        userContext?.setIsSignedIn(true);
        navigate("/");
      },
      onFailure: () => {
        setError(true);
      },
    });
  };

  return (
    <div className="h-lvh bg-grass-pattern py-32 max-2xl:px-20 max-xl:px-12 2xl:px-96">
      <div className="flex h-full rounded-3xl bg-green-200">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex w-3/5 flex-col justify-center rounded-l-3xl bg-white pl-16 pr-64 max-lg:pl-6 max-lg:pr-32"
        >
          <div className="pb-10">
            <ArrowLeft
              onClick={() => navigate("/")}
              size={32}
              className="cursor-pointer rounded-full p-1 text-green-800 hover:bg-slate-200"
            ></ArrowLeft>
          </div>
          <div className="mb-2 text-3xl font-bold text-green-700">LOGIN</div>
          <div className="text-xl">Bem-vindo a SproutBox</div>
          <div className="mb-6 flex items-center text-sm">
            Não tem uma conta ainda?
            <Button
              variant="link"
              type="button"
              className="-ml-3 text-sm text-green-800"
              onClick={() => navigate("/register")}
            >
              Cadastre-se
            </Button>
          </div>
          <div className="mb-3">
            <div className="mb-2 font-medium text-green-700">Email</div>
            <Input
              icon={MailIcon}
              placeholder="Insira seu email"
              error={error}
              {...register("email")}
            />
          </div>
          <div className={error ? "mb-6" : "mb-9"}>
            <div className="mb-2 font-medium text-green-700">Email</div>
            <Input
              icon={KeyRound}
              type="password"
              placeholder="Insira sua senha"
              error={error}
              {...register("password")}
            />
          </div>
          {error && (
            <div className="mb-4 text-sm text-red-300">
              O email ou senha digitado não está correto
            </div>
          )}
          <Button type="submit" className="bg-green-900 hover:bg-green-600">
            Entrar
          </Button>
          <Separator />
          <Button className="bg-white text-slate-500 shadow-md hover:bg-slate-100">
            <img src={google} className="mr-3 size-7" />
            Entrar com Google
          </Button>
        </form>
        <div className="w-2/5">
          <div className="mt-7 flex justify-end pr-20 text-5xl font-medium text-green-900">
            SproutBox
          </div>
        </div>
        <div className="absolute right-[550px] top-[200px] w-[600px] max-2xl:right-[300px] max-xl:right-[150px] max-lg:top-[275px] max-lg:w-[450px]">
          <img src={womanImage} />
        </div>
      </div>
    </div>
  );
}
