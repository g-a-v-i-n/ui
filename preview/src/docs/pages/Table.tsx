import { Tag } from 'ui/components/tag';
import {
  TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from 'ui/components/table';
import { defineDoc } from '../types';

const invoices = [
  { id: 'INV-0091', status: 'Paid', variant: 'success', amount: '$1,250.00' },
  { id: 'INV-0092', status: 'Pending', variant: 'warning', amount: '$320.50' },
  { id: 'INV-0093', status: 'Overdue', variant: 'error', amount: '$96.00' },
] as const;

const right = { textAlign: 'right' } as const;

export const doc = defineDoc({
  description:
    'Tabular data with styled header, body, footer, and caption slots, plus a selected state for rows.',
  controls: {
    caption: { type: 'boolean', label: 'With caption', default: true },
    footer: { type: 'boolean', label: 'With footer', default: true },
    selected: { type: 'boolean', label: 'Selected row', default: true },
    tags: { type: 'boolean', label: 'Status as tags', default: true },
  },
  render: ({ caption, footer, selected, tags }) => (
    <div style={{ width: 420 }}>
      <TableRoot>
        {caption && <TableCaption>Recent invoices.</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead style={right}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, i) => (
            <TableRow key={invoice.id} selected={selected && i === 1}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>
                {tags ? <Tag variant={invoice.variant}>{invoice.status}</Tag> : invoice.status}
              </TableCell>
              <TableCell style={right}>{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {footer && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell style={right}>$1,666.50</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </TableRoot>
    </div>
  ),
});
