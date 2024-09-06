import { Button } from "@/components/ui/button";
import { Plans } from "@/enum/PlanEnum";

interface IPlanCard {
  planName: string;
  isFocused?: boolean;
  price: number;
  contents: string[];
  plan: Plans;
}

export default function PlanCard({
  planName,
  isFocused,
  price,
  contents,
  plan,
}: IPlanCard) {
  const handleButton = async () => {
    const res = await fetch("https://sproutbox-api.onrender.com/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });
    const body = await res.json();
    window.location.href = body.url;
  };
  return (
    <div
      className={
        isFocused
          ? "relative z-0 flex h-[550px] w-[350px] flex-col justify-between rounded-3xl bg-zinc-100 px-10 pb-16 pt-10 shadow-lg transition-shadow duration-500 ease-in-out hover:shadow-2xl"
          : "relative z-0 flex h-[500px] w-[350px] flex-col justify-between rounded-3xl bg-zinc-100 px-10 pb-16 pt-10 shadow-lg transition-shadow duration-500 ease-in-out hover:shadow-2xl"
      }
    >
      <div className="space-y-6">
        <div className="text-4xl font-medium text-green-700">{planName}</div>
        <div className="flex items-baseline">
          <div className="pr-1 text-3xl font-bold text-green-800">R$</div>
          <div className="text-5xl font-bold text-green-500">{price}</div>
        </div>
        <ul className="list-inside list-disc space-y-2 font-semibold text-green-900">
          {contents.map((content, index) => (
            <li key={index}>{content}</li>
          ))}
        </ul>
      </div>
      {/* <form action="https://sproutbox-api.onrender.com/checkout" method="POST"> */}
      <Button
        className="w-full rounded-full bg-green-800 uppercase shadow-2xl hover:bg-green-600"
        onClick={() => handleButton()}
      >
        assinar este plano
      </Button>
      {/* </form> */}
      <div className="absolute bottom-0 left-0 -z-[1] rounded-b-3xl border-b-[225px] border-l-[350px] border-box border-l-transparent bg-zinc-100" />
    </div>
  );
}
