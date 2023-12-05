interface Props {
  color?: string
  className?: string
}

export default function SparksSmallSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12.8968 11.8825L14.5 5.9282L16.1032 11.8825C16.2364 12.3772 16.6228 12.7636 17.1175 12.8968L23.0718 14.5L17.1175 16.1032C16.6228 16.2364 16.2364 16.6228 16.1032 17.1175L14.5 23.0718L12.8968 17.1175C12.7636 16.6228 12.3772 16.2364 11.8825 16.1032L5.9282 14.5L11.8825 12.8968L11.6876 12.1726L11.8825 12.8968C12.3772 12.7636 12.7636 12.3772 12.8968 11.8825Z" stroke={props.color} stroke-width="1.5" />
      <path d="M4.87676 4.06674L5.5 1.75201L6.12324 4.06673C6.22961 4.4618 6.5382 4.77039 6.93326 4.87676L9.24799 5.5L6.93327 6.12324C6.5382 6.22961 6.22961 6.5382 6.12324 6.93327L5.5 9.24799L4.87676 6.93327C4.77039 6.5382 4.4618 6.22961 4.06673 6.12324L1.75201 5.5L4.06673 4.87676L3.88899 4.21663L4.06674 4.87676C4.4618 4.77039 4.77039 4.4618 4.87676 4.06674Z" stroke={props.color} stroke-width="1.5" />
    </svg>
  )
}
