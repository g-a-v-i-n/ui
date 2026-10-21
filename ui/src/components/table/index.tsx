import React from "react";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const TableRoot = styled("table", styles.table, "TableRoot");
export type TableRootProps = PropsOf<typeof TableRoot>;
export const TableHeader = styled("thead", styles.header, "TableHeader");
export type TableHeaderProps = PropsOf<typeof TableHeader>;
export const TableBody = styled("tbody", styles.body, "TableBody");
export type TableBodyProps = PropsOf<typeof TableBody>;
export const TableFooter = styled("tfoot", styles.footer, "TableFooter");
export type TableFooterProps = PropsOf<typeof TableFooter>;

export type TableRowProps = PropsOf<"tr"> & {
  selected?: boolean;
  /** Set false to drop the hover fill on body rows that are not interactive. */
  hoverable?: boolean;
};

export const TableRow = ({
  className,
  selected = false,
  hoverable = true,
  ...props
}: TableRowProps) => {
  return (
    <tr
      {...props}
      data-selected={selected || undefined}
      data-hoverable={hoverable ? undefined : "false"}
      className={cx(styles.row, className)}
    />
  );
};

export type TableHeadProps = Omit<PropsOf<"th">, "color">;

export const TableHead = ({
  className,
  ref,
  ...props
}: TableHeadProps) => {
  return (
    <Text
      as="th"
      size="xs"
      weight="medium"
      {...props}
      // SAFETY: as="th" renders an HTMLTableCellElement, so the narrower ref
      // only ever receives that element.
      ref={ref as React.Ref<HTMLElement>}
      className={cx(styles.head, className)}
    />
  );
};

export type TableCellProps = Omit<PropsOf<"td">, "color">;

export const TableCell = ({
  className,
  ref,
  ...props
}: TableCellProps) => {
  return (
    <Text
      as="td"
      size="sm"
      {...props}
      // SAFETY: as="td" renders an HTMLTableCellElement, so the narrower ref
      // only ever receives that element.
      ref={ref as React.Ref<HTMLElement>}
      className={cx(styles.cell, className)}
    />
  );
};

export type TableCaptionProps = Omit<PropsOf<"caption">, "color">;

export const TableCaption = ({ className, ref, ...props }: TableCaptionProps) => {
  return (
    <Text
      as="caption"
      size="xs"
      {...props}
      // SAFETY: as="caption" renders an HTMLTableCaptionElement, so the
      // narrower ref only ever receives that element.
      ref={ref as React.Ref<HTMLElement>}
      className={cx(styles.caption, className)}
    />
  );
};
