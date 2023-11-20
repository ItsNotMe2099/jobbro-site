import styles from './index.module.scss'
import {useRef, useState} from 'react'
import {IFormStep, Nullable} from '@/types/types'
import FormStepper from '@/components/ui/FormStepper'
import CreateMeetingParticipantsStep from '@/components/for_pages/Calendar/CreateMeeting/CreateMeetingParticipantsStep'
import CreateMeetingDetailsStep from '@/components/for_pages/Calendar/CreateMeeting/CreateMeetingDetailsStep'
import CreateMeetingTimeStep from '@/components/for_pages/Calendar/CreateMeeting/CreateMeetingTimeStep'
import {Form, FormikProvider, useFormik} from 'formik'
import Card from '@/components/for_pages/Common/Card'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import {parse} from 'date-fns'
import {omit} from '@/utils/omit'

interface IFormDataSlot {
  start: string
  end: string
}

interface IFormData {
  theme: Nullable<string>
  description: Nullable<string>
  place: Nullable<string>
  duration: Nullable<number>
  participantsIds: number[]
  slots: {
    [key: string]: {
      start: string
      end: string
    }[]
  }
}

enum FormStep {
  Participants = 'participants',
  Details = 'details',
  Time = 'time',
}

interface Props {

}


export default function CreateMeeting(props: Props) {
  const [formLoading, setFormLoading] = useState(false)
  const formRef = useRef<HTMLDivElement | null>(null)
  const steps: IFormStep<FormStep>[] = [
    {key: FormStep.Participants, name: 'Members to meetings'},
    {key: FormStep.Details, name: 'Theme adn duration'},
    {key: FormStep.Time, name: 'Available days'},
  ]
  const [step, setStep] = useState<FormStep>(FormStep.Participants)
  const handlePrevious = () => {
    const curIndex = steps.findIndex(i => i.key === step)
    if(curIndex > 0) {
      setStep(steps[curIndex - 1].key)
    }
  }
  const handleSubmit = (data: IFormData) => {
    if (step !== FormStep.Time) {
      const curIndex = steps.findIndex(i => i.key === step)
      setStep(steps[curIndex + 1].key)
    } else {
      const dates = Object.keys(data.slots)
      let slots: {start: string, end: string}[] = []
      for (const date of dates) {
        const toDate = parse(date, 'yyyy-MM-dd', new Date())
        const timeStrToDate = (time: string, date: Date) => {
          const copiedDate = new Date(date)
          const [hours, mins] = time.split(':')
          copiedDate.setHours(parseInt(hours, 10) ?? 0)
          copiedDate.setMinutes(parseInt(mins) ?? 0)
          copiedDate.setSeconds(0)
          copiedDate.setMilliseconds(0)
          return copiedDate
        }
        const items = data.slots[date].filter(i => i.start && i.end).map(i => {
          return {start: timeStrToDate(i.start, toDate).toISOString(), end: timeStrToDate(i.end, toDate).toISOString()}
        })
        slots = [...slots, ...items]
      }
      const newData = {...omit(data, ['slots']), slots}
      console.log('Submit', newData)
    }
  }
    const initialValues: IFormData = {
      theme: null,
      place: null,
      description: null,
      duration: null,
      participantsIds: [],
      slots: {}
    }

    const formik = useFormik({
      initialValues,
      onSubmit: handleSubmit
    })


    return (<div className={styles.root}  ref={formRef}>
      <Card className={styles.card}>
        <FormikProvider value={formik}>
          <Form className={styles.form}>
            <FormStepper<FormStep> steps={steps} currentStep={step}/>
            <div className={styles.content}>
              {step === FormStep.Participants && <CreateMeetingParticipantsStep/>}
              {step === FormStep.Details && <CreateMeetingDetailsStep/>}
              {step === FormStep.Time && <CreateMeetingTimeStep values={formik.values.slots}/>}
            </div>

          </Form>
        </FormikProvider>

      </Card>
      <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={formRef}>
        <Button spinner={formLoading} type='button' styleType='large' color='green' onClick={() => formik.submitForm()}>
          Next
        </Button>
        <>
        {step !== FormStep.Participants && <Button disabled={formLoading} type='button' styleType='large' color='white' onClick={handlePrevious}>
          Previous
        </Button>}
        </>
      </FormStickyFooter>
    </div>)
  }
