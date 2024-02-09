import { ImageResponse } from 'next/server'
import {IVacancy} from '@/data/interfaces/IVacancy'
import VacancyUtils from '@/utils/VacancyUtils'
import {IVacancyShareSettings} from '@/data/interfaces/IVacancyShareSettings'
interface IVacancyWidthShareSettings extends  IVacancy{
  shareSettings: IVacancyShareSettings
}
export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  const vacancy = await fetch(
    `https://jobbro.dev.firelabs.ru/api/vacancy/${id}?forShareImage=true`,
    { next: { revalidate: 0 } }
  ).then((res) => res.json() as Promise<IVacancyWidthShareSettings>)
  console.log('Vacancy', vacancy)
  const salary = VacancyUtils.formatSalary(vacancy)
  const location = [vacancy.office?.country?.name, vacancy.office?.city?.name]
    .filter((i) => !!i)
    .join(', ')
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: vacancy.shareSettings?.backgroundColor ?? '#EBEBEB'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '80px',
            lineHeight: '62px',
            flexDirection: 'column',
            padding: '0 82px',
          }}
        >
          <div style={{ display: 'flex', fontSize: '20px', lineHeight: '20px', fontWeight: 700}}>
            {vacancy.company.name}
          </div>
          <div style={{ display: 'flex', fontSize: '32px', fontWeight: 700, marginTop: '32px', lineHeight: '32px' }}>
            {vacancy.name}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '16px', fontSize: '20px', lineHeight: '20px', fontWeight: 700 }}>
            {salary ?? ''}
            {!!location && !!salary && <div style={{width: '8px', height: '8px', borderRadius: '8px', backgroundColor: '#3C3C3C', marginLeft: '16px', marginRight: '16px'}}></div> }
            {location ?? ''}
          </div>
          <div style={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', borderRadius: '8px', backgroundColor: '#24B563', color: '#ffffff',fontSize: '16px', fontWeight: 500, marginTop: '32px', lineHeight: '46px', height: '46px', paddingLeft: '32px', paddingRight: '32px' }}>
            Apply now
          </div>
          <div style={{ display: 'flex', alignSelf: 'flex-end', fontSize: '16px', fontWeight: 700, marginTop: '72px', lineHeight: '16px' }}>
            We Hire with Jobbro
          </div>
        </div>
      </div>
    )
  )
}
