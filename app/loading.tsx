import type React from "react";
import Loader from "@/components/ui/loader";

export default function Loading(): React.ReactNode {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black">
      <Loader />
    </div>
  );
}


