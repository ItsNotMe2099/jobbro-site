import Button from '@/components/ui/Button'
import { Routes } from '@/types/routes'
import {useRouter} from 'next/router'
import ChatSuggestionCardLayout from '@/components/for_pages/Chat/ChatDialog/ChatSuggestionCardLayout'

interface Props {
  className?: string
}

export default function ChatSuggestionLogin(props: Props) {

  const router = useRouter()
  return (
    <ChatSuggestionCardLayout text={'Please login'} actions={[
      <Button href={Routes.login(router.asPath)} color='green' styleType='large'>
        Login
      </Button>,
      <Button href={Routes.registration(router.asPath)} color='green' styleType='large'>
        Registration
      </Button>
    ]}/>
  )

}
