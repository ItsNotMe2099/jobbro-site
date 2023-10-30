interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function InternetSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5366 15.4615C14.3075 17.0912 13.9198 18.4949 13.4213 19.5181C13.1783 20.0173 12.9132 20.4192 12.6213 20.6916C12.4227 20.8771 12.2208 21 12 21C11.7792 21 11.5773 20.8771 11.3787 20.6916C11.0868 20.4192 10.8217 20.0173 10.5787 19.5181C10.0802 18.4949 9.69254 17.0912 9.46339 15.4615H14.5366ZM20.3091 15.4615C19.2481 18.0023 17.0556 19.9546 14.3625 20.686C15.0704 19.4967 15.6339 17.6562 15.9288 15.4615H20.3091ZM8.07115 15.4615C8.36608 17.6562 8.92962 19.4967 9.6375 20.686C6.94408 19.9543 4.75154 18.002 3.69092 15.4615H8.07115ZM7.92542 9.92308C7.8735 10.5932 7.84615 11.288 7.84615 12C7.84615 12.712 7.8735 13.4068 7.92542 14.0769H3.24127C3.08342 13.4102 3 12.7148 3 12C3 11.2852 3.08342 10.5898 3.24127 9.92308H7.92542ZM14.6879 9.92308C14.7412 10.5912 14.7692 11.2862 14.7692 12C14.7692 12.7138 14.7412 13.4088 14.6879 14.0769H9.31212C9.25881 13.4088 9.23077 12.7138 9.23077 12C9.23077 11.2862 9.25881 10.5912 9.31212 9.92308H14.6879ZM20.7587 9.92308C20.9166 10.5898 21 11.2852 21 12C21 12.7148 20.9166 13.4102 20.7587 14.0769H16.0746C16.1265 13.4068 16.1538 12.712 16.1538 12C16.1538 11.288 16.1265 10.5932 16.0746 9.92308H20.7587ZM9.6375 3.31396C8.92962 4.50335 8.36608 6.34385 8.07115 8.53846H3.69092C4.75188 5.99769 6.94442 4.04538 9.6375 3.31396ZM12 3C12.2208 3 12.4227 3.12288 12.6213 3.30842C12.9132 3.58085 13.1783 3.98273 13.4213 4.48188C13.9198 5.50512 14.3075 6.90877 14.5366 8.53846H9.46339C9.69254 6.90877 10.0802 5.50512 10.5787 4.48188C10.8217 3.98273 11.0868 3.58085 11.3787 3.30842C11.5773 3.12288 11.7792 3 12 3ZM14.3625 3.31396C17.0559 4.04573 19.2485 5.99804 20.3091 8.53846H15.9288C15.6339 6.34385 15.0704 4.50335 14.3625 3.31396Z" fill={props.color} />
    </svg>
  )
}
