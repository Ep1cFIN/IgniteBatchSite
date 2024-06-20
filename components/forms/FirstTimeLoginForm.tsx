"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

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
  ]),
});

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  avatarURL: string;
};

export default function ProfileForm({ userInfo }: { userInfo: UserInfo }) {
  const { firstName, lastName, email, avatarURL } = userInfo;
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: firstName,
      nickname: "",
      lastName: lastName,
      email: email,
      avatarURL: avatarURL,
      description: "",
      founderProfile: "Technical",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Submitted form values:");
    console.log(values);
    router.push("/r");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row gap-3">
          <h2>Your info</h2>
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
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2>Your team/company</h2>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
