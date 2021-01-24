import { useStoreState } from "@/core/store";
import React from "react";

const Index: React.FC = () => {
  const theme = useStoreState((state) => state.theme);

  return (
    <div>
      <img src="/logo.png" alt="Logo" />
      <div>{JSON.stringify(theme)}</div>
    </div>
  );
};

export default Index;
