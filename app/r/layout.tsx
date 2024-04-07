import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section>
            <nav>
                <ul>
                    <li>
                        <Link className={buttonVariants({variant: "ghost"})} href="/r/coaches">
                            Coaches
                        </Link>
                    </li>
                    <li>
                        <Link href="/r/deals">
                            Deals
                        </Link>
                    </li>
                    <li>
                        <Link href="/r/profile">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/r/settings">
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
            <div>
                <main>{children}</main>
                <footer>
                    <p>Footer</p>
                </footer>
            </div>
        </section>
    );
}