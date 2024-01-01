import React from "react";
import { Title } from "@/ui";

const Home = () => {
  return (
    <>
      <main className="relative">
        <div className="c-container flex flex-col gap-2">
          <Title>Today's</Title>
          <h1 className="font-bold text-xl">New products</h1>
          
        </div>
      </main>
    </>
  );
};

export default Home;
