interface Props {
  color?: string
  className?: string
}

export default function AddSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="20" y="11" width="2" height="16" rx="1" transform="rotate(90 20 11)" fill={props.color} />
      <rect x="13" y="20" width="2" height="16" rx="1" transform="rotate(-180 13 20)" fill={props.color} />
    </svg>
  )
}
