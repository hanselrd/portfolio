import clsx from "clsx";
import React from "react";

interface ItemProps {
  type?: "one" | "auto" | "initial" | "none";
}

const Item: React.FC<ItemProps> = (props) => {
  return (
    <div
      className={clsx({
        "flex-1": props.type === "one",
        "flex-auto": props.type === "auto",
        "flex-initial": props.type === "initial",
        "flex-none": props.type === "none",
      })}>
      {props.children}
    </div>
  );
};

Item.defaultProps = { type: "none" };

interface FlexProps {
  inline?: boolean;
  direction?: "row" | "column";
  reverse?: boolean;
  wrap?: boolean;
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  content?: "start" | "end" | "center" | "between" | "around" | "evenly";
  space?: number;
}

const Flex: React.FC<FlexProps> & { Item: typeof Item } = (props) => {
  return (
    <div
      className={clsx({
        "flex": !props.inline,
        "inline-flex": props.inline,
        "flex-row": props.direction === "row" && !props.reverse,
        "flex-row-reverse": props.direction === "row" && props.reverse,
        "flex-col": props.direction === "column" && !props.reverse,
        "flex-col-reverse": props.direction === "column" && props.reverse,
        "flex-wrap": props.wrap && !props.reverse,
        "flex-wrap-reverse": props.wrap && props.reverse,
        "justify-start": props.justify === "start",
        "justify-end": props.justify === "end",
        "justify-center": props.justify === "center",
        "justify-between": props.justify === "between",
        "justify-around": props.justify === "around",
        "justify-evenly": props.justify === "evenly",
        "content-start": props.wrap && props.content === "start",
        "content-end": props.wrap && props.content === "end",
        "content-center": props.wrap && props.content === "center",
        "content-between": props.wrap && props.content === "between",
        "content-around": props.wrap && props.content === "around",
        "content-evenly": props.wrap && props.content === "evenly",
        [`space-x-${props.space!}`]: props.direction === "row" && props.space && props.space >= 0,
        [`space-y-${props.space!}`]:
          props.direction === "column" && props.space && props.space >= 0,
        "space-x-reverse": props.direction === "row" && props.reverse,
        "space-y-reverse": props.direction === "column" && props.reverse,
      })}>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement<{ children?: React.ReactNode; className?: string }>(child)) {
          return React.cloneElement(
            child,
            {
              ...child.props,
              className: clsx(
                {
                  "mx-auto": props.direction === "column",
                  "my-auto": props.direction === "row",
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

Flex.defaultProps = {
  direction: "row",
};

Flex.Item = Item;

export default Flex;
