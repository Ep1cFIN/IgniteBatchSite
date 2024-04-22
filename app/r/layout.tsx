import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/ui/theme-toggle"



export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const supabase = createClient();
  
    const signOut = async () => {
      "use server";
  
      const supabase = createClient();
      await supabase.auth.signOut();
      return redirect("/");
    };

    return (
        <section className="flex flex-row w-dvw">
            <section className="self-start inset-y-0 left-0 min-w-max w-[350px] h-dvh max-h-screen border-r border-red-300">
                <DashboardNav />
            </section>
            <div className="w-full flex flex-col items-center ">
                <header className="w-full p-6 grow-[1] flex flex-row min-h-[100px] max-h-[30vh] justify-around items-center border-b-2 border-red-300">
                    <ThemeToggle/>
                    <div className="h-full w-[50%] relative bg-">
                        <Image 
                            src="/IgniteMainWordmark.svg"
                            alt="logo"
                            fill={true}
                        />
                    </div>
                    <form action={signOut}>
                        <Button variant={"default"}>
                            Logout
                        </Button>
                    </form>
                </header>
                <main className="grow-[10] h-full w-full">
                    {children}
                </main>
                <Footer/>
            </div>
        </section>
    );
}