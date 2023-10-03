interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

export default function CardViewSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M16.5 10.5C17.6046 10.5 18.5 11.3954 18.5 12.5V16.5C18.5 17.6046 17.6046 18.5 16.5 18.5H12.5C11.3954 18.5 10.5 17.6046 10.5 16.5V12.5C10.5 11.3954 11.3954 10.5 12.5 10.5H16.5Z" fill={props.color} />
      <path d="M27.5 10.5C28.6046 10.5 29.5 11.3954 29.5 12.5V16.5C29.5 17.6046 28.6046 18.5 27.5 18.5H23.5C22.3954 18.5 21.5 17.6046 21.5 16.5V12.5C21.5 11.3954 22.3954 10.5 23.5 10.5H27.5Z" fill={props.color} />
      <path d="M18.5 23.5C18.5 22.3954 17.6046 21.5 16.5 21.5H12.5C11.3954 21.5 10.5 22.3954 10.5 23.5V27.5C10.5 28.6046 11.3954 29.5 12.5 29.5H16.5C17.6046 29.5 18.5 28.6046 18.5 27.5V23.5Z" fill={props.color} />
      <path d="M27.5 21.5C28.6046 21.5 29.5 22.3954 29.5 23.5V27.5C29.5 28.6046 28.6046 29.5 27.5 29.5H23.5C22.3954 29.5 21.5 28.6046 21.5 27.5V23.5C21.5 22.3954 22.3954 21.5 23.5 21.5H27.5Z" fill={props.color} />
    </svg>
  )
}
