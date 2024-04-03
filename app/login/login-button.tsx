"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

async function signIn() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    console.error("Error signing in with Google", error);
    return;
  }
}

export default function SubmitButton() {
  return (
    <Button className="w-full" variant="outline" onClick={signIn}>
      Login with Google
    </Button>
  );
}
