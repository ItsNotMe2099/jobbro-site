import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { Form, FormikProvider, useFormik } from 'formik'
import { Nullable } from '@/types/types'
import { useRef, useState } from 'react'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'
import HexColorPickerField from '@/components/fields/HexColorPickerField'
import Switch from '@/components/ui/Switch'


interface IFormData {
  backgroundWidget: string
  filterBorders: string
  pagination: string
  backgroundJobCard: string
  border: string
  shadow: string
  primaryText: string
  secondaryText: string
}

interface Props {
  onPreview?: () => void
  preview?: boolean
}

enum Style {
  Widget,
  JobCard
}

export default function WidgetDesignForm(props: Props) {
  const ref = useRef<Nullable<HTMLFormElement>>(null)

  const handleSubmit = async (data: IFormData) => {


  }

  const initialValues: IFormData = {
    backgroundWidget: '#EBEBEB',
    filterBorders: '#D4D4D8',
    pagination: '#24B563',
    backgroundJobCard: '#EBEBEB',
    border: '#3C3C3C',
    shadow: '#EBEBEB',
    primaryText: '#24B563',
    secondaryText: '#838383',
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })



  console.log(formik.values)

  //Widget Styles
  const [backgroundWidgetVisible, setBackgroundWidgetVisible] = useState<boolean>(false)
  const [filterBordersVisible, setFilterBordersVisible] = useState<boolean>(false)
  const [paginationVisible, setPaginationVisible] = useState<boolean>(false)

  //Job Card Styles
  const [backgroundJobCardVisible, setBackgroundJobCardVisible] = useState<boolean>(false)
  const [borderJobCardVisible, setBorderJobCardVisible] = useState<boolean>(false)
  const [shadowJobCardVisible, setShadowJobCardVisible] = useState<boolean>(false)
  const [primaryTextJobCardVisible, setPrimaryTextJobCardVisible] = useState<boolean>(false)
  const [secondaryTextJobCardVisible, setSecondaryTextJobCardVisible] = useState<boolean>(false)

  // switches
  const [border, setBorder] = useState<boolean>(true)
  const [shadow, setShadow] = useState<boolean>(false)

  const handleResetStyles = (style: Style) => {
    if (style === Style.Widget) {
      formik.setFieldValue('backgroundWidget', '#EBEBEB')
      formik.setFieldValue('filterBorders', '#D4D4D8')
      formik.setFieldValue('pagination', '#24B563')
    }
    else {
      formik.setFieldValue('backgroundJobCard', '#EBEBEB')
      formik.setFieldValue('border', '#3C3C3C')
      formik.setFieldValue('shadow', '#EBEBEB')
      formik.setFieldValue('primaryText', '#24B563')
      formik.setFieldValue('secondaryText', '#838383')
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <Card title={
          <div className={styles.cardTitle}>
            <div className={styles.title}>Widget Styles</div>
            <div onClick={() => handleResetStyles(Style.Widget)} className={styles.reset}>Reset</div>
          </div>}>
          <div className={styles.wrapper}>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.title}>
                  Background
                </div>
              </div>
              <HexColorPickerField name='backgroundWidget' visible={backgroundWidgetVisible}
                color={formik.values.backgroundWidget}
                setVisible={() => setBackgroundWidgetVisible(true)}
                className={styles.colors}
                onChange={() => setBackgroundWidgetVisible(false)} />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.title}>
                  Filter Borders
                </div>
              </div>
              <HexColorPickerField name='filterBorders' visible={filterBordersVisible}
                color={formik.values.filterBorders}
                setVisible={() => setFilterBordersVisible(true)}
                className={styles.colors}
                onChange={() => setFilterBordersVisible(false)} />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.title}>
                  Pagination
                </div>
              </div>
              <HexColorPickerField name='pagination' visible={paginationVisible}
                color={formik.values.pagination}
                setVisible={() => setPaginationVisible(true)}
                className={styles.colors}
                onChange={() => setPaginationVisible(false)} />
            </div>
          </div>
        </Card>
        <Card title={
          <div className={styles.cardTitle}>
            <div className={styles.title}>Job Card Styles</div>
            <div onClick={() => handleResetStyles(Style.JobCard)} className={styles.reset}>Reset</div>
          </div>}>
          <div className={styles.wrapper}>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.title}>
                  Background
                </div>
              </div>
              <HexColorPickerField name='backgroundJobCard' visible={backgroundJobCardVisible}
                color={formik.values.backgroundJobCard}
                setVisible={() => setBackgroundJobCardVisible(true)}
                className={styles.colors}
                onChange={() => setBackgroundJobCardVisible(false)} />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.titleWithSwitch}>
                  Border
                </div>
                <Switch checked={border} onChange={setBorder} />
              </div>
              <HexColorPickerField disabled={!border} name='border' visible={borderJobCardVisible}
                color={formik.values.border}
                setVisible={() => setBorderJobCardVisible(true)}
                className={styles.colors}
                onChange={() => setBorderJobCardVisible(false)} />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.titleWithSwitch}>
                  Shadow
                </div>
                <Switch checked={shadow} onChange={setShadow} />
              </div>
              <HexColorPickerField disabled={!shadow} name='shadow' visible={shadowJobCardVisible}
                color={formik.values.shadow}
                setVisible={() => setShadowJobCardVisible(true)}
                className={styles.colors}
                onChange={() => setShadowJobCardVisible(false)} />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.title}>
                  Primary Text
                </div>
              </div>
              <HexColorPickerField name='primaryText' visible={primaryTextJobCardVisible}
                color={formik.values.primaryText}
                setVisible={() => setPrimaryTextJobCardVisible(true)}
                className={styles.colors}
                onChange={() => setPrimaryTextJobCardVisible(false)} />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.title}>
                  Secondary Text
                </div>
              </div>
              <HexColorPickerField name='secondaryText' visible={secondaryTextJobCardVisible}
                color={formik.values.primaryText}
                setVisible={() => setSecondaryTextJobCardVisible(true)}
                className={styles.colors}
                onChange={() => setSecondaryTextJobCardVisible(false)} />
            </div>
          </div>
        </Card>
        <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}>
          <Button spinner={false} type='submit' styleType='large' color='green'>
            Save
          </Button>
          <Button styleType='large' color='white'>
            Cancel
          </Button>
          <div className={styles.preview} onClick={props.onPreview}>
            {!props.preview ? <EyeSvg color={colors.green} className={styles.eye} />
              :
              <NoEyeSvg color={colors.green} className={styles.eye} />
            }
            {!props.preview ? <div className={styles.text}>Preview</div>
              :
              <div className={styles.text}>Close Preview Mode</div>
            }
          </div>
        </FormStickyFooter>
      </Form>
    </FormikProvider>
  )
}
