type Props = { color?: string } & React.SVGProps<SVGSVGElement>;
export default function ChevronDown({ color = "#000000", ...props }: Props) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Arrow / Chevron_Down">
        <path
          id="Vector"
          d="M19 9L12 16L5 9"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
