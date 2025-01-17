interface Props {
  color?: string
  className?: string
}

export default function UnLockSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 9V7C17 4.2 14.8 2 12 2C9.2 2 7 4.2 7 7V9C5.3 9 4 10.3 4 12V19C4 20.7 5.3 22 7 22H17C18.7 22 20 20.7 20 19V12C20 10.3 18.7 9 17 9ZM9 7C9 5.3 10.3 4 12 4C13.7 4 15 5.3 15 7V9H9V7ZM13.1 15.5L13 15.6V17C13 17.6 12.6 18 12 18C11.4 18 11 17.6 11 17V15.6C10.4 15 10.3 14.1 10.9 13.5C11.5 12.9 12.4 12.8 13 13.4C13.6 13.9 13.7 14.9 13.1 15.5Z" fill={props.color}/>
    </svg>

  )
}

