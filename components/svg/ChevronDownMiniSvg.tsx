interface Props {
  color?: string
  className?: string
}

export default function ChevronDownMiniSvg(props: Props) {
  return (
      <svg  className={props.className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.4192 11.7727C8.23289 12.0758 7.76711 12.0758 7.5808 11.7727L5.06557 7.68182C4.87926 7.37879 5.11215 7 5.48478 7L10.5152 7C10.8878 7 11.1207 7.37879 10.9344 7.68182L8.4192 11.7727Z" fill={props.color}/>
      </svg>
  )
}

