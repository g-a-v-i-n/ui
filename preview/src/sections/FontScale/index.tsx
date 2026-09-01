import { useState } from 'react';
import {
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from 'ui/components/table';
import { Text } from 'ui/components/text';
import { Section } from '../../Section';
import styles from './styles.module.css';

// The font-size scale, largest → smallest. Token names match the `Text` size
// prop one-to-one (xs..5xl).
const TOKENS = ['5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;

/* Resolve the values from the live custom properties so the table can never
   drift from css/font.css. */
function readScale() {
  const cs = getComputedStyle(document.documentElement);
  const read = (name: string) => cs.getPropertyValue(name).trim() || '—';
  return TOKENS.map((token) => ({
    token,
    fontSize: read(`--font-size-${token}`),
    lineHeight: read(`--line-height-${token}`),
    letterSpacing: read(`--letter-spacing-${token}`),
  }));
}

export function FontScaleSection() {
  const [scale] = useState(readScale);
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
          {scale.map(({ token, fontSize, lineHeight, letterSpacing }) => (
            <TableRow key={token}>
              <TableCell>
                <Text as="code" size="sm" mono className={styles.token}>
                  {token}
                </Text>
              </TableCell>
              <TableCell>
                <Text as="code" size="sm" mono className={styles.value}>
                  --font-size-{token}
                </Text>
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
