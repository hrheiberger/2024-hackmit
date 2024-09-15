import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
  useAction,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { NavComponent } from "./layout/nav";
import { TypeAnimation } from "react-type-animation";
import { HomeComponent } from "./layout/home";
import React, { useState } from "react";
import BasicPieChart from "./components/Visualization/BasicPieChart";

export default function App() {
  const [ticker, setTicker] = useState("");
  const insertCompany = useAction(api.insertNodeApi.insertNode);
  const handleChange = (event) => {
    console.log(event.target.value);
    setTicker(event.target.value);
  };
  const handleSubmit = () => {
    console.log("submitCompany");
    void insertCompany({ ticker: ticker }).then();
  };
  const companies = useQuery(api.getCompanies.getCompanyList);
  console.log(companies);
  const companyEdges = useQuery(api.getCompanyEdges.getCompanyEdgesList);
  return (
    <>
      <BasicPieChart
        height="800"
        width="800"
        top="10"
        bottom="10"
        left="10"
        right="10"
        companies={companies}
        companyEdges={companyEdges}
      />
      <Input onChange={handleChange} />
      <Button type="submit" onClick={handleSubmit}>
        Add Ticker
      </Button>
      <NavComponent />
      <HomeComponent />
    </>
  );
}
