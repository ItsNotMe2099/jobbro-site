interface Props {
  color?: string
  className?: string
  onClick: () => void
}

export default function MobileMenuSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="3" rx="1.5" fill={props.color} />
      <rect x="3" y="10" width="18" height="3" rx="1.5" fill={props.color} />
      <rect x="3" y="16" width="18" height="3" rx="1.5" fill={props.color} />
    </svg>
  )
}
