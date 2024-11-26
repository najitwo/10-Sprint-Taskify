import EditForm from './_components/EditForm';
import Invitations from './_components/Invitations';
import Members from './_components/Members';
import styles from './page.module.css';
import DeleteButton from './_components/DeleteButton';

export default function EditPage() {
  return (
    <>
      <div className={styles.container}>
        <EditForm />
        <Members />
        <Invitations />
      </div>
      <DeleteButton />
    </>
  );
}
