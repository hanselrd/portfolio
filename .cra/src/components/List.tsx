import clsx from "clsx";
import React from "react";

interface ListProps {
  spacing?: number;
  horizontal?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  wrap?: boolean;
}

const List: React.FC<ListProps> = (props) => {
  return (
    <div
      className={clsx("flex", {
        "flex-row": props.horizontal && !props.reverse,
        "flex-row-reverse": props.horizontal && props.reverse,
        "flex-col": props.vertical && !props.reverse,
        "flex-col-reverse": props.vertical && props.reverse,
        "flex-wrap": props.wrap,
        [`space-${props.horizontal ? "x" : "y"}-${props.spacing!}`]:
          (props.horizontal || props.vertical) && props.spacing && props.spacing >= 0,
        "space-x-reverse": props.horizontal && props.reverse,
        "space-y-reverse": props.vertical && props.reverse,
      })}>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement<{ children?: React.ReactNode; className?: string }>(child)) {
          return React.cloneElement(
            child,
            {
              ...child.props,
              className: clsx(
                "flex-none",
                {
                  "mx-auto": props.vertical,
                  "my-auto": props.horizontal,
                },
                child.props.className
              ),
            },
            child.props.children
          );
        }
      })}
    </div>
  );
};

List.defaultProps = { spacing: 0 };

export default List;
