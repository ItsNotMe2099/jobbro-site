interface Props {
  color?: string
  className?: string
}

export default function EllipseMediumSvg(props: Props) {
  
  return (
    <svg className={props.className} width="563" height="349" viewBox="0 0 563 349" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M1165.5 -39.5C1165.5 67.5621 1100.41 164.55 995.039 234.795C889.675 305.038 744.087 348.5 583.25 348.5C422.413 348.5 276.825 305.038 171.461 234.795C66.0933 164.55 1 67.5621 1 -39.5C1 -146.562 66.0933 -243.55 171.461 -313.795C276.825 -384.038 422.413 -427.5 583.25 -427.5C744.087 -427.5 889.675 -384.038 995.039 -313.795C1100.41 -243.55 1165.5 -146.562 1165.5 -39.5Z" stroke="white" />
    </svg>
  )
}
