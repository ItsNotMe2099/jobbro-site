import {FavoriteEntityType} from '@/data/enum/FavoriteEntityType'

export type FavoriteStoreType = {[entityType in FavoriteEntityType]: number[]}
