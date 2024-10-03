import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  const toDashboard = async () => {
    "use server";

    return redirect("/r/dashboard");
  }

  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOut}>
        <Button>
          Logout
        </Button>
      </form>
      <form action={toDashboard}>
        <Button>
          To Dashboard
        </Button>
      </form>
    </div>
  ) : (
    <Link href="/login">
      <Button>Login</Button>
    </Link>
  );
}
