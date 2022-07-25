import {createModel} from '@rematch/core';
import {RootModel} from '@store/models';
import {
  apiGetCredit,
  apiGetCustomMediaList,
  apiGetMovieDetail,
  apiGetMultiSearch,
  apiGetPersonDetail,
} from '@utils/api';
import {AxiosResponse} from 'axios';
import {
  MovieDetail,
  MovieCreditResponse,
  Cast,
  PersonDetail,
  MediaListReponse,
  MediaList,
} from '../types';

export const movie = createModel<RootModel>()({
  state: {
    list: {page: 0} as MediaListReponse | {page: number},
    loadingList: true,
    errorList: false,
    detail: {} as MovieDetail,
    loadingDetail: true,
    errorDetail: false,
    cast: [] as Cast[],
    loadingCast: true,
    errorCast: false,
    castDetail: {} as PersonDetail,
    loadingCastDetail: true,
    errorCastDetail: true,
    searchResult: {page: 0} as MediaListReponse | {page: number},
    loadingSearchResult: true,
    errorSearchResult: false,
    watchList: [] as MediaList[],
  },
  reducers: {
    getMovieListRequest(state, isInitial?: boolean) {
      return {
        ...state,
        list: isInitial ? {page: 0} : state.list,
        loadingList: true,
        errorList: false,
      };
    },
    getMovieListSuccess(state, payload: MediaListReponse) {
      return {
        ...state,
        list: {
          ...payload,
          results:
            payload.page > 1
              ? [
                  ...(state.list as MediaListReponse).results,
                  ...payload.results,
                ]
              : payload.results,
        },
        loadingList: false,
      };
    },
    getMovieListFailure(state) {
      return {
        ...state,
        errorList: true,
        loadingList: false,
      };
    },
    getMovieDetailRequest(state) {
      return {
        ...state,
        loadingDetail: true,
        errorDetail: false,
      };
    },
    getMovieDetailSuccess(state, payload: MovieDetail) {
      return {
        ...state,
        detail: payload,
        loadingDetail: false,
      };
    },
    getMovieDetailFailure(state) {
      return {
        ...state,
        errorDetail: true,
        loadingDetail: false,
      };
    },
    getMainCastRequest(state) {
      return {
        ...state,
        loadingCast: true,
        errorCast: false,
      };
    },
    getMainCastSuccess(state, payload: Cast[]) {
      return {
        ...state,
        cast: payload,
        loadingCast: false,
      };
    },
    getMainCastFailure(state) {
      return {
        ...state,
        errorCast: true,
        loadingCast: false,
      };
    },
    getCastDetailRequest(state) {
      return {
        ...state,
        loadingCastDetail: true,
        errorCastDetail: false,
      };
    },
    getCastDetailSuccess(state, payload: PersonDetail) {
      return {
        ...state,
        castDetail: payload,
        loadingCastDetail: false,
      };
    },
    getCastDetailFailure(state) {
      return {
        ...state,
        errorCastDetail: true,
        loadingCastDetail: false,
      };
    },
    getSearchResultRequest(state, isInitial?: boolean) {
      return {
        ...state,
        searchResult: isInitial ? {page: 0} : state.searchResult,
        loadingSearchResult: true,
        errorSearchResult: false,
      };
    },
    getSearchResultSuccess(state, payload: MediaListReponse) {
      return {
        ...state,
        searchResult: {
          ...payload,
          results:
            payload.page > 1
              ? [
                  ...(state.searchResult as MediaListReponse).results,
                  ...payload.results,
                ]
              : payload.results,
        },
        loadingSearchResult: false,
      };
    },
    getSearchResultFailure(state) {
      return {
        ...state,
        errorSearchResult: true,
        loadingSearchResult: false,
      };
    },
    setWatchListData(state, watchList: any) {
      return {
        ...state,
        watchList: [...state.watchList, watchList],
      };
    },
    removeWatchListData(state, id: any) {
      const filteredWatchList = state.watchList?.filter(item => item.id !== id);
      return {
        ...state,
        watchList: filteredWatchList,
      };
    },
  },
  effects: dispatch => ({
    async getMovieList(
      {customUrl, isInitial}: {customUrl: string; isInitial?: boolean},
      state,
    ) {
      dispatch.movie.getMovieListRequest(isInitial);
      const response = (await apiGetCustomMediaList(
        customUrl,
        isInitial ? 1 : state.movie.list.page + 1,
      )) as AxiosResponse<MediaListReponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.movie.getMovieListSuccess(response.data);
      } else {
        dispatch.movie.getMovieListFailure();
      }
    },
    async getMovieDetail(movieId: number) {
      dispatch.movie.getMovieDetailRequest();
      const response = (await apiGetMovieDetail(
        movieId,
      )) as AxiosResponse<MovieDetail>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.movie.getMovieDetailSuccess(response.data);
      } else {
        dispatch.movie.getMovieDetailFailure();
      }
    },
    async getMainCast({
      mediaId,
      mediaType,
    }: {
      mediaId: number;
      mediaType: string;
    }) {
      dispatch.movie.getMainCastRequest();
      const response = (await apiGetCredit(
        mediaId,
        mediaType,
      )) as AxiosResponse<MovieCreditResponse>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.movie.getMainCastSuccess(response.data.cast);
      } else {
        dispatch.movie.getMainCastFailure();
      }
    },
    async getCastDetail(personId: number) {
      dispatch.movie.getCastDetailRequest();
      const response = (await apiGetPersonDetail(
        personId,
      )) as AxiosResponse<PersonDetail>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.movie.getCastDetailSuccess(response.data);
      } else {
        dispatch.movie.getCastDetailFailure();
      }
    },
    async getSearchResult(
      {searchValue, isInitial}: {searchValue: string; isInitial?: boolean},
      state,
    ) {
      dispatch.movie.getSearchResultRequest(isInitial);
      const response = (await apiGetMultiSearch(
        searchValue,
        isInitial ? 1 : state.movie.searchResult.page + 1,
      )) as AxiosResponse<MediaListReponse>;

      // @ts-ignore
      response.data.results = response.data?.results?.filter(
        item => item.media_type !== 'person',
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch.movie.getSearchResultSuccess(response.data);
      } else {
        dispatch.movie.getSearchResultFailure();
      }
    },
  }),
});
