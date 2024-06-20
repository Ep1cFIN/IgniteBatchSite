import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FirstTimeLoginForm from "@/components/forms/FirstTimeLoginForm";
import React from "react";

const Page = async () => {
  const supabase = createClient();

  let { data: profiles, error } = await supabase.from("profiles").select("id");

  const user = await supabase.auth.getUser()
  const loggedInId = user.data.user?.id;
  const isProfileIncluded = profiles?.some(
    (profile) => profile.id === loggedInId
  );

  if (!isProfileIncluded) {
    redirect("/r");
  }

  const userInfo = {
   firstName: user.data.user?.user_metadata.full_name?.split(" ")[0] || "",
   lastName: user.data.user?.user_metadata.full_name?.split(" ")[1] || "",
   email: user.data.user?.email || "",
   avatarURL: user.data.user?.user_metadata.avatar_url || "",
  }
  return (
    <div className="h-dvh w-dvw flex flex-col align-middle items-center p-8 text-center">
      <h1 className="text-5xl font-k2d">Set Up Your Profile</h1>
      <section className="max-w-5xl">
        <FirstTimeLoginForm userInfo={userInfo}></FirstTimeLoginForm>
      </section>
    </div>
  );
};

export default Page;
