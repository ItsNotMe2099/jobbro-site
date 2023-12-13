interface Props {
  color?: string
  className?: string
}

export default function DragSvg(props: Props) {
  return (
      <svg className={props.className} width="9" height="24" viewBox="0 0 9 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="20" r="2" fill={props.color}/>
        <circle cx="2" cy="4" r="2" fill={props.color}/>
        <circle cx="7" cy="8" r="2" fill={props.color}/>
        <circle cx="2" cy="12" r="2" fill={props.color}/>
        <circle cx="7" cy="16" r="2" fill={props.color}/>
      </svg>

  )
}

