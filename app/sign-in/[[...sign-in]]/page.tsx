import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 8rem)" }}
      >
        <SignIn />
      </div>
    </>
  );
}
