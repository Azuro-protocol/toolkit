export type FavoriteSport = {
  sportId: number
  slug: string
  name: string
}

export type FavoriteCountryRef = {
  id: string
  slug: string
  name: string
}

export type FavoriteCountry = {
  id: string
  favoritesId: string
  slug: string
  name: string
  sport: FavoriteSport
}

export type FavoriteLeague = {
  id: string
  favoritesId: string
  slug: string
  name: string
  country: FavoriteCountryRef
  sport: FavoriteSport
}

export type Favorites = {
  countries: FavoriteCountry[]
  leagues: FavoriteLeague[]
}
