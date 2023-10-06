interface Props {
  color?: string
  className?: string
}

export default function DotSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
      <circle cx="2" cy="2" r="2" fill={props.color} />
    </svg>
  )
}
