import { Loader2 } from "lucide-react";

export const Loading = () => (
  <div className="absolute inset-0 z-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4 p-8 ">
      <Loader2 className="size-12 animate-spin text-primary-500" />
      <p className="animate-pulse text-primary-500">Loading...</p>
    </div>
  </div>
);
