export default function Dot({
  width = '1em',
  height = '1em',
  fill = '#5534da',
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 9 9"
      fill="none"
    >
      <circle cx="4" cy="4.06836" r="4" fill={fill} />
    </svg>
  );
}
