import Dashboards from './_components/dashboards/Dashboards';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.mydashboard}>
      <Dashboards />
    </div>
  );
}
