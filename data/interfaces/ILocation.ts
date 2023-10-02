
export interface IAlternatesGeoName {
  alternatenameid: number,
  isolanguage: string,
  alternatename: string,
}

export interface IGeoName {
  geonameid: number,
  name: string,
  asciiname: string,
  alternatenames: string,
  latitude: number,
  longitude: number,
  fclass: string,
  fcode: string,
  country: string,
  timezone: null,
  locName: string,
  alternates: IAlternatesGeoName[]
}

export interface ISearchCountryResult {
  country_code: string,
  country_name: string,
  geoname: IGeoName,
  name: string
}
