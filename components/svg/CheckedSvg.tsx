interface Props {
  className?: string
  color?: string
}

export default function CheckedSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3.75" y="0.75" width="16.5" height="21.5" rx="3.25" stroke={props.color} stroke-width="1.5" />
      <rect x="7" y="6" width="10" height="1.5" rx="0.75" fill={props.color} />
      <rect x="7" y="11" width="6" height="1.5" rx="0.75" fill={props.color} />
    </svg>
  )
}

