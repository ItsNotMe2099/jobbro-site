interface Props {
  color?: string
  className?: string
}

export default function FileSvg(props: Props) {
  return (
    <svg className={props.className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.9167 9H13.125C11.9514 9 11 9.95139 11 11.125V29.5417C11 30.7152 11.9514 31.6667 13.125 31.6667H25.875C27.0486 31.6667 28 30.7152 28 29.5417V16.0833H27.9942L20.9167 9ZM19.5001 11.2717V17.1458C19.5001 17.3415 19.6587 17.5 19.8543 17.5H25.7284C26.0439 17.5 26.202 17.1185 25.9788 16.8954L20.1046 11.0213C19.8815 10.7982 19.5001 10.9562 19.5001 11.2717Z" fill={props.color}/>
    </svg>
  )
}

