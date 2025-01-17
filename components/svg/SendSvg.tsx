interface Props {
  color?: string
  className?: string
}

export default function SendSvg(props: Props) {
  return (
    <svg className={props.className} width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M2.07206 10.4239L8.29507 9.19826C8.85073 9.08895 8.85073 8.91105 8.29507 8.80174L2.07206 7.5761C1.70139 7.50323 1.34039 7.14742 1.26639 6.78275L0.0217195 0.654859C-0.089614 0.107356 0.238053 -0.147029 0.753054 0.0870057L19.7428 8.71739C20.0858 8.8733 20.0858 9.1267 19.7428 9.28261L0.753054 17.913C0.238053 18.147 -0.089614 17.8926 0.0217195 17.3451L1.26639 11.2173C1.34039 10.8526 1.70139 10.4968 2.07206 10.4239Z" fill={props.color||'white'}/>
    </svg>
  )
}

