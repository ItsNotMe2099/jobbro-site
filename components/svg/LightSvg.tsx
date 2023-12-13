interface Props {
  color?: string
  className?: string
}

export default function LightSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="771" height="700" viewBox="0 0 771 700" fill="none">
      <g opacity="0.3" filter="url(#filter0_f_2091_8972)">
        <circle cx="385.5" cy="323.5" r="113.5" fill={props.color} />
      </g>
      <defs>
        <filter id="filter0_f_2091_8972" x="0" y="-62" width="771" height="771" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="136" result="effect1_foregroundBlur_2091_8972" />
        </filter>
      </defs>
    </svg>
  )
}
