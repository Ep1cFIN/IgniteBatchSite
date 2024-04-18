import { createClient } from "@/utils/supabase/server";


const HelloWorld= async () => {
    const supabase = createClient();
    
    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    return (
        <div>
            <h1>Hello World</h1>
            <p>My name is {user?.user_metadata.name}</p>
        </div>
    );
};

export default HelloWorld;