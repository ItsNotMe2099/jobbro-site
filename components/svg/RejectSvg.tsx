

interface Props {
  color?: string
  className?: string
}

export default function RejectSvg(props: Props) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#EBEBEB"/>
      <path d="M20 9C17.8244 9 15.6977 9.64514 13.8887 10.8538C12.0798 12.0625 10.6699 13.7805 9.83733 15.7905C9.00477 17.8005 8.78693 20.0122 9.21137 22.146C9.6358 24.2798 10.6835 26.2398 12.2218 27.7782C13.7602 29.3165 15.7202 30.3642 17.854 30.7886C19.9878 31.2131 22.1995 30.9952 24.2095 30.1627C26.2195 29.3301 27.9375 27.9202 29.1462 26.1113C30.3549 24.3023 31 22.1756 31 20C31 17.0826 29.8411 14.2847 27.7782 12.2218C25.7153 10.1589 22.9174 9 20 9ZM11.75 20C11.7503 18.4861 12.1672 17.0015 12.955 15.7087C13.7428 14.4159 14.8711 13.3648 16.2164 12.6705C17.5617 11.9762 19.0721 11.6655 20.5822 11.7723C22.0924 11.8791 23.544 12.3994 24.7781 13.2762L13.2763 24.7781C12.2814 23.3837 11.7478 21.7129 11.75 20ZM20 28.25C18.2871 28.2522 16.6163 27.7186 15.2219 26.7237L26.7238 15.2219C27.6006 16.456 28.1209 17.9076 28.2277 19.4178C28.3345 20.9279 28.0238 22.4383 27.3295 23.7836C26.6352 25.1289 25.5841 26.2572 24.2913 27.045C22.9985 27.8328 21.5139 28.2497 20 28.25Z" fill="#838383"/>
    </svg>

  )
}