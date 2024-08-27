import SignIn from "./Components/SignIn";
import User from "./Components/User";

export default async function Home() {
  return (
    <main>
      <User />
      <SignIn />
    </main>
  );
}
