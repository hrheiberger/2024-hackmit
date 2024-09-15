import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { NavComponent } from "./layout/nav";
import { TypeAnimation } from 'react-type-animation';
import { HomeComponent } from "./layout/home";

export default function App() {
  return (
    <>
      <NavComponent />
      <HomeComponent />
    </>
  );
}
