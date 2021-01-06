import clsx from "clsx";
import React from "react";

interface ListProps {
  spacing?: number;
  horizontal?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  className?: string;
}

const List: React.FC<ListProps> = (props) => {
  return (
    <div
      className={clsx(
        "flex flex-nowrap",
        {
          "flex-row": props.horizontal && !props.reverse,
          "flex-row-reverse": props.horizontal && props.reverse,
          "flex-col": props.vertical && !props.reverse,
          "flex-col-reverse": props.vertical && props.reverse,
        },
        props.className
      )}>
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement<{ children?: React.ReactNode; className?: string }>(child)) {
          return React.cloneElement(
            child,
            {
              ...child.props,
              className: clsx(
                "flex-none",
                {
                  [`m${
                    props.horizontal ? (!props.reverse ? "l" : "r") : !props.reverse ? "t" : "b"
                  }-${props.spacing!}`]: props.spacing && props.spacing >= 1 && index >= 1,
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
