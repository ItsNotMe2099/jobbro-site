import styles from './index.module.scss'
import SelectField from '@/components/fields/SelectField'
import Dictionary from '@/utils/Dictionary'
import useTranslation from 'next-translate/useTranslation'
import { IVacancy } from '@/data/interfaces/IVacancy'
import AvatarCircular from '../AvatarCircular'
import IconButton from '../IconButton'
import { colors } from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import FileSvg from '@/components/svg/FileSvg'
import LocationSvg from '@/components/svg/LocationSvg'
import UserTabSvg from '@/components/svg/UserTabSvg'
import Link from 'next/link'
import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import { Form, FormikProvider, useFormik } from 'formik'
import ReactPaginate from 'react-paginate'
import { useJobWidgetContext } from '@/context/job_widget_state'
import classNames from 'classnames'
import {Routes} from '@/types/routes'

interface Props extends Partial<IJobWidget> {
  vacancies?: IVacancy[]
}

export default function JobWidget(props: Props) {
  const jobWidgetContext = useJobWidgetContext()
  const {t} = useTranslation()

  const formik = useFormik({
    initialValues: {
      categories: undefined,
      location: undefined,
      employment: undefined
    },
    onSubmit: () => {}
  })

  return (<div className={styles.root} style={{background: props.backgroundWidget}} id="job-widget">
    <p className={styles.title} style={{color: props.primaryText}}>Available positions</p>
    <FormikProvider value={formik}>
      <Form>
        <div className={styles.settings}>
          { props.categoryFilter &&
            <SelectField
            className={styles.select}
            style={{border: props.filterBorders&&`2px solid ${props.filterBorders}`}}
            label={t('job_widget_all_categories')}
            options={props?.categories&&props?.categories?.length > 0 ? props?.categories?.map(i => ({value: i.id, label: i.name})):[]}
            name={'category'}/>
          }
          {props.locationFilter &&
            <SelectField
            className={styles.select}
            style={{border: props.filterBorders&&`2px solid ${props.filterBorders}`}}
            label={t('job_widget_all_locations')}
            options={ props?.location&&props?.location?.length > 0 ?  props.location.map(i => ({value: i.geonameid, label: i.name})):[]}
            name={'location'}/>
          }
          {props.employmentFilter &&
            <SelectField
            className={styles.select}
            style={{border: props.filterBorders&&`2px solid ${props.filterBorders}`}}
            label={t('job_widget_all_employment_types')}
            options={ props?.employments&&props?.employments?.length > 0 ?props.employments.map(i => ({value: i, label: Dictionary.getEmploymentName(i, t)})):[]}
            name={'employment'}/>
          }
        </div>
      </Form>
    </FormikProvider>

    <div className={styles.vacancies}>
      {/* @ts-ignore */}
      { jobWidgetContext.vacancies&& jobWidgetContext?.vacancies?.get(jobWidgetContext.page)?.length > 0 && jobWidgetContext?.vacancies?.get(jobWidgetContext.page).map(v => {
        return (
          <div className={classNames(styles.vacancy, jobWidgetContext.loading&&styles.loading)}
          style={{
            background: props.backgroundJobCard,
            boxShadow: (props.cardShadow&& props.showCardShadow)?`0px 0px 10px 0px ${props.cardShadow}`:'',
            border: (props.cardBorder &&props.showCardBorder)?'2px solid '+props.cardBorder:'',
          }}
          >
            {props.showItemLogo &&
              <AvatarCircular file={jobWidgetContext.settings?.company.logo} initials={jobWidgetContext.settings?.company?.name[0]} size={80}/>
            }
            <div className={styles.info}>
              <div className={styles.name} style={{color: jobWidgetContext.settings?.secondaryText}}>{v.name}</div>
              {(jobWidgetContext.settings?.showItemCategory || jobWidgetContext.settings?.showItemLocation || jobWidgetContext.settings?.showItemEmploymentType) &&
                <div className={styles.stats}>
                  {v.category?.name && props.showItemLogo &&
                    <div className={styles.stat} style={{color: jobWidgetContext.settings.secondaryText}}><FileSvg color={colors.green}/> {v.category?.name}</div>
                  }
                  {v.office?.city?.locName && props.showItemLocation &&
                    <div className={styles.stat} style={{color: jobWidgetContext.settings.secondaryText}}><LocationSvg color={colors.green}/> {v.office?.city?.locName}</div>
                  }
                  {v.employment && props.showItemEmploymentType &&
                    <div className={styles.stat} style={{color: jobWidgetContext.settings.secondaryText}}><UserTabSvg color={colors.green}/> {Dictionary.getEmploymentName(v?.employment, t)}</div>
                  }
                </div>
              }
            </div>
            <IconButton className={styles.arrow} href={'/'}><ChevronDownSvg color={colors.green} direction='right'/></IconButton>
          </div>
        )
      })}
      {false && !jobWidgetContext.loading && new Array(jobWidgetContext.settings?.jobsPerPage||2).fill('').map(i => {
        return (
          <div className={classNames(styles.vacancy, styles.loading)} key={'empty'}
          style={{
            background: jobWidgetContext?.settings?.backgroundJobCard,
            boxShadow: (jobWidgetContext?.settings?.cardShadow&& jobWidgetContext.settings?.showCardShadow)?`0px 0px 10px 0px ${jobWidgetContext.settings.cardShadow}`:'',
            border: (jobWidgetContext.settings?.cardBorder &&jobWidgetContext?.settings?.showCardBorder)?'2px solid '+jobWidgetContext.settings.cardBorder:'',
          }}
          >
            {props.showItemLogo &&
              <AvatarCircular size={80}/>
            }
            <div className={styles.info}>
              <div className={styles.name} style={{color: props.primaryText}}>Empty vacancy name</div>
              {(jobWidgetContext.settings?.showItemCategory || jobWidgetContext.settings?.showItemLocation || jobWidgetContext.settings?.showItemEmploymentType) &&
              <div className={styles.stats}>
                {jobWidgetContext.settings?.showItemCategory &&
                  <div className={styles.stat} style={{color: jobWidgetContext.settings.secondaryText}}><FileSvg color={colors.green}/> Empty Category</div>
                }
                {jobWidgetContext.settings?.showItemLocation &&
                  <div className={styles.stat} style={{color: jobWidgetContext.settings.secondaryText}}><LocationSvg color={colors.green}/> Empty City</div>
                }
                {jobWidgetContext.settings?.showItemEmploymentType &&
                  <div className={styles.stat} style={{color: jobWidgetContext.settings.secondaryText}}><UserTabSvg color={colors.green}/> Full Time</div>
                }
              </div>
              }
            </div>
            <IconButton className={styles.arrow} href={'/'}><ChevronDownSvg color={colors.green} direction='right'/></IconButton>
          </div>
        )
      })}

    </div>

    {/* @ts-ignore */}
    <div className={styles.bottom} style={{'--item-color': jobWidgetContext.settings?.pagination, '--item-text-color': jobWidgetContext.settings?.secondaryText}}>
      {jobWidgetContext.total > 0 &&
      <ReactPaginate
      breakLabel={<p className={styles.paginationLink} style={{background: jobWidgetContext.settings?.pagination}}>...</p>}
      breakClassName={styles.item}
      nextLabel={null}
      activeLinkClassName={styles.item_active}
      containerClassName={styles.pagination}
      pageLinkClassName={styles.item}
      onClick={(el)=>{
        //@ts-ignore
        jobWidgetContext.setPage(el.nextSelectedPage + 1)
      }}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={jobWidgetContext.total/(jobWidgetContext.settings?.jobsPerPage||2)}
      previousLabel={null}
      renderOnZeroPageCount={null}
      />
     }
      <Link className={styles.link} href={Routes.getGlobal(Routes.findJobs)}>{t('job_widget_show_all')}</Link>
    </div>
  </div>)
}
