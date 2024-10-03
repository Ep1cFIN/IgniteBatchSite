import { createClient } from "@/utils/supabase/server";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

const UsersTable = async () => {
  const supabase = createClient();

  const { data: teams, error } = await supabase.from("teams").select("*");

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  return (
    <div className="flex gap-4 p-20 flex-row flex-wrap w-full h-full overflow-y-auto">
      {teams.map((team) => {return UserCard(team)})}
    </div>
  );
};

const UserCard = async (team:any) => {
    return (
        <Card key={team.team_id} className="w-[30%] p-4">
            <CardHeader>
                <CardTitle>{team.team_name}</CardTitle>
                <CardDescription>{team.details}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
      );
}

export default UsersTable;
