import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-apex-black py-12 px-4">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SignUp />
      </Suspense>
    </div>
  );
}
