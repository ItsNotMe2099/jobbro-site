interface Props {
  color?: string
  className?: string
}

export default function ClickSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="154" height="125" viewBox="0 0 154 125" fill="none">
      <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M101.531 98.7235C94.2527 102.724 85.8921 105 77 105C48.8335 105 26 82.1665 26 54C26 25.8335 48.8335 3 77 3C105.167 3 128 25.8335 128 54C128 64.1489 125.036 73.6054 119.925 81.5508L120.649 82.2742C125.932 74.1353 129 64.426 129 54C129 25.2812 105.719 2 77 2C48.2812 2 25 25.2812 25 54C25 82.7188 48.2812 106 77 106C86.1704 106 94.7864 103.626 102.267 99.4594L101.531 98.7235Z" fill="white" />
      <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M94.841 92.0333C89.426 94.5779 83.3791 96 77 96C53.804 96 35 77.196 35 54C35 30.804 53.804 12 77 12C100.196 12 119 30.804 119 54C119 61.6518 116.954 68.8256 113.379 75.0042L114.11 75.7356C117.854 69.3579 120 61.9296 120 54C120 30.2518 100.748 11 77 11C53.2518 11 34 30.2518 34 54C34 77.7482 53.2518 97 77 97C83.6592 97 89.9649 95.4863 95.5917 92.7841L94.841 92.0333Z" fill="white" />
      <path d="M60.7572 53.0765C60.4374 51.9177 59.4781 51.2856 58.3055 51.2856C57.9857 51.2856 57.6659 51.2856 57.2395 51.3909C55.001 52.023 52.7625 52.6551 50.2042 53.3926C48.4987 53.9193 47.7525 55.0782 48.0723 56.5531C48.4987 57.7119 49.3515 58.4494 50.6306 58.4494C50.9504 58.4494 51.2702 58.4494 51.6966 58.344C52.4427 58.1333 53.2955 57.9226 54.0417 57.7119C54.3615 57.6066 54.7878 57.5012 55.1076 57.3959C55.7472 57.1852 56.2802 57.0798 56.9198 56.8691C57.133 56.8691 57.2395 56.7638 57.4527 56.7638L58.7319 56.4477C60.3308 55.8156 61.1836 54.4461 60.7572 53.0765ZM99.1317 42.2255C98.8119 41.0667 97.8525 40.3292 96.68 40.3292C96.3602 40.3292 96.0404 40.3292 95.7206 40.4346C93.0557 41.172 90.8172 41.8041 88.5787 42.4362C87.7259 42.6469 87.0864 43.1737 86.7666 43.8058C86.4468 44.3325 86.3402 45.07 86.5534 45.7021C86.8732 46.7556 87.8325 47.493 89.1117 47.493C89.4315 47.493 89.7513 47.493 89.9644 47.3877C90.8172 47.177 91.67 46.9663 92.4161 46.6502C92.7359 46.5449 93.1623 46.4395 93.4821 46.3342C93.8019 46.2288 94.2283 46.1235 94.5481 46.0181C95.4008 45.8074 96.147 45.5967 96.9998 45.2807C98.7053 44.9646 99.5581 43.7004 99.1317 42.2255ZM86.5534 26.5284C86.127 26.3177 85.7006 26.2123 85.2742 26.2123C84.4215 26.2123 83.6753 26.6337 83.2489 27.3712C81.9698 29.4782 80.6906 31.7959 79.0917 34.6403C78.5587 35.4831 78.7719 36.5366 79.5181 37.3794C80.051 38.0115 80.7972 38.3276 81.5434 38.3276H82.183L82.2896 38.2222C82.3961 38.1169 82.5027 38.1169 82.6093 38.0115C82.9291 37.8008 83.2489 37.5901 83.4621 37.2741C84.9544 34.6403 86.3402 32.3226 87.5127 30.1103C88.2589 28.6354 87.8325 27.2658 86.5534 26.5284ZM51.59 40.2239C53.8285 41.4881 56.067 42.6469 58.1989 43.8058C58.6253 44.0165 59.0517 44.1218 59.4781 44.2272C59.6913 44.2272 59.7978 44.3325 60.011 44.3325H60.2242L60.4374 44.2272C61.5034 43.7004 62.143 43.0683 62.2495 42.0148C62.4627 40.9613 61.9298 40.0132 60.9704 39.4864C58.6253 38.2222 56.3868 36.958 54.1483 35.7992C53.7219 35.5885 53.1889 35.3778 52.6559 35.3778C51.8032 35.3778 50.9504 35.7992 50.524 36.642C50.2042 37.1687 50.0976 37.9062 50.3108 38.5383C50.4174 39.1704 50.9504 39.8025 51.59 40.2239ZM64.9144 60.8724L64.7013 60.9778C64.7013 60.9778 64.5947 60.9778 64.5947 61.0831C64.3815 61.1885 63.9551 61.5045 63.7419 61.8206C62.0364 64.7704 60.7572 66.9827 59.6913 69.0897C59.0517 70.1432 59.5847 71.6181 60.7572 72.3556C61.1836 72.5663 61.61 72.6716 62.0364 72.6716C62.8891 72.6716 63.7419 72.2502 64.1683 71.5128C65.4474 69.3004 66.7266 66.9827 68.2189 64.349C68.7519 63.4008 68.5387 62.4527 67.8991 61.6099C67.0464 60.7671 66.087 60.5564 64.9144 60.8724ZM70.8838 30.8477C70.7772 30.4263 70.6706 30.1103 70.564 29.6889C70.4574 29.2675 70.3508 28.9514 70.2442 28.53C70.031 27.6872 69.7113 26.8444 69.4981 25.8963C69.1783 24.7374 68.2189 24 67.0464 24C66.8332 24 66.62 24 66.4068 24.1053C65.7672 24.316 65.2342 24.6321 64.9144 25.2642C64.5947 25.8963 64.4881 26.6337 64.7013 27.3712C65.3408 29.7942 66.087 32.2173 66.8332 34.7457C67.153 35.9045 68.1123 36.642 69.2849 36.642C69.4981 36.642 69.8178 36.642 70.031 36.5366C71.4168 36.1152 72.163 34.851 71.7366 33.3761C71.4168 32.6387 71.2036 31.6905 70.8838 30.8477ZM108.938 62.6634L76.3202 47.5984C74.9344 46.9663 73.5487 47.0716 72.4827 47.7037C71.63 48.6519 71.3102 50.0214 71.7366 51.3909L81.5434 85.6296C81.7566 86.3671 82.2896 86.9992 82.9291 87.5259C83.8885 88.158 84.9544 88.158 85.7006 87.5259C85.8072 87.4206 86.0204 87.3152 86.127 87.1045L89.1117 81.0996V80.9942L90.8172 77.4123C90.8172 77.4123 90.8172 77.307 90.9238 77.307V77.2016C91.0304 77.0963 91.137 76.8856 91.3502 76.5695C93.5887 79.2033 95.8272 81.837 98.0657 84.3654C99.5581 86.051 101.903 86.4724 103.822 85.4189C106.38 83.944 106.913 80.7835 105.101 78.5712L98.3855 70.67C98.7053 70.5646 98.9185 70.4593 99.1317 70.3539H99.3449L103.182 69.1951H103.289L109.791 67.2988C110.004 67.1934 110.111 67.0881 110.324 66.9827C111.07 66.3506 111.177 65.4025 110.751 64.349C110.218 63.6115 109.685 62.9794 108.938 62.6634Z" fill="url(#paint0_linear_2091_9110)" />
      <defs>
        <linearGradient id="paint0_linear_2091_9110" x1="64.0914" y1="31.9276" x2="148.386" y2="174.924" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}