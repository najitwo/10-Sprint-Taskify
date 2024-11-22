import styles from './Avatar.module.css';

function getRandomColor(name: string): string {
  const hash = [...name].reduce(
    (acc, char) => acc + char.charCodeAt(0) * 31,
    0
  );
  const getValue = (offset: number) => (((hash >> offset) % 0xff) % 76) + 180;
  const red = getValue(0);
  const green = getValue(8);
  const blue = getValue(16);

  return `rgb(${red}, ${green}, ${blue})`;
}

export default function Avatar({ name }: { name: string }) {
  return (
    <div
      className={styles.avatar}
      style={{ backgroundColor: `${getRandomColor(name)}` }}
    >
      {name[0].toUpperCase()}
    </div>
  );
}
