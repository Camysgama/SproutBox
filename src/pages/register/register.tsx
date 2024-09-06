import Separator from "@/components/separator/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function Register() {
  const [customError, setCustomError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const userContext = useContext(UserContext);

  const navigate = useNavigate();
  const submit: SubmitHandler<IForm> = ({ email, password }) => {
    UserPool.signUp(email, password, [], [], (error, result) => {
      if (error)
        switch (error?.name) {
          case "UsernameExistsException":
            return setCustomError("Esse usuário já existe");
          default:
            return setCustomError(
              "Falha no registro, tente novamente mais tarde!",
            );
        }

      fetch("https://sproutbox-api.onrender.com/create-data", {
        body: JSON.stringify({ id: result?.userSub }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      userContext?.setId(result?.userSub ?? "");
      navigate("/confirmation", { state: { email } });
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
          <div className="mb-2 text-3xl font-bold text-green-700">
            REGISTRAR
          </div>
          <div className="text-xl">Bem-vindo a SproutBox</div>
          <div className="mb-6 flex items-center text-sm">
            Já tem uma conta?
            <Button
              variant="link"
              className="-ml-3 text-sm text-green-800"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
          </div>
          <div className="mb-3">
            <div className="mb-2 font-medium text-green-700">Email</div>
            <Input
              icon={MailIcon}
              placeholder="Insira seu email"
              error={errors.email}
              {...register("email", {
                required: { message: "Campo obrigatório", value: true },
                pattern: {
                  message: "E-mail inválido",
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                },
              })}
            />
            <div className="mt-1 text-sm text-red-300">
              {errors.email?.message}
            </div>
          </div>
          <div className={customError ? "mb-6" : "mb-9"}>
            <div className="mb-2 font-medium text-green-700">Senha</div>
            <Input
              icon={KeyRound}
              type="password"
              placeholder="Insira sua senha"
              error={errors.password}
              {...register("password", {
                required: { message: "Campo obrigatório", value: true },
                pattern: {
                  message:
                    "Senha deve conter pelo menos 1 maiúscula, 1 numero e 8 caracteres",
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/,
                },
              })}
            />
            <div className="mt-1 text-sm text-red-300">
              {errors.password?.message}
            </div>
          </div>
          {customError && (
            <div className="mb-4 text-sm text-red-300">{customError}</div>
          )}
          <Button type="submit" className="bg-green-900 hover:bg-green-600">
            Cadastrar
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
