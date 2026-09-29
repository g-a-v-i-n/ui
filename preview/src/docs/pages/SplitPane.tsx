import type { CSSProperties } from 'react';
import { SplitPane, SplitPanePane } from 'ui/components/split-pane';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

const pane = (background: string): CSSProperties => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background,
});

export const doc = defineDoc({
  description:
    'Resizable panes divided by draggable sashes. Double-click a sash to reset; nest one inside another to split both ways.',
  controls: {
    vertical: { type: 'boolean', default: false },
    separator: { type: 'boolean', default: true },
    snap: { type: 'boolean', label: 'Snap first pane closed', default: true },
    minSize: { type: 'number', label: 'Min size', default: 100, min: 0, max: 200, step: 10 },
    thirdPane: { type: 'boolean', label: 'Third pane', default: false },
  },
  /* Allotment lays the panes out once on mount, so the key remounts it when
     a layout control changes. */
  render: ({ vertical, separator, snap, minSize, thirdPane }) => (
    <div
      style={{
        width: 420,
        height: 240,
        borderRadius: 12,
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}
    >
      <SplitPane
        key={`${vertical}-${separator}-${snap}-${minSize}-${thirdPane}`}
        vertical={vertical}
        separator={separator}
        defaultSizes={thirdPane ? [1, 2, 1] : [1, 2]}
      >
        <SplitPanePane minSize={minSize} snap={snap}>
          <div style={pane('var(--bg-secondary)')}>
            <Text size="sm" color="secondary">
              {snap ? 'snaps closed' : 'sidebar'}
            </Text>
          </div>
        </SplitPanePane>
        <SplitPanePane minSize={minSize}>
          <div style={pane('var(--bg-primary)')}>
            <Text size="sm" color="secondary">
              main
            </Text>
          </div>
        </SplitPanePane>
        {thirdPane && (
          <SplitPanePane minSize={minSize}>
            <div style={pane('var(--bg-tertiary)')}>
              <Text size="sm" color="secondary">
                inspector
              </Text>
            </div>
          </SplitPanePane>
        )}
      </SplitPane>
    </div>
  ),
});
