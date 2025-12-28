import LoginPage from "@/src/components/auth/LoginPage";
import { Suspense } from "react";

export default function page() {
  return (
    <>
     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginPage />
    </Suspense>
    </>
  );
}
