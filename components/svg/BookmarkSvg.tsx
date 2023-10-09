interface Props {
  color?: string
  className?: string
  onClick: () => void
}

export default function BookmarkSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="36" viewBox="0 0 40 36" fill="none">
      <g clip-path="url(#clip0_1391_6920)">
        <path d="M13 -1H27V22.9214L21.2482 18.3272C20.5182 17.7441 19.4818 17.7441 18.7518 18.3272L13 22.9214L13 -1Z" fill={props.color} stroke="#24B563" stroke-width="2" />
      </g>
      <defs>
        <clipPath id="clip0_1391_6920">
          <rect width="40" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
