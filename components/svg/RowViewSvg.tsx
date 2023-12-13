interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

export default function RowViewSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M10 15C11.1046 15 12 14.1046 12 13C12 11.8954 11.1046 11 10 11C8.89543 11 8 11.8954 8 13C8 14.1046 8.89543 15 10 15Z" fill={props.color} />
      <path d="M31 12C31.5523 12 32 12.4477 32 13C32 13.5523 31.5523 14 31 14H17C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12H31Z" fill={props.color} />
      <path d="M31 19C31.5523 19 32 19.4477 32 20C32 20.5523 31.5523 21 31 21H17C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19H31Z" fill={props.color} />
      <path d="M32 27C32 26.4477 31.5523 26 31 26H17C16.4477 26 16 26.4477 16 27C16 27.5523 16.4477 28 17 28H31C31.5523 28 32 27.5523 32 27Z" fill={props.color} />
      <path d="M12 20C12 21.1046 11.1046 22 10 22C8.89543 22 8 21.1046 8 20C8 18.8954 8.89543 18 10 18C11.1046 18 12 18.8954 12 20Z" fill={props.color} />
      <path d="M10 29C11.1046 29 12 28.1046 12 27C12 25.8954 11.1046 25 10 25C8.89543 25 8 25.8954 8 27C8 28.1046 8.89543 29 10 29Z" fill={props.color} />
    </svg>
  )
}
