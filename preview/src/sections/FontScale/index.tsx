import {
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from 'ui/components/table';
import { Section } from '../../Section';
import styles from './styles.module.css';

// The font-size scale, largest → smallest. Token names match the `Text` size
// prop one-to-one (xs..4xl). Values mirror css/font.css.
const SCALE = [
  { token: '5xl', fontSize: '64px', lineHeight: '1.05', letterSpacing: '-1.5px' },
  { token: '4xl', fontSize: '48px', lineHeight: '1.1', letterSpacing: '-1px' },
  { token: '3xl', fontSize: '32px', lineHeight: '1.2', letterSpacing: '-0.6px' },
  { token: '2xl', fontSize: '24px', lineHeight: '1.3', letterSpacing: '-0.5px' },
  { token: 'xl', fontSize: '20px', lineHeight: '1.4', letterSpacing: '-0.4px' },
  { token: 'lg', fontSize: '16px', lineHeight: '1.4', letterSpacing: '-0.32px' },
  { token: 'md', fontSize: '14px', lineHeight: '1.5', letterSpacing: '-0.15px' },
  { token: 'sm', fontSize: '13px', lineHeight: '1.4', letterSpacing: '-0.08px' },
  { token: 'xs', fontSize: '12px', lineHeight: '1.4', letterSpacing: '0px' },
];

export function FontScaleSection() {
  return (
    <Section title="Font scale">
      <TableRoot>
        <TableHeader>
          <TableRow>
            <TableHead>Size</TableHead>
            <TableHead>Variable</TableHead>
            <TableHead>Sample</TableHead>
            <TableHead>Font size</TableHead>
            <TableHead>Line height</TableHead>
            <TableHead>Letter spacing</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SCALE.map(({ token, fontSize, lineHeight, letterSpacing }) => (
            <TableRow key={token}>
              <TableCell>
                <code className={styles.token}>{token}</code>
              </TableCell>
              <TableCell>
                <code className={styles.value}>--font-size-{token}</code>
              </TableCell>
              <TableCell>
                <span
                  className={styles.sample}
                  style={{
                    fontSize: `var(--font-size-${token})`,
                    lineHeight: `var(--line-height-${token})`,
                    letterSpacing: `var(--letter-spacing-${token})`,
                  }}
                >
                  The quick brown fox
                </span>
              </TableCell>
              <TableCell className={styles.value}>{fontSize}</TableCell>
              <TableCell className={styles.value}>{lineHeight}</TableCell>
              <TableCell className={styles.value}>{letterSpacing}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Section>
  );
}
