import clsx from "clsx";
import React from "react";
import { Color } from "../data/color";

interface DebugProps {
  color: Color;
  width?: number;
}

const Debug: React.FC<DebugProps> = (props) => {
  return process.env.NODE_ENV === "development" ? (
    <div
      className={clsx(
        {
          border: props.width === 1,
          [`border-${props.width!}`]: props.width && props.width > 1,
        },
        `border-${props.color} rounded`
      )}>
      {props.children}
    </div>
  ) : null;
};

Debug.defaultProps = { width: 2 };

export default Debug;
