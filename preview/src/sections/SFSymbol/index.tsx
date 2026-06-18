import { SFSymbol } from 'ui/components/sf-symbol';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function SFSymbolSection() {
  return (
    <Section title="SFSymbol">
      <div className={styles.column}>
        <div className={styles.sizeRow}>
          <SFSymbol symbol="􀆉" size="xs" />
          <SFSymbol symbol="􀆉" size="sm" />
          <SFSymbol symbol="􀆉" size="md" />
          <SFSymbol symbol="􀆉" size="lg" />
          <SFSymbol symbol="􀆉" size="xl" />
        </div>
        <div className={styles.gridRow}>
          {[...'􀆉􀯶􀆊􀯻􀆇􀆈􀆏􂦩􀙚􀁲􀄂􀯷􀯹􀁴􀄄􀯼􀯾􀆋􀰪􂨩􂨫􀆌􀰫􂨪􂨬􀁮􀃾􀁰􀄀􂪓􂪔􂝒􂦪􀆐􀆑􀆒􀆓􂉏􂉐􂝓􂦫􂦬􁍂􁍃􁍄􁍅􀓖􀣭􀁳􀄃􀯸􀯺􀁵􀄅􀯽􀯿􀁯􀃿􀁱􀄁􂨧􂨨􂪕􂪖􂪗􂪘􁚑􁚒􁅍􂪏􂪐􂪑􂪒􂦭'].map(
            (symbol, i) => (
              <SFSymbol key={i} symbol={symbol} size="lg" />
            )
          )}
        </div>
      </div>
    </Section>
  );
}
