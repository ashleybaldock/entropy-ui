import React from "react";
import { FlexBase } from "../FlexBase";

export const FlexRow = ({
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
    <FlexBase flexDirection={'row'} {...props}>
      {children}
    </FlexBase>
  );
};
