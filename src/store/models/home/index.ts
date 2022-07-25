import {AxiosResponse} from 'axios';
import {createModel} from '@rematch/core';
import {RootModel} from '@store/models';
import {
  apiGetNowPlayingMovies,
  apiGetUpcomingMovies,
  apiGetPopularMovies,
  apiGetTopRatedMovies,
  apiGetAiringTodayTVShow,
  apiGetOnTheAirTVShow,
  apiGetPopularTVShow,
  apiGetTopRatedTVShow,
  apiGetTrending,
} from '@utils/api';
import {
  NowPlayingResponse,
  NowPlaying,
  Upcoming,
  UpcomingResponse,
  Popular,
  PopularResponse,
  TopRated,
  TopRatedResponse,
  AiringToday,
  AiringTodayResponse,
  OnTheAir,
  OnTheAirResponse,
  Trending,
  TrendingResponse,
} from '@store/models/types';

export const home = createModel<RootModel>()({
  state: {
    movies: {
      nowPlaying: [] as NowPlaying[],
      upcoming: [] as Upcoming[],
      popular: [] as Popular[],
      topRated: [] as TopRated[],
      trending: [] as Trending[],
      loadingNowPlaying: true,
      loadingUpcoming: true,
      loadingPopular: true,
      loadingTopRated: true,
      loadingTrending: true,
    },
    tvShow: {
      airingToday: [] as AiringToday[],
      onTheAir: [] as OnTheAir[],
      popular: [] as Popular[],
      topRated: [] as TopRated[],
      trending: [] as Trending[],
      loadingAiringToday: true,
      loadingOnTheAir: true,
      loadingPopular: true,
      loadingTopRated: true,
      loadingTrending: true,
    },
  },
  reducers: {
    // Movies Reducer
    getTrendingMoviesRequest(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingTrending: true,
        },
      };
    },
    getTrendingMoviesSuccess(state, payload: TrendingResponse) {
      return {
        ...state,
        movies: {
          ...state.movies,
          trending: payload.results,
          loadingTrending: false,
        },
      };
    },
    getTrendingMoviesFailure(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingTrending: false,
        },
      };
    },
    getNowPlayingMoviesRequest(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingNowPlaying: true,
        },
      };
    },
    getNowPlayingMoviesSuccess(state, payload: NowPlayingResponse) {
      return {
        ...state,
        movies: {
          ...state.movies,
          nowPlaying: payload.results,
          loadingNowPlaying: false,
        },
      };
    },
    getNowPlayingMoviesFailure(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingNowPlaying: false,
        },
      };
    },
    getUpcomingMoviesRequest(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingUpcoming: true,
        },
      };
    },
    getUpcomingMoviesSuccess(state, payload: UpcomingResponse) {
      return {
        ...state,
        movies: {
          ...state.movies,
          upcoming: payload.results,
          loadingUpcoming: false,
        },
      };
    },
    getUpcomingMoviesFailure(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingUpcoming: false,
        },
      };
    },
    getPopularMoviesRequest(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingPopular: true,
        },
      };
    },
    getPopularMoviesSuccess(state, payload: PopularResponse) {
      return {
        ...state,
        movies: {
          ...state.movies,
          popular: payload.results,
          loadingPopular: false,
        },
      };
    },
    getPopularMoviesFailure(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingPopular: false,
        },
      };
    },
    getTopRatedMoviesRequest(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingTopRated: true,
        },
      };
    },
    getTopRatedMoviesSuccess(state, payload: TopRatedResponse) {
      return {
        ...state,
        movies: {
          ...state.movies,
          topRated: payload.results,
          loadingTopRated: false,
        },
      };
    },
    getTopRatedMoviesFailure(state) {
      return {
        ...state,
        movies: {
          ...state.movies,
          loadingTopRated: false,
        },
      };
    },

    // TV Show Reducer
    getTrendingTVShowRequest(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingTrending: true,
        },
      };
    },
    getTrendingTVShowSuccess(state, payload: TrendingResponse) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          trending: payload.results,
          loadingTrending: false,
        },
      };
    },
    getTrendingTVShowFailure(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingTrending: false,
        },
      };
    },
    getAiringTodayTVShowRequest(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingAiringToday: true,
        },
      };
    },
    getAiringTodayTVShowSuccess(state, payload: AiringTodayResponse) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          airingToday: payload.results,
          loadingAiringToday: false,
        },
      };
    },
    getAiringTodayTVShowFailure(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingAiringToday: false,
        },
      };
    },
    getOnTheAirTVShowRequest(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingOnTheAir: true,
        },
      };
    },
    getOnTheAirTVShowSuccess(state, payload: OnTheAirResponse) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          onTheAir: payload.results,
          loadingOnTheAir: false,
        },
      };
    },
    getOnTheAirTVShowFailure(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingOnTheAir: false,
        },
      };
    },
    getPopularTVShowRequest(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingPopular: true,
        },
      };
    },
    getPopularTVShowSuccess(state, payload: PopularResponse) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          popular: payload.results,
          loadingPopular: false,
        },
      };
    },
    getPopularTVShowFailure(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingPopular: false,
        },
      };
    },
    getTopRatedTVShowRequest(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingTopRated: true,
        },
      };
    },
    getTopRatedTVShowSuccess(state, payload: TopRatedResponse) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          topRated: payload.results,
          loadingTopRated: false,
        },
      };
    },
    getTopRatedTVShowFailure(state) {
      return {
        ...state,
        tvShow: {
          ...state.tvShow,
          loadingTopRated: false,
        },
      };
    },
  },
  effects: dispatch => ({
    // Action Movies
    async getTrendingMovies(mediaType: string) {
      dispatch.home.getTrendingMoviesRequest();
      const response = (await apiGetTrending(
        mediaType,
      )) as AxiosResponse<TrendingResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getTrendingMoviesSuccess(response.data);
      } else {
        dispatch.home.getTrendingMoviesFailure();
      }
    },
    async getNowPlayingMovies(payload?: number) {
      dispatch.home.getNowPlayingMoviesRequest();
      const response = (await apiGetNowPlayingMovies(
        payload,
      )) as AxiosResponse<NowPlayingResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getNowPlayingMoviesSuccess(response.data);
      } else {
        dispatch.home.getNowPlayingMoviesFailure();
      }
    },
    async getUpcomingMovies(payload?: number) {
      dispatch.home.getUpcomingMoviesRequest();
      const response = (await apiGetUpcomingMovies(
        payload,
      )) as AxiosResponse<UpcomingResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getUpcomingMoviesSuccess(response.data);
      } else {
        dispatch.home.getUpcomingMoviesFailure();
      }
    },
    async getPopularMovies(payload?: number) {
      dispatch.home.getPopularMoviesRequest();
      const response = (await apiGetPopularMovies(
        payload,
      )) as AxiosResponse<PopularResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getPopularMoviesSuccess(response.data);
      } else {
        dispatch.home.getPopularMoviesFailure();
      }
    },
    async getTopRatedMovies(payload?: number) {
      dispatch.home.getTopRatedMoviesRequest();
      const response = (await apiGetTopRatedMovies(
        payload,
      )) as AxiosResponse<TopRatedResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getTopRatedMoviesSuccess(response.data);
      } else {
        dispatch.home.getTopRatedMoviesFailure();
      }
    },

    // Action TV Show
    async getTrendingTVShow(mediaType: string) {
      dispatch.home.getTrendingTVShowRequest();
      const response = (await apiGetTrending(
        mediaType,
      )) as AxiosResponse<TrendingResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getTrendingTVShowSuccess(response.data);
      } else {
        dispatch.home.getTrendingTVShowFailure();
      }
    },
    async getAiringTodayTVShow(payload?: number) {
      dispatch.home.getAiringTodayTVShowRequest();
      const response = (await apiGetAiringTodayTVShow(
        payload,
      )) as AxiosResponse<AiringTodayResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getAiringTodayTVShowSuccess(response.data);
      } else {
        dispatch.home.getAiringTodayTVShowFailure();
      }
    },
    async getOnTheAirTVShow(payload?: number) {
      dispatch.home.getOnTheAirTVShowRequest();
      const response = (await apiGetOnTheAirTVShow(
        payload,
      )) as AxiosResponse<OnTheAirResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getOnTheAirTVShowSuccess(response.data);
      } else {
        dispatch.home.getOnTheAirTVShowFailure();
      }
    },
    async getPopularTVShow(payload?: number) {
      dispatch.home.getPopularTVShowRequest();
      const response = (await apiGetPopularTVShow(
        payload,
      )) as AxiosResponse<PopularResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getPopularTVShowSuccess(response.data);
      } else {
        dispatch.home.getPopularTVShowFailure();
      }
    },
    async getTopRatedTVShow(payload?: number) {
      dispatch.home.getTopRatedTVShowRequest();
      const response = (await apiGetTopRatedTVShow(
        payload,
      )) as AxiosResponse<TopRatedResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.home.getTopRatedTVShowSuccess(response.data);
      } else {
        dispatch.home.getTopRatedTVShowFailure();
      }
    },
  }),
});
