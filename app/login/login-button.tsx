"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";


async function signIn() {
  const redirectUrl = window.location.origin + "/auth/callback";
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
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
