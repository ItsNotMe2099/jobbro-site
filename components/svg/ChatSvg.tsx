interface Props {
  color?: string
  className?: string
}

export default function ChatSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M17.75 29.75C17.6269 29.7494 17.5058 29.7185 17.3975 29.66C17.2777 29.5962 17.1775 29.5012 17.1075 29.3849C17.0375 29.2687 17.0004 29.1357 17 29V26.75H12.5C12.0075 26.75 11.5199 26.653 11.0649 26.4645C10.61 26.2761 10.1966 25.9999 9.84835 25.6517C9.14509 24.9484 8.75 23.9946 8.75 23V14C8.75 13.0054 9.14509 12.0516 9.84835 11.3483C10.5516 10.6451 11.5054 10.25 12.5 10.25H27.5C28.4946 10.25 29.4484 10.6451 30.1516 11.3483C30.8549 12.0516 31.25 13.0054 31.25 14V23C31.25 23.9946 30.8549 24.9484 30.1516 25.6517C29.4484 26.3549 28.4946 26.75 27.5 26.75H22.475L18.1625 29.6225C18.0405 29.7045 17.897 29.7489 17.75 29.75ZM15.5 17C15.2033 17 14.9133 17.088 14.6666 17.2528C14.42 17.4176 14.2277 17.6519 14.1142 17.926C14.0006 18.2001 13.9709 18.5017 14.0288 18.7926C14.0867 19.0836 14.2296 19.3509 14.4393 19.5607C14.6491 19.7704 14.9164 19.9133 15.2074 19.9712C15.4983 20.0291 15.7999 19.9994 16.074 19.8858C16.3481 19.7723 16.5824 19.58 16.7472 19.3334C16.912 19.0867 17 18.7967 17 18.5C17 18.1022 16.842 17.7206 16.5607 17.4393C16.2794 17.158 15.8978 17 15.5 17ZM20 17C19.7033 17 19.4133 17.088 19.1666 17.2528C18.92 17.4176 18.7277 17.6519 18.6142 17.926C18.5006 18.2001 18.4709 18.5017 18.5288 18.7926C18.5867 19.0836 18.7296 19.3509 18.9393 19.5607C19.1491 19.7704 19.4164 19.9133 19.7074 19.9712C19.9983 20.0291 20.2999 19.9994 20.574 19.8858C20.8481 19.7723 21.0824 19.58 21.2472 19.3334C21.412 19.0867 21.5 18.7967 21.5 18.5C21.5 18.1022 21.342 17.7206 21.0607 17.4393C20.7794 17.158 20.3978 17 20 17ZM24.5 17C24.2033 17 23.9133 17.088 23.6666 17.2528C23.42 17.4176 23.2277 17.6519 23.1142 17.926C23.0006 18.2001 22.9709 18.5017 23.0288 18.7926C23.0867 19.0836 23.2296 19.3509 23.4393 19.5607C23.6491 19.7704 23.9164 19.9133 24.2074 19.9712C24.4983 20.0291 24.7999 19.9994 25.074 19.8858C25.3481 19.7723 25.5824 19.58 25.7472 19.3334C25.912 19.0867 26 18.7967 26 18.5C26 18.1022 25.842 17.7206 25.5607 17.4393C25.2794 17.158 24.8978 17 24.5 17Z" fill={props.color} />
    </svg>
  )
}
