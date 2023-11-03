import styles from './index.module.scss'
import { LkPageLayout } from '@/components/for_pages/Lk/components/LkLayout'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { useRef, useState } from 'react'
import { Routes } from '@/types/routes'
import { useRouter } from 'next/router'
import useInterval from 'use-interval'
import Card from '@/components/for_pages/Common/Card'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'
import CloseSvg from '@/components/svg/CloseSvg'
import ControlsStickyFooter from '@/components/for_pages/Common/ControlsStickyFooter'
import Button from '@/components/ui/Button'
import CardWithPhoto from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardWithPhoto'
import CardAiSummary from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardAiSummary'
import CardCandidateSummary from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardCandidateSummary'
import CardProfExp from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardProfExp'
import CardAiComment from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardAiComment'
import CardMatching from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardMatching'

const CandidatePage = () => {

  const [view, setView] = useState<'card' | 'row'>('card')

  const router = useRouter()

  console.log(router)

  const candidates = [
    {
      avatar: '/photos/PhotoL.png',
      experience: '6 years 3 month',
      periods: [
        {
          company:
          {
            confirmed: true,
            name: 'Pronto', specs: 'Retail, E-commerce', employees: '11-50 employees', link: '#', news: '#',
            img: ''
          },
          dates: 'Apr 2013 — May 2019', position: 'Senior Python Developer', country: 'Indonesia',
          about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.',
          skills: [{ text: 'Proficient in Java programming language' },
          { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
          { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
          { text: 'Knowledge of database management systems such as MySQL and Oracle' },
          { text: 'Experience with version control systems such as Git' },
          ]
        },
        {
          dates: 'Apr 2013 — May 2019', position: 'Senior Python Developer', country: 'Indonesia',
          about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.',
          skills: [{ text: 'Proficient in Java programming language' },
          { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
          { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
          { text: 'Knowledge of database management systems such as MySQL and Oracle' },
          { text: 'Experience with version control systems such as Git' },
          ]
        },
      ],
      firstName: 'Emily', lastName: 'Ross', salary: '$38 / hr', position: 'Senior Python Development', percent: '80%',
      status: 'Invited',
      skills: [{ text: 'Proficient in Java programming language' },
      { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
      { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
      { text: 'Knowledge of database management systems such as MySQL and Oracle' },
      { text: 'Experience with version control systems such as Git' },
      ],
      tags: [{ label: 'HTML' },
      { label: 'CSS' },
      { label: 'Java' },
      { label: 'JavaScript' },
      { label: 'Oracle' },
      { label: 'MySQL' },
      ],
      langs: [{ label: 'English — C1' },
      { label: 'Franch — B1' },
      ],
      education: 'Bachelors degree in Computer Science, 2022',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.',
      added: true, id: 1, readyToRelocate: false, country: 'Indonesia', email: 'emilly.rose1981@gmail.com', phone: '(62 361) 761 869',
      about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.'

    },
    {
      avatar: '/photos/Photo2.png',
      periods: [
        {
          dates: 'Apr 2013 — May 2019', position: 'Senior Python Developer', country: 'Indonesia',
          about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.',
          skills: [{ text: 'Proficient in Java programming language' },
          { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
          { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
          { text: 'Knowledge of database management systems such as MySQL and Oracle' },
          { text: 'Experience with version control systems such as Git' },
          ]
        }
      ],
      experience: '6 years 3 month',
      firstName: 'Lynn', lastName: 'Wolfsmith-Grandelglokershenfelder',
      salary: '$26 / hr', position: 'Senior Manager of Software Development and Engineering', percent: '80%',
      status: 'Invited',
      skills: [{ text: 'Proficient in Java programming language' },
      { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
      { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
      { text: 'Knowledge of database management systems such as MySQL and Oracle' },
      { text: 'Experience with version control systems such as Git' },
      ],
      tags: [{ label: 'HTML' },
      { label: 'CSS' },
      { label: 'Java' },
      { label: 'JavaScript' },
      { label: 'Oracle' },
      { label: 'MySQL' },
      ],
      langs: [{ label: 'English — C1' },
      { label: 'Franch — B1' },
      ],
      education: 'Bachelors degree in Computer Science, 2022',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.', id: 2,
      readyToRelocate: false, country: 'Indonesia', email: 'emilly.rose1981@gmail.com', phone: '(62 361) 761 869',
      about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.'

    },
    {
      avatar: '/photos/Photo3.png',
      periods: [
        {
          dates: 'Apr 2013 — May 2019', position: 'Senior Python Developer', country: 'Indonesia',
          about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.',
          skills: [{ text: 'Proficient in Java programming language' },
          { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
          { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
          { text: 'Knowledge of database management systems such as MySQL and Oracle' },
          { text: 'Experience with version control systems such as Git' },
          ]
        }
      ],
      experience: '6 years 3 month',
      firstName: 'Noah', lastName: 'Clark',
      salary: '$26 / hr', position: 'Middle Backend Development', percent: '80%',
      status: 'Invited',
      skills: [{ text: 'Proficient in Java programming language' },
      { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
      { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
      { text: 'Knowledge of database management systems such as MySQL and Oracle' },
      { text: 'Experience with version control systems such as Git' },
      ],
      tags: [{ label: 'HTML' },
      { label: 'CSS' },
      { label: 'Java' },
      { label: 'JavaScript' },
      { label: 'Oracle' },
      { label: 'MySQL' },
      ],
      langs: [{ label: 'English — C1' },
      { label: 'Franch — B1' },
      ],
      education: 'Bachelors degree in Computer Science, 2022',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.',
      id: 3, readyToRelocate: false, country: 'Indonesia', email: 'emilly.rose1981@gmail.com', phone: '(62 361) 761 869',
      about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.'
    },
    {
      avatar: '/photos/Photo4.png',
      periods: [
        {
          dates: 'Apr 2013 — May 2019', position: 'Senior Python Developer', country: 'Indonesia',
          about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.',
          skills: [{ text: 'Proficient in Java programming language' },
          { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
          { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
          { text: 'Knowledge of database management systems such as MySQL and Oracle' },
          { text: 'Experience with version control systems such as Git' },
          ]
        }
      ],
      experience: '6 years 3 month',
      firstName: 'Josef', lastName: 'Poletski',
      salary: '$8 / hr', position: 'Senior Python Development', percent: '80%',
      status: 'Invited',
      skills: [{ text: 'Proficient in Java programming language' },
      { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
      { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
      { text: 'Knowledge of database management systems such as MySQL and Oracle' },
      { text: 'Experience with version control systems such as Git' },
      ],
      tags: [{ label: 'HTML' },
      { label: 'CSS' },
      { label: 'Java' },
      { label: 'JavaScript' },
      { label: 'Oracle' },
      { label: 'MySQL' },
      ],
      langs: [{ label: 'English — C1' },
      { label: 'Franch — B1' },
      ],
      education: 'Bachelors degree in Computer Science, 2022',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.',
      id: 4, readyToRelocate: false, country: 'Indonesia', email: 'emilly.rose1981@gmail.com', phone: '(62 361) 761 869',
      about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.'
    },
    {
      avatar: '/photos/Photo5.png',
      periods: [
        {
          dates: 'Apr 2013 — May 2019', position: 'Senior Python Developer', country: 'Indonesia',
          about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.',
          skills: [{ text: 'Proficient in Java programming language' },
          { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
          { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
          { text: 'Knowledge of database management systems such as MySQL and Oracle' },
          { text: 'Experience with version control systems such as Git' },
          ]
        }
      ],
      experience: '6 years 3 month',
      firstName: 'Josef', lastName: 'Poletski',
      salary: '$8 / hr', position: 'Senior Python Development', percent: '80%',
      status: 'Invited',
      skills: [{ text: 'Proficient in Java programming language' },
      { text: 'Experience with Java frameworks such as Spring, Hibernate, and Struts' },
      { text: 'Familiarity with web technologies such as HTML, CSS, and JavaScript' },
      { text: 'Knowledge of database management systems such as MySQL and Oracle' },
      { text: 'Experience with version control systems such as Git' },
      ],
      tags: [{ label: 'HTML' },
      { label: 'CSS' },
      { label: 'Java' },
      { label: 'JavaScript' },
      { label: 'Oracle' },
      { label: 'MySQL' },
      ],
      langs: [{ label: 'English — C1' },
      { label: 'Franch — B1' },
      ],
      education: 'Bachelors degree in Computer Science, 2022',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.',
      id: 5, readyToRelocate: false, country: 'Indonesia', email: 'emilly.rose1981@gmail.com', phone: '(62 361) 761 869',
      about: 'I am a highly motivated Junior Java Developer with strong analytical and problem-solving skills. I have a solid understanding of Java programming language and experience in developing web applications using Java frameworks.'
    },
  ]

  const item = candidates.find(i => i.id.toString() === router.query.id)

  const [bookmark, setBookmark] = useState<boolean>(false)

  const handleBookmark = () => {

  }

  useInterval(() => {
    if (bookmark) {
      setBookmark(false)
    }
  }, 5000)

  let ref = useRef<HTMLDivElement | null>(null)

  return (
    <>
      {bookmark ?
        <Card className={styles.notification} title={''}>
          <div className={styles.inner}>
            <div className={styles.checkbox}>
              <CheckBoxSvg className={styles.check} />
            </div>
            <div className={styles.content}>
              <div className={styles.top}>
                Candidate added
              </div>
              <div className={styles.bottom}>
                You can find him on candidate<br /> base
              </div>
            </div>
            <div className={styles.closebox}>
              <CloseSvg className={styles.close} onClick={() => setBookmark(false)} color='#939393' />
            </div>
          </div>
        </Card>
        : <></>}

      <div ref={ref} className={styles.container}>
        <PageTitle title={item?.position as string} link={Routes.lkCandidatesBase} />
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <CardWithPhoto item={item} />
            <CardAiSummary className={styles.aiSum} item={item} />
          </div>
          <CardCandidateSummary item={item} />
          <CardProfExp item={item} />
          <CardAiComment item={item} />
          <CardMatching item={item} />
        </div>
        <ControlsStickyFooter btns={[
          <Button type='submit' styleType='large' color='green'>
            Send Invite
          </Button>,
          <Button className={styles.decline} styleType='large' color='white'>
            Decline
          </Button>,
          <Button className={styles.cancel} styleType='large' color='white' >
            Cancel
          </Button>
        ]} boundaryElement={`.${styles.form}`} formRef={ref} />
      </div>
    </>
  )
}
CandidatePage.getLayout = LkPageLayout
export default CandidatePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
