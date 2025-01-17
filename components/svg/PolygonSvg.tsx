interface Props {
  className?: string
  color: string
}

export default function PolygonSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
      <path d="M4.27244 1.96153C5.0442 0.638515 6.9558 0.638517 7.72756 1.96153L11.2455 7.99226C12.0233 9.32557 11.0615 11 9.51793 11H2.48207C0.938492 11 -0.0232498 9.32557 0.754516 7.99226L4.27244 1.96153Z" fill={props.color} />
    </svg>
  )
}