interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function ChevronDownSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
      <path d="M29.7271 18.4547C30.1581 18.0088 30.1581 17.3015 29.7271 16.8556C29.2749 16.3878 28.5251 16.3878 28.0729 16.8556L20.8595 24.3178C20.663 24.5211 20.337 24.5211 20.1405 24.3178L12.9271 16.8556C12.4749 16.3878 11.7251 16.3878 11.2729 16.8556C10.8419 17.3015 10.8419 18.0088 11.2729 18.4547L19.062 26.5124C19.8482 27.3257 21.1518 27.3257 21.938 26.5124L29.7271 18.4547Z" fill={props.color} />
    </svg>
  )
}