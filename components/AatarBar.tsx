import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AvatarBar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

    const avatarUrl:string = await user?.user_metadata?.avatar_url ?? "https://github.com/shadcn.png";
    const name:string = await user?.user_metadata?.name ?? "Nameles one";

  return (
    <div className="pb-12 flex flex-row items-center">
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="ml-4">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm"> Ignite coach </p>
      </div>
    </div>
  );
};

export default AvatarBar;
