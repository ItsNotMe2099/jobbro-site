import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { Form, FormikProvider, useFormik } from 'formik'
import { Nullable } from '@/types/types'
import { useEffect, useRef, useState } from 'react'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'
import HexColorPickerField from '@/components/fields/HexColorPickerField'
import Switch from '@/components/ui/Switch'
import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import JobWidget from '@/components/ui/JobWidget'
import { useJobWidgetContext } from '@/context/job_widget_state'
import { useVacancyListOwnerContext } from '@/context/vacancy_owner_list_state'
import { useEffectOnce } from '@/components/hooks/useEffectOnce'


interface IFormData extends 
Pick<IJobWidget, 
  'backgroundWidget' | 
  'filterBorders' | 
  'pagination' | 
  'backgroundJobCard' | 
  'cardBorder' | 
  'cardShadow' | 
  'primaryText' | 
  'secondaryText'|
  'showCardBorder'|
  'showCardShadow'
>{}

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
  const jobWidgetContext = useJobWidgetContext()
  const vacancyListContext = useVacancyListOwnerContext()

  useEffectOnce(() => {
    vacancyListContext.reFetch()
  })

  const handleSubmit = async (data: IFormData) => {
  }

  const initialValues: IFormData = {
    backgroundWidget: '#FFFFFF',
    filterBorders: '#FFFFFF',
    pagination: '#24B563',
    backgroundJobCard: '#FFFFFF',
    cardBorder: '#EBEBEB',
    cardShadow: '#EBEBEB',
    primaryText: '#3C3C3C',
    secondaryText: '#3C3C3C',
    showCardBorder: false,
    showCardShadow: false
  }

  const formik = useFormik<IFormData>({
    initialValues: {
      backgroundWidget: jobWidgetContext.settings.backgroundWidget||initialValues.backgroundWidget,
      filterBorders: jobWidgetContext.settings.filterBorders||initialValues.filterBorders,
      pagination: jobWidgetContext.settings.pagination||initialValues.pagination,
      backgroundJobCard: jobWidgetContext.settings.backgroundJobCard||initialValues.backgroundJobCard,
      cardBorder: jobWidgetContext.settings.cardBorder||initialValues.cardBorder,
      cardShadow: jobWidgetContext.settings.cardShadow||initialValues.cardShadow,
      primaryText: jobWidgetContext.settings.primaryText||initialValues.primaryText,
      secondaryText: jobWidgetContext.settings.secondaryText||initialValues.secondaryText,
      showCardBorder: jobWidgetContext.settings.showCardBorder||initialValues.showCardBorder,
      showCardShadow: jobWidgetContext.settings.showCardShadow||initialValues.showCardShadow
    },
    onSubmit: handleSubmit
  })

  useEffect(()=>{
    jobWidgetContext.setSettings(state=> ({...state, ...formik.values}))
  }, [formik.values])


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

  // // switches
  // const [border, setBorder] = useState<boolean>(true)
  // const [shadow, setShadow] = useState<boolean>(false)

  const handleResetStyles = (style: Style) => {
    // formik.resetForm()
    if (style === Style.Widget) {
      formik.setFieldValue('backgroundWidget', initialValues.backgroundWidget)
      formik.setFieldValue('filterBorders', initialValues.filterBorders)
      formik.setFieldValue('pagination', initialValues.pagination)
    }
    else {
      formik.setFieldValue('backgroundJobCard', initialValues.backgroundJobCard)
      formik.setFieldValue('cardBorder', initialValues.cardBorder)
      formik.setFieldValue('cardShadow', initialValues.cardShadow)
      formik.setFieldValue('primaryText', initialValues.primaryText)
      formik.setFieldValue('secondaryText', initialValues.secondaryText)
      formik.setFieldValue('showCardBorder', initialValues.showCardBorder)
      formik.setFieldValue('showCardShadow', initialValues.showCardShadow)
    }
  }

  return (<>

    <JobWidget {...jobWidgetContext.settings} vacancies={vacancyListContext.data.data}/>
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
              setVisible={(val) => setBackgroundWidgetVisible(val??true)}
              className={styles.colors}
              onChange={() => setBackgroundWidgetVisible(false)} 
              />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.title}>
                  Filter Borders
                </div>   
              </div>
              <HexColorPickerField name='filterBorders' visible={filterBordersVisible}
              color={formik.values.filterBorders}
              setVisible={(val) => setFilterBordersVisible(val??true)}
              className={styles.colors}
              onChange={() => setFilterBordersVisible(false)} 
              />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.title}>
                  Pagination
                </div>
              </div>
              <HexColorPickerField name='pagination' visible={paginationVisible}
              color={formik.values.pagination}
              setVisible={(val) => setPaginationVisible(val??true)}
              className={styles.colors}
              onChange={() => setPaginationVisible(false)} 
              />
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
              setVisible={(val) => setBackgroundJobCardVisible(val??true)}
              className={styles.colors}
              onChange={() => setBackgroundJobCardVisible(false)} 
              />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.titleWithSwitch}>
                  Border
                </div>
                <Switch checked={formik.values.showCardBorder} onChange={(v)=> formik.setFieldValue('showCardBorder', v)} />
              </div>
              <HexColorPickerField disabled={!formik.values.showCardBorder} name='cardBorder' visible={borderJobCardVisible}
              color={formik.values.cardBorder}
              setVisible={(val) => setBorderJobCardVisible(val??true)}
              className={styles.colors}
              onChange={() => setBorderJobCardVisible(false)} 
              />
            </div>
            <div className={styles.field}>
              <div className={styles.text}>
                <div className={styles.titleWithSwitch}>
                  Shadow
                </div>
                <Switch checked={formik.values.showCardShadow} onChange={(v)=> formik.setFieldValue('showCardShadow', v)} />
              </div>
              <HexColorPickerField disabled={!formik.values.showCardShadow} name='cardShadow' visible={shadowJobCardVisible}
                color={formik.values.cardShadow}
                setVisible={(val) => setShadowJobCardVisible(val??true)}
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
                setVisible={(val) => setPrimaryTextJobCardVisible(val??true)}
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
                color={formik.values.secondaryText}
                setVisible={(val) => setSecondaryTextJobCardVisible(val??true)}
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
  </>)
}
