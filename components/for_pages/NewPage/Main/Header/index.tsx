import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputSearch from '@/components/ui/InputSearch'

interface Props {

}

export default function Header(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <InputSearch
            searchRequest={() => null}
            placeholder='Profession, position or company'
            searchIcon
          />
        </Card>
        <div className={styles.bottom}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.number}>
                41 975
              </div>
              <div className={styles.name}>
                Summary
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.number}>
                641 975
              </div>
              <div className={styles.name}>
                Vacancies
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.number}>
                10 612
              </div>
              <div className={styles.name}>
                Companies
              </div>
            </div>
          </div>
          <div className={styles.btns}>
            <Button className={styles.btn} styleType='large' color='white'>
              Post a CV
            </Button>
            <div className={styles.or}>Or</div>
            <Button className={styles.btn} styleType='large' color='white'>
              Post a vacancy
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}
