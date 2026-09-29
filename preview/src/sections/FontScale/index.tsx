import { useEffect, useState } from 'react';
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
   drift from css/font.css. Font size and tracking are calc() expressions on
   --font-scaling, so they're measured on a probe element rather than read
   back as text; line-height is a plain ratio and can be read directly. */
function readScale() {
  const root = getComputedStyle(document.documentElement);
  const probe = document.createElement('span');
  document.body.append(probe);
  const rows = TOKENS.map((token) => {
    probe.style.fontSize = `var(--font-size-${token})`;
    probe.style.letterSpacing = `var(--letter-spacing-${token})`;
    const cs = getComputedStyle(probe);
    return {
      token,
      fontSize: cs.fontSize,
      lineHeight: root.getPropertyValue(`--line-height-${token}`).trim() || '—',
      // Chrome serialises a zero letter-spacing as "normal".
      letterSpacing: cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing,
    };
  });
  probe.remove();
  return rows;
}

export function FontScaleSection() {
  const [scale, setScale] = useState(readScale);

  /* Re-measure when the ramp changes: the sidebar's Font scale picker flips
     data-font-scale on <html>, and crossing the small-screen breakpoint
     changes --font-scaling. */
  useEffect(() => {
    const update = () => setScale(readScale());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-font-scale'],
    });
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);
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
