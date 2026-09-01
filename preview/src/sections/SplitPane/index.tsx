import type { CSSProperties } from 'react';
import { Text } from 'ui/components/text';
import { SplitPane, SplitPanePane } from 'ui/components/split-pane';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function SplitPaneSection() {
  return (
    <Section title="SplitPane">
      <div className={styles.container}>
        <SplitPane defaultSizes={[1, 3]}>
          <SplitPanePane minSize={120} snap>
            <div className={styles.pane} style={{ '--pane-background': 'var(--bg-secondary)' } as CSSProperties}>
              <Text size="sm" color="secondary">
                snaps closed
              </Text>
            </div>
          </SplitPanePane>
          <SplitPanePane minSize={160}>
            <SplitPane vertical defaultSizes={[2, 1]}>
              <SplitPanePane minSize={80}>
                <div className={styles.pane} style={{ '--pane-background': 'var(--bg-primary)' } as CSSProperties}>
                  <Text size="sm" color="secondary">
                    main
                  </Text>
                </div>
              </SplitPanePane>
              <SplitPanePane minSize={60}>
                <div className={styles.pane} style={{ '--pane-background': 'var(--bg-tertiary)' } as CSSProperties}>
                  <Text size="sm" color="secondary">
                    bottom panel
                  </Text>
                </div>
              </SplitPanePane>
            </SplitPane>
          </SplitPanePane>
        </SplitPane>
      </div>
    </Section>
  );
}
