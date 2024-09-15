import { Toaster } from "@/components/ui/toaster";
import { NavComponent } from "./layout/nav";
import { HomeComponent } from "./layout/home";
import { useConvexAuth } from "convex/react";
import { DisplayComponent } from "./layout/display";

export default function App() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <>
      <NavComponent />
      {isAuthenticated ? <DisplayComponent /> : <HomeComponent />}
      <Toaster />
    </>
  );
}
