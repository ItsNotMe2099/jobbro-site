import styles from './index.module.scss'

import {FieldArray, FieldArrayRenderProps,  useFormikContext} from 'formik'
import {colors} from '@/styles/variables'
import IconButton from '@/components/ui/IconButton'
import CloseSvg from '@/components/svg/CloseSvg'
import {format} from 'date-fns'
import ClockSvg from '@/components/svg/ClockSvg'
import { useCallback, useRef } from 'react'
import TimeField from '@/components/fields/TimeField'
import Validator from '@/utils/validator'

interface Props {
  value: Date,
  slots: {
    [key: string]: {
      start: string
      end: string
    }[]
  }
}


export default function MeetingDaySlots(props: Props) {
  const slotsRef = useRef<HTMLDivElement>(null!)
  const {values, setValues} = useFormikContext() as any

  const isMoreThenHour = useCallback((index: number):boolean => {
    const startHour = parseInt(values?.slots[format(props.value, 'yyyy-MM-dd')][index]?.start?.split(':').join(''))
    const endHour = parseInt(values?.slots[format(props.value, 'yyyy-MM-dd')][index]?.end?.split(':').join(''))
    if(!startHour || !endHour) return false
    const isBigger = endHour - startHour >= 10000  
    return isBigger
  }, [values])





  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.day}>{format(props.value, 'EEEE, MMMM dd')}</div>
        <div className={styles.timezone}>
          <ClockSvg color={colors.simpleGrey}/>
          <div className={styles.label}>Time zone</div>
          <div className={styles.value}>{format(new Date(), 'zzz')}</div>
        </div>
      </div>
      <div className={styles.bottom}>
      <FieldArray name={`slots[${format(props.value, 'yyyy-MM-dd')}]`}>
        {(arrayHelpers: FieldArrayRenderProps) => (<>
            <div className={styles.slots}  ref={slotsRef}>
              {(props.slots[format(props.value, 'yyyy-MM-dd')] ?? []).map((i, index) => <div className={styles.slot}
                                                                                             key={index}>
                  <div className={styles.slotHeader}>
                    <IconButton
                      size={'small'}
                      onClick={() => arrayHelpers.remove(index)}>
                      <CloseSvg className={styles.deleteIcon} color={colors.textSecondary}/>
                    </IconButton>
                    Time slot {index+1}
                  </div>
                  <div className={styles.fields}>
                    <TimeField
                      className={styles.field}
                      key={index}
                      label={'Start time'}
                      resettable={true}
                      minuteStep={15}
                      name={`slots[${format(props.value, 'yyyy-MM-dd')}][${index}].start`}
                      validate={Validator.required}
                    />
                    <TimeField
                      className={styles.field}
                      key={index}
                      label={'End time'}
                      resettable={true}
                      minuteStep={isMoreThenHour(index) ? 30 : 15}
                      name={`slots[${format(props.value, 'yyyy-MM-dd')}][${index}].end`}
                      validate={Validator.required}
                    />
                  </div>
                </div>
              )}

            </div>
            <div className={styles.footer}>
              <div className={styles.add} onClick={() => {
                arrayHelpers.push({start: null, description: null})
                setTimeout(()=> {
                  slotsRef.current.scrollTop = slotsRef.current.scrollHeight
                }, 50)

                }}>
                Add slot
              </div>
            </div>
          </>
        )}
      </FieldArray>
      </div>
    </div>
  )
}

