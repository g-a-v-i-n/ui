import React, { Children } from "react";
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

export const ToolbarRoot = ({ className = "", ref, ...props }: ToolbarPrimitive.ToolbarProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ToolbarPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    />
  );
};

export const ToolbarButton = ({
  children,
  className = "",
  width = "hug",
  ref,
  ...props
}: ToolbarPrimitive.ToolbarButtonProps & { width?: "hug" | "square" } & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <ToolbarPrimitive.Button
      {...props}
      ref={ref}
      data-width={width}
      className={`${styles.button} ${className}`}
    >
      {wrapText(children)}
    </ToolbarPrimitive.Button>
  );
};

export const ToolbarLink = ({ children, className = "", ref, ...props }: ToolbarPrimitive.ToolbarLinkProps & { ref?: React.Ref<HTMLAnchorElement> }) => {
  return (
    <ToolbarPrimitive.Link
      {...props}
      ref={ref}
      className={`${styles.link} ${className}`}
    >
      {wrapText(children)}
    </ToolbarPrimitive.Link>
  );
};

export const ToolbarSeparator = ({ className = "", ref, ...props }: ToolbarPrimitive.ToolbarSeparatorProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ToolbarPrimitive.Separator
      {...props}
      ref={ref}
      className={`${styles.separator} ${className}`}
    />
  );
};

export const ToolbarToggleGroup = ({
  className = "",
  ref,
  ...props
}: (
  | ToolbarPrimitive.ToolbarToggleGroupSingleProps
  | ToolbarPrimitive.ToolbarToggleGroupMultipleProps
) & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ToolbarPrimitive.ToggleGroup
      {...props}
      ref={ref}
      className={`${styles.toggleGroup} ${className}`}
    />
  );
};

export const ToolbarToggleItem = ({
  children,
  className = "",
  ref,
  ...props
}: ToolbarPrimitive.ToolbarToggleItemProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <ToolbarPrimitive.ToggleItem
      {...props}
      ref={ref}
      className={`${styles.button} ${className}`}
    >
      {wrapText(children)}
    </ToolbarPrimitive.ToggleItem>
  );
};

/* Plain layout grouping for related toolbar controls. */
export const ToolbarGroup = ({
  className = "",
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`${styles.group} ${className}`}
    />
  );
};

export type ToolbarInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "width" | "prefix"
> & {
  width?: "hug" | "fill" | number;
  prefixSlot?: React.ReactNode;
  suffixSlot?: React.ReactNode;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  ref?: React.Ref<HTMLInputElement>;
};

/* An input dressed like a quiet toolbar button — same height, radius, and
   hover treatment as ToolbarButton. Hug width sizes to content via CSS
   field-sizing. */
export const ToolbarInput = ({
  className = "",
  containerClassName = "",
  containerStyle,
  width = "hug",
  type = "text",
  prefixSlot,
  suffixSlot,
  ref,
  ...props
}: ToolbarInputProps) => {
  const widthMode = typeof width === "number" ? "number" : width;
  const numberStyle =
    typeof width === "number" ? { width: `${width}px` } : undefined;

  return (
    <div
      data-width={widthMode}
      className={`${styles.inputContainer} ${containerClassName}`}
      style={{ ...containerStyle, ...numberStyle }}
    >
      {prefixSlot && <span className={styles.inputSlot}>{prefixSlot}</span>}
      <input
        {...props}
        ref={ref}
        type={type}
        className={`${styles.input} ${className}`}
      />
      {suffixSlot && <span className={styles.inputSlot}>{suffixSlot}</span>}
    </div>
  );
};

export type ToolbarSplitButtonProps = {
  prefixSlot?: React.ReactNode;
  tooltip?: React.ReactNode;
  dropdownContent: React.ReactNode;
  dropdownAlign?: "start" | "center" | "end";
  dropdownWidth?: "sm" | "md" | "lg" | "auto";
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix">;

export const ToolbarSplitButton = ({
  children,
  prefixSlot,
  tooltip,
  dropdownContent,
  dropdownAlign = "end",
  dropdownWidth = "auto",
  disabled,
  className = "",
  ref,
  ...props
}: ToolbarSplitButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const primaryButton = (
    <ToolbarPrimitive.Button
      {...props}
      ref={ref}
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
              <SFSymbol symbol="􀆈" size="xs" weight="semibold" />
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
};
