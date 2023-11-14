interface Props {
  color?: string
  className?: string
}

export default function TwitterLendingSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11.9998 3C7.03739 3 3 7.03731 3 11.9998C3 16.9625 7.03739 21 11.9998 21C16.9626 21 21 16.9625 21 11.9998C20.9998 7.03731 16.9625 3 11.9998 3ZM16.7899 9.65259C16.5512 10.0099 16.2545 10.3248 15.9119 10.5842C15.9133 10.6364 15.9143 10.6887 15.9143 10.7409C15.9143 13.3655 13.9171 16.0802 10.5749 16.0802C9.55494 16.0807 8.55632 15.7882 7.6978 15.2376C7.6672 15.2181 7.64414 15.1887 7.6324 15.1543C7.62066 15.12 7.62095 15.0827 7.63321 15.0485C7.64514 15.0141 7.66849 14.9849 7.69936 14.9656C7.73024 14.9464 7.76678 14.9383 7.80289 14.9427C7.94381 14.959 8.08345 14.967 8.2181 14.967C8.8737 14.967 9.49845 14.7907 10.0469 14.4539C9.71658 14.3742 9.41237 14.2108 9.16354 13.9795C8.9147 13.7481 8.72961 13.4566 8.62608 13.133C8.61761 13.1064 8.61617 13.0781 8.62192 13.0508C8.62767 13.0235 8.6404 12.9982 8.65886 12.9773C8.67734 12.9563 8.70098 12.9406 8.72742 12.9317C8.75387 12.9227 8.7822 12.9209 8.80959 12.9263C8.8398 12.9321 8.87017 12.9371 8.90037 12.9413C8.34231 12.5857 7.98029 11.9605 7.98029 11.2683V11.2453C7.9803 11.2173 7.98762 11.1898 8.0015 11.1656C8.01539 11.1413 8.03537 11.1211 8.05947 11.1069C8.08357 11.0927 8.11096 11.085 8.13892 11.0847C8.16688 11.0843 8.19445 11.0913 8.21891 11.1048C8.28881 11.1436 8.36128 11.1771 8.43567 11.2054C8.15012 10.8525 7.99456 10.4122 7.99507 9.9582C7.99507 9.60824 8.08779 9.26373 8.2631 8.96213C8.27614 8.93965 8.29445 8.92067 8.31644 8.90681C8.33844 8.89296 8.36347 8.88465 8.38938 8.8826C8.41529 8.88054 8.44132 8.88481 8.46522 8.89502C8.48913 8.90524 8.51019 8.9211 8.52662 8.94124C9.38131 9.98922 10.6237 10.6485 11.9601 10.77C11.9507 10.6904 11.946 10.6103 11.946 10.5301C11.946 9.43791 12.8348 8.54934 13.9271 8.54934C14.4424 8.54934 14.941 8.7526 15.3088 9.10964C15.6683 9.02962 16.0128 8.89299 16.3294 8.70488C16.3372 8.68009 16.3511 8.65758 16.3696 8.6393C16.3881 8.62102 16.4108 8.60751 16.4357 8.59994C16.4605 8.59236 16.4869 8.59094 16.5125 8.5958C16.538 8.60066 16.562 8.61165 16.5824 8.62784C16.6028 8.64402 16.6189 8.66491 16.6294 8.68871C16.64 8.71251 16.6445 8.73851 16.6428 8.76447C16.641 8.79043 16.633 8.81558 16.6194 8.83775C16.6058 8.85992 16.587 8.87845 16.5646 8.89175C16.4859 9.13844 16.3592 9.36714 16.1918 9.56469C16.328 9.52356 16.4614 9.47398 16.5914 9.41622C16.6233 9.40216 16.6588 9.39882 16.6927 9.4067C16.7266 9.41457 16.757 9.43324 16.7794 9.45989C16.8018 9.48655 16.8149 9.51974 16.8168 9.55449C16.8187 9.58924 16.8092 9.62367 16.7899 9.65259Z" fill={props.color} />
    </svg>
  )
}
