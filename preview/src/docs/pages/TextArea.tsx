import { TextArea } from 'ui/components/text-area';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A multi-line text field. Fixed at a row count, user-resizable, or growing with its content up to a cap.',
  controls: {
    placeholder: { type: 'text', default: 'Tell us a little about yourself…' },
    rows: { type: 'number', default: 3, min: 1, max: 8, step: 1 },
    autoResize: { type: 'boolean', label: 'Auto-resize', default: false },
    maxRows: { type: 'number', label: 'Max rows (auto-resize)', default: 6, min: 2, max: 12, step: 1 },
    resize: { type: 'segmented', options: ['none', 'vertical', 'both'], default: 'none' },
    disabled: { type: 'boolean', default: false },
  },
  render: ({ placeholder, rows, autoResize, maxRows, resize, disabled }) => (
    <div style={{ width: 360 }}>
      <TextArea
        placeholder={placeholder}
        rows={rows}
        autoResize={autoResize}
        maxRows={autoResize ? maxRows : undefined}
        resize={resize}
        disabled={disabled}
        aria-label="Bio"
      />
    </div>
  ),
});
