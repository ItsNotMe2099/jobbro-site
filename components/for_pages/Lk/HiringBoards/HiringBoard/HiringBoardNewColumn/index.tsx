import styles from './index.module.scss'
import {useHiringBoardContext} from '@/context/hiring_board_state'
import PlusInEllipseSvg from '@/components/svg/PlusInEllipseSvg'
import {colors} from '@/styles/variables'
import {useState} from 'react'
import {Formik, Form} from 'formik'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import CloseSvg from '@/components/svg/CloseSvg'

interface Props {

}

export default function HiringBoardNewColumn(props: Props) {
  const hiringBoardContext = useHiringBoardContext()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleSubmit = async (data: {title: string}) => {
    console.log('handleSubmit', data)
  await hiringBoardContext.createHiringStage(data)
    setIsEdit(false)
  }
  return (<div className={styles.root}>
    {!isEdit && <div className={styles.addButton} onClick={() => setIsEdit(true)}>
      <PlusInEllipseSvg color={colors.green}/> <span>Add new stage</span>
    </div>}
    {isEdit && <Formik initialValues={{title: ''}} onSubmit={handleSubmit}>
      <Form>
    <InputField name={'title'} label={'Title'}/>
      <div className={styles.bottom}>
      <Button spinner={hiringBoardContext.editLoading} type='submit' className={styles.btn} styleType='small' color='green'>
        Create
      </Button>
        <IconButton onClick={() => setIsEdit(false)} >
          <CloseSvg color={colors.textSecondary} />
        </IconButton>
      </div>
      </Form>
    </Formik>}
  </div>)
}
