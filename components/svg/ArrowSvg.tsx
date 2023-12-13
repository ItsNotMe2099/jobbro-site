interface Props {
  color?: string
  className?: string
  direction: 'left' | 'right'
}

export default function ArrowSvg(props: Props) {
  return (
      <svg className={props.className} style={{...(props.direction === 'right' ? {transform: 'rotate(180deg)'} : {})}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20.6885 27.0254C20.3511 27.3628 19.804 27.3628 19.4666 27.0254L13.3954 20.9542C12.8682 20.427 12.8682 19.5722 13.3954 19.045L19.4666 12.9738C19.804 12.6364 20.3511 12.6363 20.6885 12.9738C21.0259 13.3112 21.0259 13.8582 20.6885 14.1956L15.8226 19.0616L15.8273 19.0616H25.2074C25.7255 19.0616 26.1454 19.4815 26.1454 19.9996C26.1454 20.5176 25.7255 20.9376 25.2074 20.9376H15.8273L15.8226 20.9376L20.6885 25.8035C21.0259 26.1409 21.0259 26.688 20.6885 27.0254Z" fill={props.color} />
      </svg>

  )
}
