interface Props {
  className?: string
}

export default function CheckBoxGreenSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="#24B563" stroke="#24B563" />
      <path d="M18.2578 9.10565C18.6097 8.74162 18.6097 8.16416 18.2578 7.80012C17.8886 7.41821 17.2764 7.41821 16.9072 7.80012L11.0167 13.8937C10.8568 14.0592 10.5917 14.0598 10.431 13.895L7.93135 11.3317C7.56136 10.9523 6.95101 10.9536 6.58269 11.3346C6.22973 11.6998 6.23065 12.2792 6.58476 12.6432L9.5504 15.6918C10.1929 16.3522 11.2544 16.3506 11.8948 15.688L18.2578 9.10565Z" fill="white" />
    </svg>
  )
}