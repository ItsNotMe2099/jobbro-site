import React, {useEffect} from 'react'
import styles from './index.module.scss'
import {IField, Nullable} from '@/types/types'
import {IManager} from '@/data/interfaces/IManager'
import {ManagerListOwnerWrapper, useManagerListOwnerContext} from '@/context/manager_owner_list_state'
import AvatarCircular from '@/components/ui/AvatarCircular'
import UserUtils from '@/utils/UserUtils'
import { useField} from 'formik'
import classNames from 'classnames'
import InputField, {InputValueType} from '@/components/fields/InputField'
import {debounce} from 'debounce'


interface Props extends IField<IManager[]> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
  className?: string
}

const ManagerMultiFieldInner = (props: Props) => {
  const managerListOwnerContext = useManagerListOwnerContext()
  const [field, meta, helpers] = useField<IManager[]>(props as any)
  useEffect(() => {
    managerListOwnerContext.reFetch()
  }, [])
  const handleSelect = (manager: IManager) => {
    if (field.value.find(i => i.id === manager.id)) {
      helpers.setValue(field.value.filter(i => i.id !== manager.id))
    } else {
      helpers.setValue([...field.value, manager])
    }
  }

  const debouncedSearchChange = debounce(async (search: InputValueType<string>) => {
    managerListOwnerContext.setFilter({...managerListOwnerContext.filter, search: search as string})
  }, 300)
  return (
    <div className={styles.root}>
          <InputField name={'search'} suffix={'search'} label={'Search'} onChange={debouncedSearchChange}/>

      <div className={styles.list}>
        {managerListOwnerContext?.data?.data?.map((manager) => <div
            className={classNames(styles.employee, {[styles.selected]: field.value.find(i => i.id === manager.id)})}
            onClick={() => handleSelect(manager)}>
            <AvatarCircular file={manager!.image} className={styles.avatar}/>
            <div className={styles.info}>
              <div className={styles.name}>{UserUtils.getName(manager)}</div>
              <div className={styles.role}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ManagerMultiField(props: Props) {
  return <ManagerListOwnerWrapper>
    <ManagerMultiFieldInner {...props}/>
  </ManagerListOwnerWrapper>
}
