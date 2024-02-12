import JobWidget from '@/components/ui/JobWidget'
import { JobWidgetWrapper } from '@/context/job_widget_state'
import JobWidgetRepository from '@/data/repositories/JobWidgetRepository'


export const getServerSideProps = async (context: {query: {token: string}}) => {
  console.log(context)
  const token = context.query.token
  // try{

  const settings = await JobWidgetRepository.getWidgetByToken(token)
  const vacancies = await JobWidgetRepository.getVacanciesForWidget(token, 1, settings?.jobsPerPage)
  return {
    props: {settings: settings, vacancies: vacancies}
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
    <JobWidgetWrapper initialVacancies={props.vacancies} settings={props.settings}>
      <JobWidget {...props.settings}/>
    </JobWidgetWrapper>
  )
}
