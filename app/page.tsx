import Image from "next/image";
import AuthButton from "../components/AuthButton";
import bg from "@/public/IgniteAstronaut.png";

export default async function Index() {

  return (
    <div className="w-full flex flex-col items-center h-dvh text-white">
      <nav className="w-full flex justify-between items-center border-b border-b-foreground/10 h-24">
        <div className="flex-1"></div>
        <div className="flex-1 flex justify-center">
          <Image src="/IgniteMainWordmark.svg" alt="Ignite" width={200} height={40} />
        </div>
        <div className="flex-1 flex justify-end pr-8">
          <AuthButton />
        </div>
      </nav>
      <div 
        className="grow flex flex-col items-center h-full w-full bg-no-repeat bg-cover bg-top" 
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg.src})`}}
      >
        <div className="animate-in flex flex-col justify-center h-full w-full max-w-4xl px-3 text-white font-montserrat">
          <h1 className="text-5xl text-center">
            Welcome to the Ignite participant dashboard! 
            <br/><br/> 
            This is meant only for Ignite alumni & teams accepted to the program.
            <br/><br/>
            For any questions, feel free to reach out at ignite@aalteos.com
          </h1>
        </div>
      </div>
    </div>
  );
}
