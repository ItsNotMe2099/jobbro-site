interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

export default function MenuSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20Z" fill={props.color} />
      <path d="M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 18.8954 18 20 18C21.1046 18 22 18.8954 22 20Z" fill={props.color} />
      <path d="M28 22C29.1046 22 30 21.1046 30 20C30 18.8954 29.1046 18 28 18C26.8954 18 26 18.8954 26 20C26 21.1046 26.8954 22 28 22Z" fill={props.color} />
    </svg>
  )
}
