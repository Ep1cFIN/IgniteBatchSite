import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import { Bold } from "lucide-react";
import { Suspense } from "react";
import Loading from "./loading";

const HelloWorld = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("this is the user", user);

  return (
    <div className="p-12 flex flex-col w-full h-full overflow-clip">
      <Card className="h-full w-full">
        <CardHeader className="flex flex-row gap-4 content-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.user_metadata.avatar_url} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle>{user?.user_metadata.name}'s profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Loading></Loading>}>
            <CardContent className="Text">
            <div className="flex flex-col gap-8 rounded-md p-4">
                <p className="text-lg leading-none">
                    <b>Name: </b>
                    {user?.user_metadata.name}
                </p>
                <p className="text-lg leading-none">
                    <b>Email: </b>
                    {user?.email}
                </p>
                <p className="text-lg leading-none">
                    <b>Phone: </b>
                    xxx-xxx-xxxx
                </p>
                <p className="text-lg leading-none">
                    <b>Team: </b>
                    
                </p>
                <p className="text-lg leading-none">
                    <b>Other? </b>
                    xxx
                </p>
            </div>
            </CardContent>
            <CardFooter>
              <button className="p-2 bg-blue-500 text-white rounded-md w-20">
                Edit
              </button>
            </CardFooter>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelloWorld;
