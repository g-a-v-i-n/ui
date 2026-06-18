import { TextArea } from 'ui/components/text-area';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function TextAreaSection() {
  return (
    <Section title="TextArea">
      <div className={styles.column}>
        <TextArea placeholder="Fixed three rows…" />
        <TextArea
          autoResize
          rows={2}
          maxRows={6}
          placeholder="Auto-resizing — type to grow up to six rows…"
        />
        <TextArea rows={2} resize="vertical" placeholder="Drag the corner to resize…" />
        <TextArea rows={2} disabled value="Disabled textarea" />
      </div>
    </Section>
  );
}
