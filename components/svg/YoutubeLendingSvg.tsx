interface Props {
  color?: string
  className?: string
}

export default function YoutubeLendingSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M10.7812 13.8334L13.8367 12.0002L10.7812 10.167V13.8334Z" fill={props.color} />
      <path d="M12 3C7.02975 3 3 7.02919 3 12C3 16.9708 7.02975 21 12 21C16.9703 21 21 16.9703 21 12C21 7.02975 16.9703 3 12 3ZM16.887 12.3943C16.887 13.2381 16.7891 14.0818 16.7891 14.0818C16.7891 14.0818 16.6935 14.8007 16.401 15.1163C16.0292 15.5314 15.6129 15.5336 15.4217 15.5584C14.0537 15.663 12 15.6664 12 15.6664C12 15.6664 9.45862 15.6416 8.67675 15.5618C8.45906 15.5184 7.97137 15.5308 7.599 15.1163C7.30594 14.8001 7.21088 14.0818 7.21088 14.0818C7.21088 14.0818 7.113 13.2386 7.113 12.3943V11.6034C7.113 10.7597 7.21088 9.9165 7.21088 9.9165C7.21088 9.9165 7.3065 9.19763 7.599 8.88094C7.97081 8.46525 8.38706 8.463 8.57831 8.43937C9.94575 8.33362 11.9978 8.33363 11.9978 8.33363H12.0022C12.0022 8.33363 14.0542 8.33362 15.4217 8.43937C15.6124 8.463 16.0292 8.46525 16.401 8.88038C16.6941 9.19706 16.7891 9.91594 16.7891 9.91594C16.7891 9.91594 16.887 10.7597 16.887 11.6034V12.3943Z" fill={props.color} />
    </svg>
  )
}
