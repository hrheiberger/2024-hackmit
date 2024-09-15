import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
<<<<<<< HEAD
import { NavComponent } from "./layout/nav";
import { TypeAnimation } from 'react-type-animation';
import { HomeComponent } from "./layout/home";

export default function App() {
  return (
=======
import BasicPieChart from "./components/Visualization/BasicPieChart";

export default function App() {
  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Convex + React (Vite) + Clerk Auth
      </h1>
      <BasicPieChart
        height="1000"
        width="1000"
        top="10"
        bottom="10"
        left="10"
        right="10"
      />
      <Authenticated>
        <SignedIn />
      </Authenticated>
      <Unauthenticated>
        <div className="flex justify-center">
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </main>
  );
}

function SignedIn() {
  const { numbers, viewer } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  return (
>>>>>>> 1e265d1c8e0a033a2328d3369168da1fbd5e8d79
    <>
      <NavComponent />
      <HomeComponent />
    </>
  );
}
