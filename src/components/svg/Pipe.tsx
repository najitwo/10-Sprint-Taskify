export default function Pipe({ width = '2', height = '20', fill = '#D9D9D9' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 2 20"
      fill="none"
    >
      <path d="M1 0V20" stroke={fill} />
    </svg>
  );
}
