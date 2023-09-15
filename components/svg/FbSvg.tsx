interface Props {
  color?: string
  className?: string
}

export default function FbSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M29.7863 9H10.2137C9.54358 9 9 9.54358 9 10.2137V29.7863C9 30.4573 9.54358 31 10.2137 31H20.7498V22.4805H17.8816V19.1613H20.7498V16.7092C20.7498 13.8684 22.486 12.3229 25.0206 12.3229C26.2352 12.3229 27.2793 12.4118 27.5836 12.4522V15.4222H25.8227C24.4477 15.4222 24.18 16.0831 24.18 17.0456V19.164H27.4653L27.0391 22.4915H24.18V31H29.7854C30.4573 31 31 30.4573 31 29.7863V10.2137C31 9.54358 30.4573 9 29.7863 9Z" fill={props.color} />
    </svg>
  )
}
