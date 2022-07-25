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
