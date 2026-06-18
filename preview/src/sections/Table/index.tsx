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
import { Section } from '../../Section';
import styles from './styles.module.css';

export function TableSection() {
  return (
    <Section title="Table">
      <div className={styles.wrap}>
        <TableRoot>
          <TableCaption>Recent invoices, including a selected row.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className={styles.right}>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV-0091</TableCell>
              <TableCell><Tag variant="success">Paid</Tag></TableCell>
              <TableCell className={styles.right}>$1,250.00</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>INV-0092</TableCell>
              <TableCell><Tag variant="warning">Pending</Tag></TableCell>
              <TableCell className={styles.right}>$320.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV-0093</TableCell>
              <TableCell><Tag variant="error">Overdue</Tag></TableCell>
              <TableCell className={styles.right}>$96.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className={styles.right}>$1,666.50</TableCell>
            </TableRow>
          </TableFooter>
        </TableRoot>
      </div>
    </Section>
  );
}
