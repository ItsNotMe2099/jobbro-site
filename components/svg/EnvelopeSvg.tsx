interface Props {
  color?: string
  className?: string
}

export default function EnvelopeSvg(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={props.className} width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M22.5877 9.25C22.5883 8.91011 22.5024 8.57566 22.3379 8.27821C22.1734 7.98076 21.9359 7.73014 21.6477 7.55L12.5977 2.25L3.54766 7.55C2.98266 7.905 2.59766 8.53 2.59766 9.25V19.25C2.59766 20.355 3.49266 21.25 4.59766 21.25H20.5977C21.7027 21.25 22.5977 20.355 22.5977 19.25L22.5877 9.25ZM12.5977 14.25L4.33766 9.085L12.5977 4.25L20.8577 9.085L12.5977 14.25Z" fill="#939393"/>
    </svg>  )
}
