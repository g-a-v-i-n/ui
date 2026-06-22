import { useState } from 'react';
import { Icon } from 'ui/components/icon';
import { Text } from 'ui/components/text';
import { TextInput } from 'ui/components/text-input';
import { Tag } from 'ui/components/tag';
import { Spinner } from 'ui/components/spinner';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function TextInputSection() {
  const [inputDefault, setInputDefault] = useState('Hello');
  const [inputFill, setInputFill] = useState('');
  const [inputToolbar, setInputToolbar] = useState('Untitled');

  return (
    <Section title="TextInput">
      <div className={styles.column}>
        <TextInput
          value={inputDefault}
          onChange={(e) => setInputDefault(e.target.value)}
          placeholder="Type something…"
        />
        <TextInput
          width="fill"
          value={inputFill}
          onChange={(e) => setInputFill(e.target.value)}
          placeholder="Fill-width input"
          prefixSlot={<Icon icon="magnifying-glass" size="md" />}
        />
        <TextInput
          variant="toolbar"
          value={inputToolbar}
          onChange={(e) => setInputToolbar(e.target.value)}
        />
        <TextInput value="120" width={80} readOnly />
        <TextInput defaultValue="Disabled" disabled />
        <TextInput
          placeholder="Disabled with slots…"
          disabled
          prefixSlot={<Icon icon="magnifying-glass" size="md" />}
          suffixSlot={<Tag mono>⌘K</Tag>}
        />
        <TextInput
          type="number"
          defaultValue={1111}
          width={120}
          suffixSlot={
            <Text size="sm" color="tertiary" as="span">
              px
            </Text>
          }
        />
        <div className={styles.slotRow}>
          <TextInput
            defaultValue="hug + prefix"
            prefixSlot={<Icon icon="magnifying-glass" size="md" />}
          />
          <TextInput
            defaultValue="42"
            suffixSlot={
              <Text size="sm" color="tertiary" as="span">
                px
              </Text>
            }
          />
          <TextInput
            placeholder="Both slots…"
            prefixSlot={<Icon icon="magnifying-glass" size="md" />}
            suffixSlot={<Tag mono>⌘K</Tag>}
          />
          <TextInput
            defaultValue="Saving"
            readOnly
            suffixSlot={<Spinner size="sm" />}
          />
        </div>
        <TextInput
          width="fill"
          placeholder="Fill with both slots…"
          prefixSlot={<Icon icon="magnifying-glass" size="md" />}
          suffixSlot={<Tag>12 results</Tag>}
        />
        <TextInput
          width={140}
          defaultValue="3.14159"
          prefixSlot={
            <Text size="sm" color="tertiary" as="span">
              ≈
            </Text>
          }
          suffixSlot={
            <Text size="sm" color="tertiary" as="span">
              rad
            </Text>
          }
        />
      </div>
    </Section>
  );
}
