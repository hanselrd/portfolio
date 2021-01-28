import { DEV } from "@/core/environment";
import clsx from "clsx";
import React from "react";

interface DebugProps {
  width?: number;
}

const Debug: React.FC<DebugProps> = (props) => {
  return (
    <>
      {DEV
        ? React.Children.map(props.children, (child) => {
            if (React.isValidElement<{ className: string }>(child)) {
              return React.cloneElement(child, {
                ...child.props,
                className: clsx(
                  child.props.className,
                  {
                    border: props.width === 1,
                    [`border-${props.width!}`]: props.width && props.width > 1
                  },
                  "border-red-500"
                )
              });
            }
          })
        : props.children}
    </>
  );
};

Debug.defaultProps = { width: 2 };

export default Debug;
