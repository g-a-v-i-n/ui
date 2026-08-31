import React from "react";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const TableRoot = styled("table", styles.table, "TableRoot");
export const TableHeader = styled("thead", styles.header, "TableHeader");
export const TableBody = styled("tbody", styles.body, "TableBody");
export const TableFooter = styled("tfoot", styles.footer, "TableFooter");

export const TableRow = ({
  className,
  selected = false,
  ...props
}: React.ComponentProps<"tr"> & { selected?: boolean }) => {
  return (
    <tr
      {...props}
      data-selected={selected || undefined}
      className={cx(styles.row, className)}
    />
  );
};

export const TableHead = ({
  className,
  ref,
  ...props
}: Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "color"> & { ref?: React.Ref<HTMLTableCellElement> }) => {
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

export const TableCell = ({
  className,
  ref,
  ...props
}: Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "color"> & { ref?: React.Ref<HTMLTableCellElement> }) => {
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

export const TableCaption = ({ className, ref, ...props }: Omit<React.HTMLAttributes<HTMLTableCaptionElement>, "color"> & { ref?: React.Ref<HTMLTableCaptionElement> }) => {
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
