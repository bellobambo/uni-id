import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const email = user.emailAddresses[0].emailAddress;
  console.log(email, "email address");

  return (
    <main>
      hello {email}
      <div></div>
    </main>
  );
}
