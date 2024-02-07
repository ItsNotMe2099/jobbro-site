import JobWidget from '@/components/ui/JobWidget'
import JobWidgetRepository from '@/data/repositories/JobWidgetRepository'

export const getServerSideProps = async (context: {query: {token: string}}) => {
  console.log(context)
  const token = context.query.token
  // try{

    const settings = await JobWidgetRepository.getWidgetByToken(token)
    return {
      props: {settings: settings, vacancies: []}
    }
  // } 
  // catch (e) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/404',
  //     }
  //   }
  // }
}

export default function JobWidgetPage (props: any) {

  
  
  return (
    <>
    <JobWidget vacancies={props.vacancies} {...props.settings} />
    </>
  )
}
