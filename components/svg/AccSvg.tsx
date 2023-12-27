interface Props {
  color?: string
  className?: string
}

export default function AccSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M14.1484 14.3428C14.1484 11.3921 16.5445 9 19.5002 9C22.4559 9 24.8521 11.3921 24.8521 14.3428C24.8521 17.2936 22.4559 19.6857 19.5002 19.6857C16.5445 19.6857 14.1484 17.2936 14.1484 14.3428Z" fill={props.color||'#939393'} />
      <path d="M16.3417 22.0628C18.434 21.7294 20.566 21.7294 22.6584 22.0628L22.8826 22.0985C25.8307 22.5682 28 25.1068 28 28.0872C28 29.6959 26.6937 31 25.0823 31H13.9177C12.3063 31 11 29.6959 11 28.0872C11 25.1068 13.1693 22.5682 16.1174 22.0985L16.3417 22.0628Z" fill={props.color||'#939393'} />
    </svg>
  )
}
