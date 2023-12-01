interface Props {
  color?: string
  className?: string
}

export default function EllipseLargeSvg(props: Props) {
  
  return (
    <svg className={props.className} width="1001" height="592" viewBox="0 0 1001 592" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M1603.5 106.5C1603.5 253.879 1513.89 387.367 1368.9 484.033C1223.9 580.696 1023.56 640.5 802.25 640.5C580.938 640.5 380.6 580.696 235.604 484.033C90.6057 387.367 1 253.879 1 106.5C1 -40.8789 90.6057 -174.367 235.604 -271.033C380.6 -367.696 580.938 -427.5 802.25 -427.5C1023.56 -427.5 1223.9 -367.696 1368.9 -271.033C1513.89 -174.367 1603.5 -40.8789 1603.5 106.5Z" stroke="white" />
    </svg>
  )
}
