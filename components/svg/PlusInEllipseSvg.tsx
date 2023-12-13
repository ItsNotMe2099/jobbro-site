interface Props {
  color?: string
  className?: string
}

export default function PlusInEllipseSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <svg className={props.className}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill={props.color}/>
        <rect x="18" y="11" width="2" height="12" rx="1" transform="rotate(90 18 11)" fill="white"/>
        <rect x="13" y="18" width="2" height="12" rx="1" transform="rotate(-180 13 18)" fill="white"/>
      </svg>

    </svg>
  )
}

