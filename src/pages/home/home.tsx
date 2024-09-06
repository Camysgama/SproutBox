import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import PlanCard from "@/components/plan-card/plan-card";
import ProductCard from "@/components/product-card/product-card";
import { Button } from "@/components/ui/button";
import { createRef, useContext } from "react";
import illustration from "../../assets/Illustration.png";
import mobile from "/mobile-app.png";
import seeds from "/seeds.jpg";
import vases from "/vases.png";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { planCardOne, planCardThree, planCardTwo } from "./home-plans";
import { UserContext } from "@/context/user-context/user-context";
import { Plans } from "@/enum/PlanEnum";

export default function Home() {
  const homeRef = createRef<HTMLDivElement>();
  const plansRef = createRef<HTMLDivElement>();

  const handleSeePlans = () => {
    plansRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const userContext = useContext(UserContext);

  return (
    <div className="bg-zinc-100" ref={homeRef}>
      <Header
        homeRef={homeRef}
        plansRef={plansRef}
        isSignedIn={userContext!.isSignedIn}
      ></Header>
      <div className="relative z-0 flex h-[700px] items-center justify-between max-xl:h-[1000px] max-xl:flex-col max-xl:pt-10 2xl:pr-64">
        <div className="flex size-full flex-col justify-center pl-40 max-xl:pl-16 max-md:pl-6">
          <div className="mb-9 text-5xl font-medium text-green-700">
            SproutBox
          </div>
          <div className="mb-6 max-w-[650px] text-lg font-medium text-zinc-700 max-xl:max-w-[425x] max-xl:text-base">
            Corpo saudável, mente tranquila: com nosso plano de assinatura de
            brotos, cultive sabores frescos e hortas para relaxar! Receba tudo o
            que precisa, desde sementes e vasos até ferramentas, dicas no
            aplicativo e assistência online. Inscreva-se agora e plante
            felicidade em casa!
          </div>
          <Button
            className="w-fit rounded-2xl bg-green-700 px-28 py-6 hover:bg-green-800"
            onClick={() => handleSeePlans()}
          >
            Veja os planos
          </Button>
        </div>
        <img className="z-0 mb-16 max-xl:w-[600px]" src={illustration} />
        <div className="absolute right-0 top-0 -z-[1] w-1/2 overflow-hidden border-b-[700px] border-l-[700px] border-box border-l-transparent bg-transparent max-xl:bottom-0 max-xl:border-b-[500px] max-xl:border-l-[800px]"></div>
      </div>
      <div
        ref={plansRef}
        className="relative z-0 flex flex-col items-center bg-greenlight pt-7 shadow-top"
      >
        <div className="mb-6">Uma rapida olhada no conteudo de nossa caixa</div>
        <ScrollArea className="flex w-full pl-[200px] max-2xl:pl-0">
          <div className="flex w-max justify-center space-x-4 p-4">
            <ProductCard image={seeds}>
              Receba mensalmente uma seleção única de sementes para cultivar em
              casa. Desfrute de uma experiência jardinagem a cada entrega!
            </ProductCard>
            <ProductCard image={vases}>
              Receba mensalmente vasos exclusivos para suas plantas e adicione
              um toque especial ao seu jardim.
            </ProductCard>
            <ProductCard image={mobile}>
              Conecte-se com outros jardineiros, compartilhe seu progresso e
              acompanhe o crescimento das plantas no nosso app!
            </ProductCard>
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <div className="w-full max-xl:mt-6">
          <div className="relative z-0 mb-16 flex h-[650px] items-center justify-center space-x-14 max-xl:h-auto max-xl:flex-col max-xl:space-x-0 max-xl:space-y-6">
            <PlanCard
              planName="Plano Sprout"
              price={29.99}
              contents={planCardOne}
              plan={Plans.basic}
            ></PlanCard>
            <PlanCard
              planName="Plano Bloom"
              price={39.99}
              isFocused={true}
              contents={planCardTwo}
              plan={Plans.intermediate}
            ></PlanCard>
            <PlanCard
              planName="Plano Harvest"
              price={49.99}
              contents={planCardThree}
              plan={Plans.advanced}
            ></PlanCard>
            <img
              src={illustration}
              className="position absolute right-12 top-0 -z-[1] w-[500px] blur-sm"
            />
            <img
              src={illustration}
              className="position absolute bottom-0 left-10 -z-[1] w-[500px] -scale-x-[1] transform blur-sm max-lg:left-0"
            />
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
