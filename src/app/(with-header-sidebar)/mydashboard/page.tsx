import Dashboards from './_components/dashboards/Dashboards';
import Invitations from './_components/invitations/Invitations';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.mydashboard}>
      <Dashboards />
      <Invitations />
    </div>
  );
}
