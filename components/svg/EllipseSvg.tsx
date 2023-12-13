interface Props {
  color?: string
  className?: string
}

export default function EllipseSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle opacity="0.3" cx="7.5" cy="7.5" r="7.5" fill={props.color} />
    </svg>
  )
}
