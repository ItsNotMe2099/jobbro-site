interface Props {
  color?: string
  className?: string
}

export default function ArrowChevronRightSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M10 8L14 12L10 16" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}
