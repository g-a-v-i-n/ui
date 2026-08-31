import React, { Children } from "react";
import { Text, type TextProps } from "./index";

/* Only wrap plain text in Text — element children (icons) stay direct flex
   items so align-items centers them instead of baseline-sitting inside an
   inline text span. */
export const wrapTextChildren = (
  children: React.ReactNode,
  size: TextProps["size"] = "sm"
) =>
  Children.map(children, (child) =>
    typeof child === "string" || typeof child === "number" ? (
      <Text as="span" size={size} weight="medium">
        {child}
      </Text>
    ) : (
      child
    )
  );
