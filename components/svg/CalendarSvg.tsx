interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

export default function CalendarSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M27.7 11.2H26.6V10.1C26.6 9.44 26.16 9 25.5 9C24.84 9 24.4 9.44 24.4 10.1V11.2H15.6V10.1C15.6 9.44 15.16 9 14.5 9C13.84 9 13.4 9.44 13.4 10.1V11.2H12.3C10.43 11.2 9 12.63 9 14.5V15.6H31V14.5C31 12.63 29.57 11.2 27.7 11.2ZM9 27.7C9 29.57 10.43 31 12.3 31H27.7C29.57 31 31 29.57 31 27.7V17.8H9V27.7ZM25.5 20C26.16 20 26.6 20.44 26.6 21.1C26.6 21.76 26.16 22.2 25.5 22.2C24.84 22.2 24.4 21.76 24.4 21.1C24.4 20.44 24.84 20 25.5 20ZM25.5 24.4C26.16 24.4 26.6 24.84 26.6 25.5C26.6 26.16 26.16 26.6 25.5 26.6C24.84 26.6 24.4 26.16 24.4 25.5C24.4 24.84 24.84 24.4 25.5 24.4ZM20 20C20.66 20 21.1 20.44 21.1 21.1C21.1 21.76 20.66 22.2 20 22.2C19.34 22.2 18.9 21.76 18.9 21.1C18.9 20.44 19.34 20 20 20ZM20 24.4C20.66 24.4 21.1 24.84 21.1 25.5C21.1 26.16 20.66 26.6 20 26.6C19.34 26.6 18.9 26.16 18.9 25.5C18.9 24.84 19.34 24.4 20 24.4ZM14.5 20C15.16 20 15.6 20.44 15.6 21.1C15.6 21.76 15.16 22.2 14.5 22.2C13.84 22.2 13.4 21.76 13.4 21.1C13.4 20.44 13.84 20 14.5 20ZM14.5 24.4C15.16 24.4 15.6 24.84 15.6 25.5C15.6 26.16 15.16 26.6 14.5 26.6C13.84 26.6 13.4 26.16 13.4 25.5C13.4 24.84 13.84 24.4 14.5 24.4Z" fill={props.color} />
    </svg>
  )
}