import { ArrowLeft, CircleXIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckouError() {
  const navigate = useNavigate();

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
            <CircleXIcon size={100} className="text-red-600"></CircleXIcon>
          </div>
          <div className="font-medium">Houve um problema no pagamento!</div>
        </div>
      </div>
    </div>
  );
}
