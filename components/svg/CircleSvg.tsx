interface Props {
  className?: string
  color: string
}

export default function CircleSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 28 20" fill="none">
      <circle cx="4" cy="4" r="4" fill={props.color} />
    </svg>
  )
}
