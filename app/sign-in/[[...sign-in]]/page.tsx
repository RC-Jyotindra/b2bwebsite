import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-apex-black py-12 px-4">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SignIn />
      </Suspense>
    </div>
  );
}
