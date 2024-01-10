interface Props {
  color?: string
  className?: string
}

export default function PlusSvg(props: Props) {
  return (

    <svg xmlns="http://www.w3.org/2000/svg" className={props.className} width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24.0001 36C25.1046 36 26.0001 35.1046 26.0001 34L26.0001 25.9999H34C35.1046 25.9999 36 25.1045 36 23.9999C36 22.8954 35.1046 21.9999 34 21.9999H26.0001L26.0001 14C26.0001 12.8954 25.1046 12 24.0001 12C22.8955 12 22.0001 12.8954 22.0001 14L22.0001 21.9999H14C12.8954 21.9999 12 22.8954 12 23.9999C12 25.1045 12.8954 25.9999 14 25.9999H22.0001L22.0001 34C22.0001 35.1046 22.8955 36 24.0001 36Z" fill="#EBEBEB"/>
    </svg>
  )
}
