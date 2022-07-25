export type NowPlaying = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export type NowPlayingResponse = {
  page: number;
  results: NowPlaying[];
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
};

export type Upcoming = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export type UpcomingResponse = {
  page: number;
  results: Upcoming[];
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
};

export type Popular = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  name?: string;
  original_name?: string;
};

export type PopularResponse = {
  page: number;
  results: Popular[];
  total_pages: number;
  total_results: number;
};

export type TopRated = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  name?: string;
  original_name?: string;
};

export type TopRatedResponse = {
  page: number;
  results: TopRated[];
  total_pages: number;
  total_results: number;
};

export type AiringToday = {
  poster_path: string;
  overview: string;
  genre_ids: Array<number>;
  id: number;
  original_name: string;
  original_language: string;
  name: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  first_air_date: string;
  origin_country: Array<string>;
};

export type AiringTodayResponse = {
  page: number;
  results: AiringToday[];
  total_pages: number;
  total_results: number;
};

export type OnTheAir = {
  poster_path: string;
  overview: string;
  genre_ids: Array<number>;
  id: number;
  original_name: string;
  original_language: string;
  name: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  first_air_date: string;
  origin_country: Array<string>;
};

export type OnTheAirResponse = {
  page: number;
  results: OnTheAir[];
  total_pages: number;
  total_results: number;
};

export type Trending = {
  adult: boolean;
  poster_path: string;
  overview: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  name: string;
  original_name: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  first_air_date: string;
  origin_country: Array<string>;
};

export type TrendingResponse = {
  page: number;
  results: Trending[];
  total_pages: number;
  total_results: number;
};

export type MovieDetail = {
  adult: false;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Array<{id: number; name: string}>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{iso_3166_1: string; name: string}>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    iso_639_1: string;
    name: string;
    english_name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type MovieCreditResponse = {
  id: number;
  cast: Array<Cast>;
  crew: Array<Crew>;
};

export type PersonDetail = {
  birthday: string;
  known_for_department: string;
  deathday: string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: string;
};

export type TVShowDetail = {
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  next_episode_to_air: string;
  networks: {
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  };
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type MediaList = {
  poster_path: string;
  name?: string;
  title?: string;
  vote_average: number;
  id: number;
  media_type: string;
  popularity: number;
  isBookmarked?: boolean;
};

export type MediaListReponse = {
  page: number;
  results: MediaList[];
  total_pages: number;
  total_results: number;
};
