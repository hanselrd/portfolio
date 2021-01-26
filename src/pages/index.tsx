import { DEV } from "@/core/environment";
import React from "react";

const Index: React.FC = () => {
  return (
    <>
      <div>Landing</div>
      <div>{JSON.stringify({ DEV })}</div>
    </>
  );
};

export default Index;
