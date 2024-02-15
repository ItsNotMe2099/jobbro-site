import request from 'utils/request'
export enum EntityViewType {
  Vacancy = 'vacancy'
}
export default class EntityViewRepository {



  static async track(entityType: EntityViewType, id: number): Promise<null> {
    const res = await request({
      method: 'post',
      url: `/api/entity-view/${id}/track`,
      data:{
        entityType, id
      }

    })
    if(res.err) {
      return null
    }
    return null
  }


}
