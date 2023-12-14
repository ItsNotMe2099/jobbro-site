import classNames from 'classnames'
import styles from './index.module.scss'

interface Props {
  children?: JSX.Element
  type?: 'cards'|'list'

}

export default function Card(props: Props) {

  return (<div className={classNames(styles.root, props.type&&styles[props.type])}>
    {props.children}
  </div>)
}