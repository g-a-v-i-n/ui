import { useState } from 'react';
import { Controls } from './Controls';
import { initialValues, type Doc } from './types';
import styles from './docs.module.css';

export function Hero({ doc }: { doc: Doc }) {
  const [values, setValues] = useState(() => initialValues(doc.controls));
  const hasControls = Object.keys(doc.controls).length > 0;

  return (
    <div className={styles.hero}>
      <div className={styles.stage}>{doc.render(values)}</div>
      {hasControls && (
        <aside className={styles.panel} aria-label="Example controls">
          <Controls
            controls={doc.controls}
            values={values}
            onChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
          />
        </aside>
      )}
    </div>
  );
}
