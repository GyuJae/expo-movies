export interface IMovie {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface genre {
  id: number;
  name: string;
}

interface ICreateBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path?: string;
}

interface ILastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path?: string;
  vote_average: number;
  vote_count: number;
}

interface INetworks {
  name: string;
  id: number;
  logo_path?: string;
  origin_country: string;
}

interface IProductionCompanies {
  name: string;
  id: number;
  logo_path?: string;
  origin_country: string;
}

interface IProductionCountries {
  iso_3166_1: string;
  name: string;
}
interface ISeasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface ISpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ITVDetail {
  backdrop_path?: string;
  created_by?: ICreateBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: ILastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: INetworks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  seasons: ISeasons[];
  spoken_languages: ISpokenLanguages[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface ITV {
  poster_path?: string;
  popularity: number;
  id: number;
  backdrop_path?: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}
