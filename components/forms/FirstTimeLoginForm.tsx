"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const supabase = createClient();

const checkTeam = async (team: number) => {
  const { data, error } = await supabase
    .from("teams")
    .select("team_id")
    .eq("team_id", team)
    .single();

  const isDataTruthy = !!data;

  if (error) {
    console.error("Error fetching team:", error);
    return false;
  }

  return isDataTruthy;
};

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  nickname: z.string().optional(),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  avatarURL: z.string().url({
    message: "Please enter a valid URL.",
  }),
  description: z.string().optional(),
  founderProfile: z.union([
    z.literal("Technical"),
    z.literal("Product/Design"),
    z.literal("Business"),
    z.literal("Other"),
  ]),
  team: z
    .number()
    .int()
    .min(1)
    .refine((team) => {
      return checkTeam(team);
    }, {message: 'Please select a valid team.'}),

});

type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURL: string;
};

export default function ProfileForm({ userInfo }: { userInfo: UserInfo }) {
  const { id, firstName, lastName, email, avatarURL } = userInfo;
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      avatarURL: avatarURL,
      founderProfile: "Technical",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    
    
    const { data, error } = await supabase
        .from('profiles')
        .upsert({ 
          id: id,
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          avatar_url: values.avatarURL,
          description: values.description,
          founder_profile: values.founderProfile,
          team_id: values.team,
          nickname: values.nickname,
         })
        .select();

    console.log("Submitted form values:");
    console.log(data, error);
    router.push("/r");
  };

  const [teamNames, setTeamNames] = useState([
    { value: -1, label: "Loading teams..." },
  ]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("teams")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          setTeamNames([{ value: -1, label: "Error fetching teams" }]);
        } else {
          const formattedTeams = data?.map((team) => ({
            value: team.team_id,
            label: team.team_name,
          }));
          setTeamNames(formattedTeams);
        }
      });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-16">
        <div className="flex flex-col gap-3">
          <h2>Your info</h2>
          <div className="flex flex-row gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Roope" {...field} />
                  </FormControl>
                  <FormDescription>Your legal first name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input placeholder="XYZ" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your nickname / preferred name <br />
                    (Can be left blank)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Kaisti" {...field} />
                  </FormControl>
                  <FormDescription>Your legal last name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="roope.ripatti@aaltoes.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatarURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL*</FormLabel>
                <FormDescription>
                  URL to your preferred avatar image (default, your google
                  profile picture)
                </FormDescription>
                <FormControl>
                  <Input placeholder="avatar.com/avatar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Description</FormLabel>
                <FormDescription>
                  What ever you want to tell about yourself to the world!
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Im a builder from Finland..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="founderProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Founder Profile*</FormLabel>
                <FormDescription>
                  Which of the following fits you best?
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-y-1 w-full justify-evenly py-4 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Technical" />
                      </FormControl>
                      <FormLabel className="font-normal">Technical</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Product/Design" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Product/Design
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Business" />
                      </FormControl>
                      <FormLabel className="font-normal">Business</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Other" />
                      </FormControl>
                      <FormLabel className="font-normal">Other</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2>Your team/company</h2>
          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Team</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? teamNames.find(
                              (teamName) => teamName.value === field.value
                            )?.label
                          : "Select team"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search teams..." />
                      <CommandList>
                        <CommandEmpty>No team found.</CommandEmpty>
                        <CommandGroup>
                          {teamNames?.map((team) => (
                            <CommandItem
                              value={team.label}
                              key={team.value}
                              onSelect={() => {
                                console.log(
                                  "handling selection of language",
                                  team
                                );
                                form.setValue("team", team.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  team.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {team.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your team.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
