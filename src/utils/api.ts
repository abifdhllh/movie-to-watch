import axios from 'axios';
import {LANGUAGE, TMDB_API_KEY, TMDB_BASE_URL} from './constant';

// Initiate Base URL
const api = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 5000,
});

const defaultParams = {
  api_key: TMDB_API_KEY,
  language: LANGUAGE.EN,
  page: 1,
};

// API Request List
export const apiGetNowPlayingMovies = (params: any) =>
  api.get('/movie/now_playing', {
    params: {
      ...defaultParams,
      ...params,
    },
  });

export const apiGetUpcomingMovies = (params: any) =>
  api.get('/movie/upcoming', {
    params: {
      ...defaultParams,
      ...params,
    },
  });

export const apiGetPopularMovies = (params: any) =>
  api.get('/movie/popular', {
    params: {
      ...defaultParams,
      ...params,
    },
  });

export const apiGetTopRatedMovies = (params: any) =>
  api.get('/movie/top_rated', {
    params: {
      ...defaultParams,
      ...params,
    },
  });

export const apiGetAiringTodayTVShow = (params: any) =>
  api.get('/tv/airing_today', {
    params: {
      ...defaultParams,
      ...params,
    },
  });

export const apiGetOnTheAirTVShow = (params: any) =>
  api.get('/tv/on_the_air', {
    params: {
      ...defaultParams,
      ...params,
    },
  });

export const apiGetPopularTVShow = (params: any) =>
  api.get('/tv/popular', {
    params: {
      ...defaultParams,
      ...params,
    },
  });

export const apiGetTopRatedTVShow = (params: any) =>
  api.get('/tv/top_rated', {
    params: {
      ...defaultParams,
      ...params,
    },
  });

export const apiGetTrending = (mediaType: string) =>
  api.get(`/trending/${mediaType}/week`, {
    params: {
      ...defaultParams,
    },
  });

export const apiGetMovieDetail = (movieId: number) =>
  api.get(`/movie/${movieId}`, {
    params: {
      ...defaultParams,
    },
  });

export const apiGetCredit = (movieId: number, mediaType: string) =>
  api.get(`/${mediaType}/${movieId}/credits`, {
    params: {
      ...defaultParams,
    },
  });

export const apiGetPersonDetail = (personId: number) =>
  api.get(`/person/${personId}`, {
    params: {
      ...defaultParams,
    },
  });

export const apiGetTVShowDetail = (tvId: number) =>
  api.get(`/tv/${tvId}`, {
    params: {
      ...defaultParams,
    },
  });

export const apiGetCustomMediaList = (customUrl: string, page: number) =>
  api.get(customUrl, {
    params: {
      ...defaultParams,
      page,
    },
  });
