type IpLocateNames = {[key: string]: string}
export interface IIpLocate{
  city: {
    geoname_id: number
    names: IpLocateNames
  },
  continent: {
    code: string
    geoname_id: number
    names: IpLocateNames
  },
  country: {
    code: string
    geoname_id: number
    names: IpLocateNames
  }
}
