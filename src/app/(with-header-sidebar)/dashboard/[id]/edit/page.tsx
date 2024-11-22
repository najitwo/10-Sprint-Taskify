import EditForm from './_components/EditForm';
import Invitations from './_components/Invitations';
import Members from './_components/Members';
import styles from './page.module.css';

export default function EditPage() {
  return (
    <div className={styles.page}>
      <EditForm />
      <Members />
      <Invitations />
    </div>
  );
}
