import { useEffect, useState } from 'react'

interface Props {
  children: JSX.Element | null | undefined
}

export default function ClientOnly(props: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  if (visible) {
    return props.children ?? null
  } else {
    return null
  }
}
