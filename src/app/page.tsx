import { getServerAuthSession } from "~/server/auth";
import BaseButton from "./_components/base/BaseButton";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="bg-gradient-to-b flex min-h-screen flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {/* <BaseButton as="link" href={`/musicians`}>Musicians Page</BaseButton> */}
        {/* <BaseButton as="link" href={`/gigs`}>Gigs page</BaseButton> */}
        <BaseButton as="link" href={`/gigs/create`}>
          Gig Create
        </BaseButton>
        {session?.user && (
          <BaseButton as="link" href={`/user/${session.user.id}`}>
            User page
          </BaseButton>
        )}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <BaseButton
              as="link"
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
            >
              {session ? "Sign out" : "Sign in"}
            </BaseButton>
          </div>
        </div>
      </div>
    </main>
  );
}
