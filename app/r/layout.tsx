import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/footer";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section className="flex flex-row w-dvw bg-zinc-900 text-white">
            <section className="self-start inset-y-0 left-0 min-w-max w-[350px] h-dvh max-h-screen border-r border-red-300">
                <DashboardNav />
            </section>
            <div className="w-full flex flex-col items-center">
                <header className="grow-[1]">

                </header>
                <main className="grow-[10]">
                    {children}
                    <Footer/>
                </main>
            </div>
        </section>
    );
}