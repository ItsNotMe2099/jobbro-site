interface Props {
  color?: string
  className?: string
}

export default function CompletedSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.25" stroke={props.color} strokeWidth="1.5" />
      <path d="M17.1009 10.2292C17.3941 9.9258 17.3941 9.44458 17.1009 9.14122C16.7932 8.82295 16.2831 8.82295 15.9754 9.14122L11.1154 14.1688C10.9554 14.3343 10.6903 14.3349 10.5296 14.1701L8.49553 12.0842C8.1872 11.768 7.67858 11.7691 7.37164 12.0866C7.07751 12.3909 7.07827 12.8738 7.37337 13.1772L9.64905 15.5164C10.2916 16.1769 11.353 16.1752 11.9935 15.5127L17.1009 10.2292Z" fill={props.color} />
    </svg>
  )
}
