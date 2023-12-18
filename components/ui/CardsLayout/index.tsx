import Card from './Card'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  type?: 'cards'|'list'
  children?: JSX.Element[]
  className?: string

}


/**
 * @type ?: 'cards'|'list'
 * @children ?: JSX.Element[]
 * @className ?: string
 */
export default function CardsLayout(props: Props) {

  return (<div className={classNames(styles.root, props.className, props.type&&styles[props.type])}> 
    {props.children && props.children.map((item, index) => {
      return <Card type={props.type} key={index}>
        {item}
      </Card>
    })}
  </div>)
}