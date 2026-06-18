import { Text } from 'ui/components/text';
import { Link } from 'ui/components/link';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function TextSection() {
  return (
    <Section title="Text">
      <div className={styles.column}>
        <Text as="h1" size="2xl" weight="semibold">
          Heading 2xl semibold
        </Text>
        <Text as="h2" size="xl" weight="semibold">
          Heading xl semibold
        </Text>
        <Text as="h3" size="lg" weight="medium">
          Heading lg medium
        </Text>
        <Text size="md">Body md regular — the quick brown fox jumps over the lazy dog.</Text>
        <Text size="sm" color="secondary">
          Body sm secondary — supporting text.
        </Text>
        <Text size="xs" color="tertiary">
          Caption xs tertiary — fine print.
        </Text>
        <Text as="label" size="sm" weight="medium">
          Inline label
        </Text>
        <div className={styles.truncateBox}>
          <Text truncate>This text is truncated when it overflows its container</Text>
        </div>
        <div className={styles.row}>
          <Text size="sm" weight="regular">regular</Text>
          <Text size="sm" weight="medium">medium</Text>
          <Text size="sm" weight="semibold">semibold</Text>
          <Text size="sm" weight="bold">bold</Text>
        </div>
        <div className={styles.row}>
          <Text size="sm" color="primary">primary</Text>
          <Text size="sm" color="secondary">secondary</Text>
          <Text size="sm" color="tertiary">tertiary</Text>
          <span className={styles.blueParent}>
            <Text size="sm" color="inherit">inherit (blue parent)</Text>
          </span>
        </div>
        <div className={styles.row}>
          <Text size="sm" transform="uppercase">uppercase</Text>
          <Text size="sm" transform="lowercase">LOWERCASE</Text>
          <Text size="sm" transform="capitalize">capitalize each word</Text>
          <Text size="sm" decoration="underline">underline</Text>
          <Text size="sm" decoration="line-through">line-through</Text>
        </div>
        <div className={styles.row}>
          <Text size="sm" tabularNumbers>
            1111.11 / 0000.00 (tabular)
          </Text>
          <Text size="sm">1111.11 / 0000.00 (proportional)</Text>
        </div>
        <div className={styles.row}>
          <Text as="p" size="sm">as p</Text>
          <Text as="div" size="sm">as div</Text>
          <Text as="h4" size="sm">as h4 (margins reset)</Text>
        </div>
        <Text as="p" size="md">
          Body text with an inline <Link href="#">md link</Link> that inherits its size.
        </Text>
        <Text as="p" size="xs" color="secondary">
          Fine print with an <Link href="#">xs link</Link> inheriting the smaller size.
        </Text>
        <Text size="sm" mono color="secondary">
          mono: const version = "0.0.1";
        </Text>
      </div>
    </Section>
  );
}
