import React, { Children, type Ref } from "react";
import { Toolbar as ToolbarPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import { Tooltip } from "../tooltip";
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuArrow,
} from "../dropdown-menu";
import styles from "./styles.module.css";

const wrapText = (children: React.ReactNode) =>
  Children.map(children, (child) =>
    typeof child === "string" || typeof child === "number" ? (
      <Text as="span" size="sm" weight="medium">
        {child}
      </Text>
    ) : (
      child
    )
  );

export const ToolbarRoot = React.forwardRef(
  (
    { className = "", ...props }: ToolbarPrimitive.ToolbarProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ToolbarPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      />
    );
  }
);

ToolbarRoot.displayName = "ToolbarRoot";

export const ToolbarButton = React.forwardRef(
  (
    {
      children,
      className = "",
      width = "hug",
      ...props
    }: ToolbarPrimitive.ToolbarButtonProps & { width?: "hug" | "square" },
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <ToolbarPrimitive.Button
        {...props}
        ref={forwardedRef}
        data-width={width}
        className={`${styles.button} ${className}`}
      >
        {wrapText(children)}
      </ToolbarPrimitive.Button>
    );
  }
);

ToolbarButton.displayName = "ToolbarButton";

export const ToolbarLink = React.forwardRef(
  (
    { children, className = "", ...props }: ToolbarPrimitive.ToolbarLinkProps,
    forwardedRef: Ref<HTMLAnchorElement> | undefined
  ) => {
    return (
      <ToolbarPrimitive.Link
        {...props}
        ref={forwardedRef}
        className={`${styles.link} ${className}`}
      >
        {wrapText(children)}
      </ToolbarPrimitive.Link>
    );
  }
);

ToolbarLink.displayName = "ToolbarLink";

export const ToolbarSeparator = React.forwardRef(
  (
    { className = "", ...props }: ToolbarPrimitive.ToolbarSeparatorProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ToolbarPrimitive.Separator
        {...props}
        ref={forwardedRef}
        className={`${styles.separator} ${className}`}
      />
    );
  }
);

ToolbarSeparator.displayName = "ToolbarSeparator";

export const ToolbarToggleGroup = React.forwardRef(
  (
    {
      className = "",
      ...props
    }:
      | ToolbarPrimitive.ToolbarToggleGroupSingleProps
      | ToolbarPrimitive.ToolbarToggleGroupMultipleProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ToolbarPrimitive.ToggleGroup
        {...props}
        ref={forwardedRef}
        className={`${styles.toggleGroup} ${className}`}
      />
    );
  }
);

ToolbarToggleGroup.displayName = "ToolbarToggleGroup";

export const ToolbarToggleItem = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: ToolbarPrimitive.ToolbarToggleItemProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <ToolbarPrimitive.ToggleItem
        {...props}
        ref={forwardedRef}
        className={`${styles.button} ${className}`}
      >
        {wrapText(children)}
      </ToolbarPrimitive.ToggleItem>
    );
  }
);

ToolbarToggleItem.displayName = "ToolbarToggleItem";

export type ToolbarSplitButtonProps = {
  prefixSlot?: React.ReactNode;
  tooltip?: React.ReactNode;
  dropdownContent: React.ReactNode;
  dropdownAlign?: "start" | "center" | "end";
  dropdownWidth?: "sm" | "md" | "lg" | "auto";
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix">;

export const ToolbarSplitButton = React.forwardRef(
  (
    {
      children,
      prefixSlot,
      tooltip,
      dropdownContent,
      dropdownAlign = "end",
      dropdownWidth = "auto",
      disabled,
      className = "",
      ...props
    }: ToolbarSplitButtonProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    const primaryButton = (
      <ToolbarPrimitive.Button
        {...props}
        ref={forwardedRef}
        disabled={disabled}
        className={styles.splitPrimary}
      >
        {prefixSlot && <span className={styles.splitPrefix}>{prefixSlot}</span>}
        {wrapText(children)}
      </ToolbarPrimitive.Button>
    );

    return (
      <div className={`${styles.split} ${className}`}>
        {tooltip ? (
          <Tooltip content={tooltip}>{primaryButton}</Tooltip>
        ) : (
          primaryButton
        )}
        <DropdownMenuRoot>
          <DropdownMenuTrigger>
            <ToolbarPrimitive.Button
              aria-label="More options"
              disabled={disabled}
              className={styles.splitTrigger}
            >
              <span className={styles.splitChevron} aria-hidden="true">
                <SFSymbol symbol="􀆈" size="sm" />
              </span>
            </ToolbarPrimitive.Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={dropdownAlign}
            width={dropdownWidth}
            sideOffset={8}
          >
            {dropdownContent}
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </div>
    );
  }
);

ToolbarSplitButton.displayName = "ToolbarSplitButton";
