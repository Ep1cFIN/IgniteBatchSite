import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FirstTimeLoginForm from "@/components/forms/FirstTimeLoginForm";
import React from "react";
import { log } from "console";

const Page = async () => {
  const supabase = createClient();

  const { data: profiles, error: profileError } = await supabase.from("profiles").select("id");
  const {data: authData, error: authError} = await supabase.auth.getUser()
  const loggedInId = authData.user?.id;

  if (profileError) {
    console.error("profileError", profileError);
  }
  if (authError) {
    console.error("authError", authError);
  }

  if (!authData.user) {
    console.error("You need to be logged in to access this page.");
    redirect("/login");
  }else if (profiles?.some((profile) => profile.id === loggedInId)) {
    console.error("redirecting to /r because user already has a profile.");
    redirect("/r");
  }else{
    const userInfo = {
      id: authData.user.id,
      firstName: authData.user.user_metadata.full_name?.split(" ")[0],
      lastName: authData.user.user_metadata.full_name?.split(" ")[1],
      email: authData.user.email??"",
      avatarURL: authData.user.user_metadata.avatar_url,
     }
     return (
       <div className="h-dvh w-dvw flex flex-col align-middle items-center p-8 text-center">
         <h1 className="text-5xl font-k2d">Set Up Your Profile</h1>
         <section className="max-w-5xl">
           <FirstTimeLoginForm userInfo={userInfo}></FirstTimeLoginForm>
         </section>
       </div>
     );
  }
};

export default Page;
