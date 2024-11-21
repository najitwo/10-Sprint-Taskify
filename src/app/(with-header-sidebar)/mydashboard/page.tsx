import Dashboards from './_components/dashboards/Dashboards';
import MyInvitations from './_components/invitations/MyInvitations';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.mydashboard}>
      <Dashboards />
      <MyInvitations />
    </div>
  );
}
