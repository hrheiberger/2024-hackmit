import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { NavComponent } from "./layout/nav";
import { TypeAnimation } from "react-type-animation";
import { HomeComponent } from "./layout/home";
import BasicPieChart from "./components/Visualization/BasicPieChart";

export default function App() {
  return (
    <>
      <BasicPieChart
        height="800"
        width="800"
        top="10"
        bottom="10"
        left="10"
        right="10"
      />
      <NavComponent />
      <HomeComponent />
    </>
  );
}
