import SignIn from "./Components/SignIn";

export default async function Home() {
  return (
    <main>
      <div className="flex justify-start p-3 bg-[#FAD572] text-white ">
        <img src="/oaulogo.png" width={70} className="bg-transparent " />
      </div>
      <SignIn />
    </main>
  );
}
