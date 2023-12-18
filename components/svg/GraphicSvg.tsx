interface Props {
  color?: string
  className?: string
  percent: string
}

export default function GraphicSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="148" height={props.percent} viewBox="0 0 148 100" fill="none">
      <rect width="148" height="100" rx="8" fill="url(#paint0_linear_2999_25519)" />
      <defs>
        <linearGradient id="paint0_linear_2999_25519" x1="74" y1="100" x2="74" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DBF9DD" />
          <stop offset="1" stopColor="#24B563" />
        </linearGradient>
      </defs>
    </svg>
  )
}
