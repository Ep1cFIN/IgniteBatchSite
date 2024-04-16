import { createClient } from "@/utils/supabase/server";

const name = async () => {
    const supabase = createClient();
    
    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    return user?.identities?.[0]?.identity_data?.full_name || user?.email || "Your name here";
    
}

const HelloWorld= () => {
    console.log("Wait WTF");
    name().then((res: any) => console.log(res));
    return <div>Hello World! (profile)</div>;
};

export default HelloWorld;