import React from "react";
import { FlexBase } from "../FlexBase";

export const FlexColumn = ({
  children,
  // className = "",
  // alignItems = undefined,
  // justifyContent = undefined,
  // flex = undefined,
  // flexWrap = "nowrap",
  // style = {},
  ...props
}) => {
  return (
    <FlexBase flexDirection={"column"} {...props}>
      {children}
    </FlexBase>
  );
};
