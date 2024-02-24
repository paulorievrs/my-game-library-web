type Props = {} & React.SVGProps<SVGSVGElement>;

export default function Menu({ ...props }: Props) {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 6H20M4 12H14M4 18H9"
        stroke="#5858FA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
