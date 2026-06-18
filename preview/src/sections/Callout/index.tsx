import { useState } from 'react';
import { Callout } from 'ui/components/callout';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function CalloutSection() {
  const [showInfoCallout, setShowInfoCallout] = useState(true);

  return (
    <Section title="Callout">
      <div className={styles.column}>
        {showInfoCallout && (
          <Callout
            variant="info"
            title="Heads up"
            onClose={() => setShowInfoCallout(false)}
          >
            This is an inline, dismissible callout.
          </Callout>
        )}
        <Callout variant="success" title="Saved">
          Your changes have been saved successfully.
        </Callout>
        <Callout variant="warning">
          Your trial ends in 3 days — no title on this one.
        </Callout>
        <Callout variant="error" title="Upload failed">
          The file exceeds the 10&nbsp;MB limit.
        </Callout>
      </div>
    </Section>
  );
}
