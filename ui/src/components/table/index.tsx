import React from "react";
import styles from "./styles.module.css";

export const TableRoot = ({ className = "", ref, ...props }: React.TableHTMLAttributes<HTMLTableElement> & { ref?: React.Ref<HTMLTableElement> }) => {
  return (
    <table
      {...props}
      ref={ref}
      className={`${styles.table} ${className}`}
    />
  );
};

export const TableHeader = ({
  className = "",
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.Ref<HTMLTableSectionElement> }) => {
  return (
    <thead
      {...props}
      ref={ref}
      className={`${styles.header} ${className}`}
    />
  );
};

export const TableBody = ({
  className = "",
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.Ref<HTMLTableSectionElement> }) => {
  return (
    <tbody
      {...props}
      ref={ref}
      className={`${styles.body} ${className}`}
    />
  );
};

export const TableFooter = ({
  className = "",
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.Ref<HTMLTableSectionElement> }) => {
  return (
    <tfoot
      {...props}
      ref={ref}
      className={`${styles.footer} ${className}`}
    />
  );
};

export const TableRow = ({
  className = "",
  selected = false,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & { selected?: boolean } & { ref?: React.Ref<HTMLTableRowElement> }) => {
  return (
    <tr
      {...props}
      ref={ref}
      data-selected={selected || undefined}
      className={`${styles.row} ${className}`}
    />
  );
};

export const TableHead = ({
  className = "",
  ref,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & { ref?: React.Ref<HTMLTableCellElement> }) => {
  return (
    <th
      {...props}
      ref={ref}
      className={`${styles.head} ${className}`}
    />
  );
};

export const TableCell = ({
  className = "",
  ref,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { ref?: React.Ref<HTMLTableCellElement> }) => {
  return (
    <td
      {...props}
      ref={ref}
      className={`${styles.cell} ${className}`}
    />
  );
};

export const TableCaption = ({ className = "", ref, ...props }: React.HTMLAttributes<HTMLTableCaptionElement> & { ref?: React.Ref<HTMLTableCaptionElement> }) => {
  return (
    <caption
      {...props}
      ref={ref}
      className={`${styles.caption} ${className}`}
    />
  );
};
