import { LoadingSpinner } from "@/components/spinner/spinner";
import { UserContext } from "@/context/user-context/user-context";
import { Plans } from "@/enum/PlanEnum";
import { ArrowLeft, BanIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Plan() {
  const [plan, setPlan] = useState<Plans | null>(null);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.id) return;

    fetch(`https://sproutbox-api.onrender.com/get-plan/${userContext?.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setPlan(data.SproutPlan);
      });
  }, [userContext?.id]);

  const showPlan = () => {
    switch (plan) {
      case Plans.none:
        return "Você ainda não assinou";
      case Plans.basic:
        return "Plano Sprout";
      case Plans.intermediate:
        return "Plano Bloom";
      case Plans.advanced:
        return "Plano Harvest";
    }
  };

  const handleCancel = () => {
    fetch("https://sproutbox-api.onrender.com/update-plan", {
      body: JSON.stringify({ id: userContext?.id, plan: Plans.none }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navigate("/"));
  };

  return (
    <div className="flex h-lvh items-center justify-center bg-grass-pattern">
      <div className="w-[600px] rounded-lg bg-slate-100">
        <div className="flex items-center rounded-t-lg bg-green-300 px-6 py-8 text-lg font-bold">
          <ArrowLeft
            onClick={() => navigate("/")}
            size={38}
            className="mr-3 cursor-pointer rounded-full p-1 pr-2 text-green-800 hover:bg-slate-100"
          ></ArrowLeft>
          Minha assinatura
        </div>
        <div className="flex items-center justify-between px-6 py-8">
          {plan == null ? (
            <div className="flex w-full items-center justify-center">
              <LoadingSpinner size={40} className="text-green-600" />
            </div>
          ) : (
            <>
              <div>{showPlan()}</div>
              {plan == Plans.none ? null : (
                <div
                  className="flex cursor-pointer rounded-md p-3 text-red-300 hover:bg-red-400 hover:text-white"
                  onClick={() => handleCancel()}
                >
                  Cancelar
                  <BanIcon className="ml-2"></BanIcon>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
