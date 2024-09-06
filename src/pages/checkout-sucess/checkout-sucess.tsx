import { UserContext } from "@/context/user-context/user-context";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CheckouSucess() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [params] = useSearchParams();

  useEffect(() => {
    if (!userContext?.id) return;

    fetch("https://sproutbox-api.onrender.com/update-plan", {
      body: JSON.stringify({ id: userContext?.id, plan: params.get("plan") }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [userContext?.id]);

  return (
    <div className="flex h-lvh items-center justify-center bg-grass-pattern">
      <div className="rounded-lg bg-white p-6">
        <div className="flex items-center">
          <ArrowLeft
            onClick={() => navigate("/")}
            size={40}
            className="cursor-pointer rounded-full p-1 pr-2 text-green-800 hover:bg-slate-200"
          ></ArrowLeft>
          <div className="text-lg font-medium text-green-800">Voltar</div>
        </div>
        <div className="px-28 py-20">
          <div className="mb-5 flex items-center justify-center">
            <CheckCircle2 size={100} className="text-green-400"></CheckCircle2>
          </div>
          <div className="font-medium">Pagamento realizado com sucesso!</div>
        </div>
      </div>
    </div>
  );
}
