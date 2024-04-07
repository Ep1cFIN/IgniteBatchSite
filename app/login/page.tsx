import Image from "next/image"
import LoginButton from "./login-button"

export default function Dashboard() {
  return (
    <div className="w-full h-dvh lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Log in with your Aaltoes account to access the Ignite dashboard.
            </p>
          </div>
          <div className="grid gap-4">
            <LoginButton/>
          </div>
          <div className="mt-4 text-center text-sm">
            This is only meant for Ignite batch participants. If you are a batch member and cant log in, please contact the admin.
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/IgniteBackground.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}