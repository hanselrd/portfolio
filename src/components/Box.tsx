import React from "react";

interface BoxProps {
  test?: boolean;
}

const Box: React.FC<BoxProps> = (props) => {
  return <div>{props.children}</div>;
};

export default Box;
