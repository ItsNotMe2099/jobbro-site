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
  cvId: number
}


export default function CreateMeeting(props: Props) {
  const [formLoading, setFormLoading] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const steps: IFormStep<FormStep>[] = [
    {key: FormStep.Participants, name: 'Members to meetings'},
    {key: FormStep.Details, name: 'Theme adn duration'},
    {key: FormStep.Time, name: 'Available days'},
  ]
  const [step, setStep] = useState<FormStep>(FormStep.Participants)

  const handleSubmit = (data: IFormData) => {
    if (step !== FormStep.Time) {
      const curIndex = steps.findIndex(i => i.key === step)
      setStep(steps[curIndex + 1].key)
    } else {
      const dates = Object.keys(data.slots)
      let slots = []
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
          return {start: timeStrToDate(i.start, toDate), end: timeStrToDate(i.end, toDate)}
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


    return (<>
      <Card className={styles.root}>
        <FormikProvider value={formik}>
          <Form className={styles.form} ref={formRef}>
            <FormStepper<FormStep> steps={steps} currentStep={step}/>
            <div className={styles.content}>
              {step === FormStep.Participants && <CreateMeetingParticipantsStep/>}
              {step === FormStep.Details && <CreateMeetingDetailsStep/>}
              {step === FormStep.Time && <CreateMeetingTimeStep values={formik.values.slots}/>}
            </div>

          </Form>
        </FormikProvider>

      </Card>
      <FormStickyFooter boundaryElement={`.${styles.form}`} formRef={formRef}>
        <Button spinner={formLoading} type='button' styleType='large' color='green' onClick={() => formik.submitForm()}>
          Next
        </Button>
      </FormStickyFooter>
    </>)
  }
