interface Props {
  className?: string
  color: string
  onClick?: () => void
  variant?: 'default' | 'small'
}

export default function CloseSvg(props: Props) {
  switch (props.variant){
    case 'small':
      return (
        <svg onClick={props.onClick} className={props.className}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15.7344" y="7.2002" width="1.50849" height="12.0679" rx="0.754246" transform="rotate(45 15.7344 7.2002)" fill={props.color}/>
          <rect x="16.8008" y="15.7334" width="1.50849" height="12.0679" rx="0.754247" transform="rotate(135 16.8008 15.7334)" fill={props.color}/>
        </svg>

      )
    case 'default':
    default:
      return (
        <svg onClick={props.onClick} className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M27.1099 12.8887C26.619 12.3978 25.8231 12.3978 25.3321 12.8887L19.9991 18.2218L14.666 12.8887C14.1751 12.3978 13.3792 12.3978 12.8883 12.8887C12.3973 13.3796 12.3973 14.1756 12.8883 14.6665L18.2213 19.9995L12.8877 25.3331C12.3968 25.824 12.3968 26.62 12.8877 27.1109C13.3786 27.6018 14.1746 27.6018 14.6655 27.1109L19.9991 21.7773L25.3327 27.1109C25.8236 27.6018 26.6196 27.6018 27.1105 27.1109C27.6014 26.62 27.6014 25.8241 27.1105 25.3331L21.7769 19.9995L27.1099 14.6665C27.6008 14.1756 27.6008 13.3796 27.1099 12.8887Z" fill={props.color} />
        </svg>
      )
  }

}
