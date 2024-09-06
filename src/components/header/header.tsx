import { RefObject, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "../menu/menu";

interface IHeader {
  plansRef: RefObject<HTMLDivElement>;
  homeRef: RefObject<HTMLDivElement>;
  isSignedIn: boolean;
}

export default function Header({ homeRef, plansRef, isSignedIn }: IHeader) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleHome = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handlePlans = () => {
    plansRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const controlNavbar = () => {
    if (window.scrollY > 30) {
      setShow(true);
      return;
    }

    setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  });

  return (
    <div
      className={`fixed right-0 top-0 z-10 flex w-full items-center px-12 py-6 max-md:px-6 ${
        show ? "justify-between bg-zinc-100" : "justify-end bg-transparent"
      }`}
    >
      {show ? (
        <div className="text-2xl font-medium text-green-900">SproutBox</div>
      ) : null}
      <div>
        <Button
          variant="link"
          className="mr-10 text-sm font-semibold text-zinc-600 max-xl:mr-6 max-md:mr-0"
          onClick={() => handleHome()}
        >
          Início
        </Button>
        <Button
          variant="link"
          className="mr-16 text-sm font-semibold text-zinc-600 max-xl:mr-8 max-md:mr-0"
          onClick={() => handlePlans()}
        >
          Planos
        </Button>
        {isSignedIn ? (
          <Menu />
        ) : (
          <Button
            onClick={() => navigate("/Login")}
            className="rounded-3xl bg-green-900 text-sm font-bold hover:bg-green-600"
          >
            Entrar
          </Button>
        )}
      </div>
    </div>
  );
}
