import React, { type Ref } from "react";
import styles from "./styles.module.css";

export const TableRoot = React.forwardRef(
  (
    { className = "", ...props }: React.TableHTMLAttributes<HTMLTableElement>,
    forwardedRef: Ref<HTMLTableElement> | undefined
  ) => {
    return (
      <table
        {...props}
        ref={forwardedRef}
        className={`${styles.table} ${className}`}
      />
    );
  }
);

TableRoot.displayName = "TableRoot";

export const TableHeader = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: React.HTMLAttributes<HTMLTableSectionElement>,
    forwardedRef: Ref<HTMLTableSectionElement> | undefined
  ) => {
    return (
      <thead
        {...props}
        ref={forwardedRef}
        className={`${styles.header} ${className}`}
      />
    );
  }
);

TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: React.HTMLAttributes<HTMLTableSectionElement>,
    forwardedRef: Ref<HTMLTableSectionElement> | undefined
  ) => {
    return (
      <tbody
        {...props}
        ref={forwardedRef}
        className={`${styles.body} ${className}`}
      />
    );
  }
);

TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: React.HTMLAttributes<HTMLTableSectionElement>,
    forwardedRef: Ref<HTMLTableSectionElement> | undefined
  ) => {
    return (
      <tfoot
        {...props}
        ref={forwardedRef}
        className={`${styles.footer} ${className}`}
      />
    );
  }
);

TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef(
  (
    {
      className = "",
      selected = false,
      ...props
    }: React.HTMLAttributes<HTMLTableRowElement> & { selected?: boolean },
    forwardedRef: Ref<HTMLTableRowElement> | undefined
  ) => {
    return (
      <tr
        {...props}
        ref={forwardedRef}
        data-selected={selected || undefined}
        className={`${styles.row} ${className}`}
      />
    );
  }
);

TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: React.ThHTMLAttributes<HTMLTableCellElement>,
    forwardedRef: Ref<HTMLTableCellElement> | undefined
  ) => {
    return (
      <th
        {...props}
        ref={forwardedRef}
        className={`${styles.head} ${className}`}
      />
    );
  }
);

TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: React.TdHTMLAttributes<HTMLTableCellElement>,
    forwardedRef: Ref<HTMLTableCellElement> | undefined
  ) => {
    return (
      <td
        {...props}
        ref={forwardedRef}
        className={`${styles.cell} ${className}`}
      />
    );
  }
);

TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef(
  (
    { className = "", ...props }: React.HTMLAttributes<HTMLTableCaptionElement>,
    forwardedRef: Ref<HTMLTableCaptionElement> | undefined
  ) => {
    return (
      <caption
        {...props}
        ref={forwardedRef}
        className={`${styles.caption} ${className}`}
      />
    );
  }
);

TableCaption.displayName = "TableCaption";
