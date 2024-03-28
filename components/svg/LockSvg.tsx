interface Props {
  color?: string
  className?: string
}

export default function LockSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17 5.56641C17 6.11869 16.5523 6.56641 16 6.56641C15.4477 6.56641 15 6.11869 15 5.56641C15 3.86641 13.7 2.56641 12 2.56641C10.3 2.56641 9 3.86641 9 5.56641V9H17C18.7 9 20 10.3 20 12V19C20 20.7 18.7 22 17 22H7C5.3 22 4 20.7 4 19V12C4 10.3 5.3 9 7 9V5.56641C7 2.76641 9.2 0.566406 12 0.566406C14.8 0.566406 17 2.76641 17 5.56641ZM13.1 15.5L13 15.6V17C13 17.6 12.6 18 12 18C11.4 18 11 17.6 11 17V15.6C10.4 15 10.3 14.1 10.9 13.5C11.5 12.9 12.4 12.8 13 13.4C13.6 13.9 13.7 14.9 13.1 15.5Z" fill={props.color}/>
    </svg>

  )
}

