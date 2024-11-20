import EditForm from './_components/EditForm';
import Invitations from './_components/Invitations';
import styles from './page.module.css';

export default function EditPage() {
  return (
    <div className={styles.page}>
      <EditForm />
      <Invitations />
    </div>
  );
}
