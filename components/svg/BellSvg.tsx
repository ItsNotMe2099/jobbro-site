interface Props {
  color?: string
  className?: string
}

export default function BellSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M26.0008 24V19C26.0008 15.93 24.3608 13.36 21.5008 12.68V12C21.5008 11.17 20.8208 10.5 19.9908 10.5C19.1608 10.5 18.5008 11.17 18.5008 12V12.68C15.6308 13.36 14.0008 15.92 14.0008 19V24L12.7008 25.29C12.0708 25.92 12.5108 27 13.4008 27H26.5708C27.4608 27 27.9108 25.92 27.2808 25.29L26.0008 24ZM19.9908 30C21.0908 30 21.9908 29.1 21.9908 28H17.9908C17.9908 29.1 18.8808 30 19.9908 30Z" fill={props.color} />
    </svg>
  )
}
