import { useAppContext } from 'context/state'

interface Props {
  flex?: number
  mobileOnly?: boolean
  desktopOnly?: boolean
  basis?: number
}

export default function Spacer(props: Props) {
  const appContext = useAppContext()

  if (props.mobileOnly && appContext.isDesktop) {
    return null
  }

  if (props.desktopOnly && appContext.isMobile) {
    return null
  }

  return (
    <div className="spacer">
      <style jsx>{`
        .spacer{
          flex: ${props.flex ?? 1} 0 ${props.basis ? `${props.basis}px` : 'auto'};
        }
      `}</style>
    </div>
  )
}

