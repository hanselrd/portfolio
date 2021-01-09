import clsx from "clsx";
import React from "react";

interface ItemProps {
  rows?: number | [number, number];
  columns?: number | [number, number];
}

const Item: React.FC<ItemProps> = (props) => {
  return (
    <div
      className={clsx({
        [`row-span-${props.rows as number}`]:
          props.rows && typeof props.rows === "number" && props.rows >= 1,
        [`row-start-${props.rows! && (props.rows as [number, number])[0]}`]:
          props.rows && props.rows instanceof Array && props.rows[0] >= 1,
        [`row-end-${props.rows! && (props.rows as [number, number])[1]}`]:
          props.rows && props.rows instanceof Array && props.rows[1] >= 1,
        [`col-span-${props.columns as number}`]:
          props.columns && typeof props.columns === "number" && props.columns >= 1,
        [`col-start-${(props.columns as [number, number])[0]}`]:
          props.columns && props.columns instanceof Array && props.columns[0] >= 1,
        [`col-end-${(props.columns as [number, number])[1]}`]:
          props.columns && props.columns instanceof Array && props.columns[1] >= 1,
      })}>
      {props.children}
    </div>
  );
};

interface GridProps {
  inline?: boolean;
  flow?: "row" | "column";
  rows?: number;
  columns?: number;
  gap?: number;
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  content?: "start" | "end" | "center" | "between" | "around" | "evenly";
}

const Grid: React.FC<GridProps> & { Item: typeof Item } = (props) => {
  return (
    <div
      className={clsx({
        "grid": !props.inline,
        "inline-grid": props.inline,
        "grid-flow-row": props.flow === "row",
        "grid-flow-col": props.flow === "column",
        [`grid-rows-${props.rows!}`]: props.rows && props.rows >= 1,
        [`grid-cols-${props.columns!}`]: props.columns && props.columns >= 1,
        [`gap-${props.gap!}`]: props.gap && props.gap >= 0,
        "justify-start": props.justify === "start",
        "justify-end": props.justify === "end",
        "justify-center": props.justify === "center",
        "justify-between": props.justify === "between",
        "justify-around": props.justify === "around",
        "justify-evenly": props.justify === "evenly",
        "content-start": props.content === "start",
        "content-end": props.content === "end",
        "content-center": props.content === "center",
        "content-between": props.content === "between",
        "content-around": props.content === "around",
        "content-evenly": props.content === "evenly",
      })}>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement<{ children?: React.ReactNode; className?: string }>(child)) {
          return React.cloneElement(
            child,
            {
              ...child.props,
              className: clsx(
                {
                  "mx-auto": props.columns,
                  "my-auto": props.rows,
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

Grid.Item = Item;

export default Grid;
