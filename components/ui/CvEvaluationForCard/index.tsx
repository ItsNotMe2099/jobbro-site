import styles from './index.module.scss'
import classNames from 'classnames'
import Spinner from '@/components/ui/Spinner'
import {useMemo} from 'react'
import {Nullable} from '@/types/types'


interface Props {
  className?: string
  evaluation: number | undefined | null
}

export default function CvEvaluationForCard(props: Props) {
  const isLoading = typeof props.evaluation === 'undefined' || props.evaluation == null
  const className = useMemo<Nullable<string>>(() => {
    if(typeof props.evaluation === 'undefined' || props.evaluation == null){
      return null
    }else if(props.evaluation >= 65){
      return styles.green
    }else if(props.evaluation >=30){
      return styles.yellow
    }else{
      return styles.red
    }
  }, [props.evaluation])
  return (<div className={classNames(styles.root,props.className, {[styles.loaded]: !isLoading, ...(className ? {[className]: true} : {})})}>
    {!isLoading && <div className={styles.number}>{props.evaluation}%</div>}
    {isLoading && <Spinner size={24}/>}
  </div>)
}

