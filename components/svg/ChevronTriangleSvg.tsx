
interface Props {
  color?: string
  className?: string
}

export default function ChevronTriangleSvg(props: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.6288 17.6591C12.3493 18.1136 11.6507 18.1136 11.3712 17.6591L7.59836 11.5227C7.31889 11.0682 7.66823 10.5 8.22717 10.5L15.7728 10.5C16.3318 10.5 16.6811 11.0682 16.4016 11.5227L12.6288 17.6591Z" fill={props.color||'#476BB2'}/>
    </svg>
  )
}
