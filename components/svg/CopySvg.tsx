interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function CopySvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M19 9C17.8954 9 17 9.89543 17 11V23C17 24.1046 17.8954 25 19 25H29C30.1046 25 31 24.1046 31 23V11C31 9.89543 30.1046 9 29 9H19Z" fill={props.color} />
      <path d="M11 15H15V23C15 25.2091 16.7909 27 19 27H23V29C23 30.1046 22.1046 31 21 31H11C9.89543 31 9 30.1046 9 29V17C9 15.8954 9.89543 15 11 15Z" fill={props.color} />
    </svg>
  )
}

