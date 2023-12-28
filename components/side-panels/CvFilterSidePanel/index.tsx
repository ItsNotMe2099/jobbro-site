import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useState} from 'react'
import {useAppContext} from '@/context/state'
import Button from '@/components/ui/Button'
import {CvFilterSidePanelArguments} from '@/types/side_panel_arguments'
import CheckboxMultipleField from '@/components/fields/CheckboxMultipleField'
import SidePanelFooter from '@/components/layout/SidePanel/SidePanelFooter'
import SidePanelBody from '@/components/layout/SidePanel/SidePanelBody'
import SidePanelHeader from '@/components/layout/SidePanel/SidePanelHeader'
import SidePanelLayout from '@/components/layout/SidePanel/SidePanelLayout'
import FieldLabel from '@/components/fields/FieldLabel'
import SkillEntitiesField from '@/components/fields/SkillEntitiesField'
import CurrencyField from '@/components/fields/CurrencyField'
import InputField from '@/components/fields/InputField'
import SelectField from '@/components/fields/SelectField'
import {SalaryType} from '@/data/enum/SalaryType'
import Dictionary from '@/utils/Dictionary'
import CountryField from '@/components/fields/CountryField'
import useTranslation from 'next-translate/useTranslation'
import {Nullable} from '@/types/types'
import {ProfileTypeFilter} from '@/data/enum/CvProfileTypeFilter'
import {ISkill} from '@/data/interfaces/ISkill'

interface Props {

}

export interface IFormData {
  profileType: string[]
  skills: ISkill[]
  salaryType: Nullable<string>
  currency: Nullable<string>
  salaryMin: Nullable<number>
  salaryMax: Nullable<number>
  country: Nullable<number>
}

export default function CvFilterSidePanel(props: Props) {
  const appContext = useAppContext()
  const {t} = useTranslation()
  const args = appContext.panelArguments as CvFilterSidePanelArguments
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = (data: IFormData) => {
    args?.onSubmit?.(data)
    appContext.hidePanel()
    appContext.hideOverlay()
    setLoading(false)
  }

  const initialValues: IFormData = {
    profileType: args.filter?.profileType ?? [],
    skills: args.filter?.skills ?? [],
    salaryType: args.filter?.salaryType ?? null,
    currency: args.filter?.currency ?? null,
    salaryMin: args.filter?.salaryMin ?? null,
    salaryMax: args.filter?.salaryMax ?? null,
    country: args.filter?.country ?? null,
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <SidePanelLayout>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <SidePanelHeader title={t('cv_filter_title')}/>
          <SidePanelBody fixed>

            <div className={styles.fields}>
              {args.showScore && <div className={styles.field}>
                <FieldLabel label={t('cv_filter_field_score')} styleType={'large'}/>

                <div className={styles.rows}>
                  <div className={styles.columns}>
                    <InputField className={styles.select} format={'number'}
                                label={t('cv_filter_field_score_min')} name='scoreMin'/>
                    <InputField className={styles.select} format={'number'} max={100}
                                label={t('cv_filter_field_score_max')} name='scoreMax'/>
                  </div>
                </div>
              </div>}
              <div className={styles.field}>
                <CheckboxMultipleField<ProfileTypeFilter> name={'profileType'} label={t('cv_filter_field_profile')}
                                                          labelStyleType={'large'}
                                                          options={[
                                                            {
                                                              label: t('cv_filter_field_profile_all'),
                                                              value: ProfileTypeFilter.All
                                                            },
                                                            {
                                                              label: t('cv_filter_field_profile_verificated'),
                                                              value: ProfileTypeFilter.Verified
                                                            },
                                                            {
                                                              label: t('cv_filter_field_profile_manual'),
                                                              value: ProfileTypeFilter.Manual
                                                            },
                                                          ]}/>
              </div>
              <div className={styles.field}>
                <FieldLabel label={'Salary'} styleType={'large'}/>
                <div className={styles.rows}>
                  <div className={styles.columns}>
                    <InputField className={styles.select} format={'number'}
                                label={t('cv_filter_field_salary_min')} name='salaryMin'/>
                    <InputField className={styles.select} format={'number'}
                                label={t('cv_filter_field_salary_max')} name='salaryMax'/>
                  </div>
                  <div className={styles.columns}>
                    <CurrencyField className={styles.select} name='currency' label={t('cv_filter_field_currency')}/>
                    <SelectField<SalaryType> className={styles.select}
                                             label={t('cv_filter_field_salary_type')} name='salaryType'
                                             options={Dictionary.getSalaryTypeOptions(t)}/>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <FieldLabel label={t('cv_filter_field_skills')} styleType={'large'}/>
                <SkillEntitiesField name={'skills'} placeholder={t('cv_filter_field_skills_ph')}/>
              </div>
              <div className={styles.field}>
                <FieldLabel label={t('cv_filter_field_location')} styleType={'large'}/>
                <CountryField name={'country'} label={t('cv_filter_field_country')}/>
              </div>

            </div>
          </SidePanelBody>
          <SidePanelFooter>
            <div className={styles.buttons}>
              <Button spinner={loading} type='submit' className={styles.apply} styleType='large' color='green'>
                {t('cv_filter_button_apply')}
              </Button>
              <Button onClick={appContext.hidePanel} className={styles.btn} styleType='large' color='white'>
                {t('cv_filter_button_cancel')}
              </Button>
            </div>
          </SidePanelFooter>
        </Form>
      </FormikProvider>
    </SidePanelLayout>

  )
}
