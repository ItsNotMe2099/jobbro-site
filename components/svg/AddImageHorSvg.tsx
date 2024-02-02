interface Props {
  color?: string
  className?: string

}

export default function AddImageHorSvg(props: Props) {
  return (
    <svg className={props.className}  width="76" height="48" viewBox="0 0 76 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="24" r="12" fill="#24B563"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M64 30C64.5523 30 65 29.5523 65 29L65 25H69C69.5523 25 70 24.5523 70 24C70 23.4477 69.5523 23 69 23H65L65 19C65 18.4477 64.5523 18 64 18C63.4477 18 63 18.4477 63 19L63 23H59C58.4477 23 58 23.4477 58 24C58 24.5523 58.4477 25 59 25H63L63 29C63 29.5523 63.4477 30 64 30Z" fill="white"/>
      <path d="M39 4H9C6.23962 4.00256 4.00256 6.23962 4 9V39C4.00256 41.7604 6.23962 43.9974 9 44H39C41.7604 43.9974 43.9974 41.7604 44 39V9C43.9974 6.23962 41.7604 4.00256 39 4ZM9 42C7.34387 41.9982 6.00183 40.6561 6 39V28.5508L13.5254 21.0254C14.8934 19.6621 17.1066 19.6621 18.4746 21.0254L39.4095 41.9584C39.2744 41.9772 39.1403 41.9999 39 42H9ZM42 39C41.9991 39.7567 41.7091 40.4398 41.2466 40.9674L27.4143 27.1364L29.5254 25.0254C30.8934 23.6621 33.1066 23.6621 34.4746 25.0254L42 32.5508V39ZM42 29.7228L35.8887 23.6115C33.7397 21.4669 30.2603 21.4669 28.1113 23.6115L26.0004 25.7224L19.8887 19.6113C17.7126 17.5332 14.2874 17.5332 12.1113 19.6113L6 25.7227V9C6.00183 7.34387 7.34387 6.00183 9 6H39C40.6561 6.00183 41.9982 7.34387 42 9V29.7228Z" fill="#C7C7C7"/>
    </svg>

  )
}