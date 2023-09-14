interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function EyeSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9988 12C14.9988 13.6569 13.6556 15 11.9988 15C10.3419 15 8.99878 13.6569 8.99878 12C8.99878 10.3431 10.3419 9 11.9988 9C13.6556 9 14.9988 10.3431 14.9988 12Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.9992 5C7.52159 5 3.73131 7.94288 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C16.4769 19 20.2672 16.0571 21.5414 12C20.2672 7.94291 16.4769 5 11.9992 5Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

