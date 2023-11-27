interface Props {
  color?: string
  className?: string
}

export default function BookmarkSvg(props: Props) {
  return (
    <svg className={props.className} width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 -1H15V22.9214L9.2482 18.3272C8.51821 17.7441 7.48179 17.7441 6.7518 18.3272L0.999998 22.9214L1 -1Z" fill={props.color} stroke={props.color} strokeWidth="2"/>
    </svg>
  )
}
