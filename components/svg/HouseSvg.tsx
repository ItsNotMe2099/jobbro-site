interface Props {
  color?: string
  className?: string
}

export default function HouseSvg(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={props.className} width="25" height="24" viewBox="0 0 25 24" fill="none">
      <g clipPath="url(#clip0_1616_15853)">
      <path d="M10.1979 18.9988V13.9988H14.1979V18.9988C14.1979 19.5488 14.6479 19.9988 15.1979 19.9988H18.1979C18.7479 19.9988 19.1979 19.5488 19.1979 18.9988V11.9988H20.8979C21.3579 11.9988 21.5779 11.4288 21.2279 11.1288L12.8679 3.59875C12.4879 3.25875 11.9079 3.25875 11.5279 3.59875L3.16785 11.1288C2.82785 11.4288 3.03785 11.9988 3.49785 11.9988H5.19785V18.9988C5.19785 19.5488 5.64785 19.9988 6.19785 19.9988H9.19785C9.74785 19.9988 10.1979 19.5488 10.1979 18.9988Z" fill="#939393"/>
      </g>
      <defs>
      <clipPath id="clip0_1616_15853">
      <rect width="24" height="24" fill="white" transform="translate(0.199219)"/>
      </clipPath>
      </defs>
    </svg>
  )
}