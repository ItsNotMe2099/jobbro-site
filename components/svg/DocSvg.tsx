interface Props {
  color?: string
  className?: string
}

export default function DocSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M18.4167 5.66675H10.625C9.45139 5.66675 8.5 6.61814 8.5 7.79175V26.2084C8.5 27.382 9.45139 28.3334 10.625 28.3334H23.375C24.5486 28.3334 25.5 27.382 25.5 26.2084V12.7501H25.4942L18.4167 5.66675ZM17.0001 7.93847V13.8126C17.0001 14.0082 17.1587 14.1667 17.3543 14.1667H23.2284C23.5439 14.1667 23.702 13.7853 23.4788 13.5622L17.6046 7.68803C17.3815 7.46492 17.0001 7.62294 17.0001 7.93847Z" fill={props.color} />
    </svg>
  )
}
