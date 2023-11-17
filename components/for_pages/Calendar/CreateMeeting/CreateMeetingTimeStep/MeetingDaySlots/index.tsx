import styles from './index.module.scss'

import {FieldArray, FieldArrayRenderProps} from 'formik'
import {colors} from '@/styles/variables'
import IconButton from '@/components/ui/IconButton'
import CloseSvg from '@/components/svg/CloseSvg'
import SelectTimeField from '@/components/fields/SelectTimeField'
import {format} from 'date-fns'
import ClockSvg from '@/components/svg/ClockSvg'

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
      <FieldArray name={`slots[${format(props.value, 'yyyy-MM-dd')}]`}>
        {(arrayHelpers: FieldArrayRenderProps) => (<>
            <div className={styles.slots}>
              {(props.slots[format(props.value, 'yyyy-MM-dd')] ?? []).map((i, index) => <div className={styles.slot}
                                                                                             key={index}>
                  <div className={styles.slotHeader}>
                    <IconButton
                      onClick={() => arrayHelpers.remove(index)}>
                      <CloseSvg color={colors.textSecondary}/>
                    </IconButton>
                    Time slot {index}
                  </div>
                  <div className={styles.fields}>
                    <SelectTimeField
                      className={styles.field}
                      key={index}
                      label={'Start time'}
                      name={`slots[${format(props.value, 'yyyy-MM-dd')}][${index}].start`}
                    />
                    <SelectTimeField
                      className={styles.field}
                      key={index}
                      label={'End time'}
                      name={`slots[${format(props.value, 'yyyy-MM-dd')}][${index}].end`}
                    />
                  </div>
                </div>
              )}

            </div>
            <div className={styles.footer}>
              <div className={styles.add} onClick={() => arrayHelpers.push({start: null, description: null})}>
                Add slot
              </div>
            </div>
          </>
        )}
      </FieldArray>
    </div>
  )
}

