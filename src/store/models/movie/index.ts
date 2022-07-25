import {createModel} from '@rematch/core';
import {RootModel} from '@store/models';
import {apiGetMovieDetail} from '@utils/api';
import {AxiosResponse} from 'axios';
import {MovieDetail} from '../types';

export const movie = createModel<RootModel>()({
  state: {
    detail: {} as MovieDetail,
    loadingDetail: true,
    errorDetail: false,
  },
  reducers: {
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
  },
  effects: dispatch => ({
    async getMovieDetail(payload: number) {
      dispatch.movie.getMovieDetailRequest();
      const response = (await apiGetMovieDetail(
        payload,
      )) as AxiosResponse<MovieDetail>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.movie.getMovieDetailSuccess(response.data);
      } else {
        dispatch.movie.getMovieDetailFailure();
      }
    },
  }),
});
