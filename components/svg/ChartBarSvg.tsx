interface Props {
  color?: string
  className?: string
}

export default function ChartBarSvg(props: Props) {
  return (
    <svg className={props.className} width="143" height="100" viewBox="0 0 143 100" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <rect x="45" y="46" width="8" height="54" rx="4" fill={props.color}/>
      <rect x="30" y="21" width="8" height="79" rx="4" fill={props.color}/>
      <rect x="75" y="21" width="8" height="79" rx="4" fill={props.color}/>
      <rect x="90" y="39" width="8" height="61" rx="4" fill={props.color}/>
      <rect x="105" y="60" width="8" height="40" rx="4" fill={props.color}/>
      <rect x="135" y="5" width="8" height="95" rx="4" fill={props.color}/>
      <rect x="120" y="75" width="8" height="25" rx="4" fill={props.color}/>
      <rect x="15" width="8" height="100" rx="4" fill={props.color}/>
      <rect x="60" y="12" width="8" height="88" rx="4" fill={props.color}/>
      <rect y="46" width="8" height="54" rx="4" fill={props.color}/>
    </svg>
  )
}

