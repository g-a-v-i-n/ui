import React from "react";
import { Toolbar as ToolbarPrimitive } from "radix-ui";
import { wrapTextChildren } from "../text/wrap";
import { ChevronDownMiniBoldIcon } from "../icon/static/chevron-down-mini-bold";
import { Tooltip } from "../tooltip";
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuArrow,
} from "../dropdown-menu";
import { MENU_OFFSET } from "../../offsets";
import { TextInput } from "../text-input";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const ToolbarRoot = styled(ToolbarPrimitive.Root, styles.root, "ToolbarRoot");
export type ToolbarRootProps = PropsOf<typeof ToolbarRoot>;

export type ToolbarButtonProps = PropsOf<typeof ToolbarPrimitive.Button> & {
  width?: "hug" | "square";
};

export const ToolbarButton = ({
  children,
  className,
  width = "hug",
  ref,
  ...props
}: ToolbarButtonProps) => {
  return (
    <ToolbarPrimitive.Button
      {...props}
      ref={ref}
      data-width={width}
      className={cx(styles.button, className)}
    >
      {wrapTextChildren(children)}
    </ToolbarPrimitive.Button>
  );
};

export type ToolbarLinkProps = PropsOf<typeof ToolbarPrimitive.Link>;

export const ToolbarLink = ({ children, className, ref, ...props }: ToolbarLinkProps) => {
  return (
    <ToolbarPrimitive.Link
      {...props}
      ref={ref}
      className={cx(styles.link, className)}
    >
      {wrapTextChildren(children)}
    </ToolbarPrimitive.Link>
  );
};

export const ToolbarSeparator = styled(
  ToolbarPrimitive.Separator,
  styles.separator,
  "ToolbarSeparator"
);
export type ToolbarSeparatorProps = PropsOf<typeof ToolbarSeparator>;

export const ToolbarToggleGroup = styled(
  ToolbarPrimitive.ToggleGroup,
  styles.toggleGroup,
  "ToolbarToggleGroup"
);
export type ToolbarToggleGroupProps = PropsOf<typeof ToolbarToggleGroup>;

export type ToolbarToggleItemProps = PropsOf<typeof ToolbarPrimitive.ToggleItem> & {
  tooltip?: React.ReactNode;
};

export const ToolbarToggleItem = ({
  children,
  tooltip,
  className,
  ref,
  ...props
}: ToolbarToggleItemProps) => {
  const item = (
    <ToolbarPrimitive.ToggleItem
      {...props}
      ref={ref}
      className={cx(styles.button, className)}
    >
      {wrapTextChildren(children)}
    </ToolbarPrimitive.ToggleItem>
  );

  // The tooltip trigger and a Toolbar ToggleItem both write `data-state` to the
  // same node when composed via asChild, and the tooltip's value clobbers the
  // toggle's on/off state (radix-ui primitives#602). Give the tooltip its own
  // wrapper element so each keeps its data-state; focus/hover still bubble up.
  return tooltip ? (
    <Tooltip content={tooltip}>
      <span className={styles.tooltipTrigger}>{item}</span>
    </Tooltip>
  ) : item;
};

/* Plain layout grouping for related toolbar controls. */
export const ToolbarGroup = styled("div", styles.group, "ToolbarGroup");
export type ToolbarGroupProps = PropsOf<typeof ToolbarGroup>;

export type ToolbarInputProps = Omit<
  React.ComponentProps<typeof TextInput>,
  "variant"
>;

/* An input dressed like a quiet toolbar button — TextInput's toolbar variant
   under a toolbar-flavored name. */
export const ToolbarInput = (props: ToolbarInputProps) => (
  <TextInput variant="toolbar" {...props} />
);

export type ToolbarSplitButtonProps = {
  prefixSlot?: React.ReactNode;
  tooltip?: React.ReactNode;
  dropdownContent: React.ReactNode;
  dropdownAlign?: "start" | "center" | "end";
  dropdownWidth?: "sm" | "md" | "lg" | "auto";
  /** Render the primary (left) button as a square icon button. */
  square?: boolean;
  children?: React.ReactNode;
} & Omit<PropsOf<"button">, "prefix">;

export const ToolbarSplitButton = ({
  children,
  prefixSlot,
  tooltip,
  dropdownContent,
  dropdownAlign = "end",
  dropdownWidth = "auto",
  square = false,
  disabled,
  className,
  ref,
  ...props
}: ToolbarSplitButtonProps) => {
  const primaryButton = (
    <ToolbarPrimitive.Button
      {...props}
      ref={ref}
      disabled={disabled}
      data-width={square ? "square" : undefined}
      className={styles.splitPrimary}
    >
      {prefixSlot && <span className={styles.splitPrefix}>{prefixSlot}</span>}
      {wrapTextChildren(children)}
    </ToolbarPrimitive.Button>
  );

  return (
    <div className={cx(styles.split, className)}>
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
              <ChevronDownMiniBoldIcon size="lg" />
            </span>
          </ToolbarPrimitive.Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={dropdownAlign}
          width={dropdownWidth}
          sideOffset={MENU_OFFSET}
        >
          {dropdownContent}
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </div>
  );
};
