import {createModel} from '@rematch/core';
import {RootModel} from '@store/models';
import {apiGetTVShowDetail} from '@utils/api';
import {AxiosResponse} from 'axios';
import {TVShowDetail} from '../types';

export const tvShow = createModel<RootModel>()({
  state: {
    detail: {} as TVShowDetail,
    loadingDetail: true,
    errorDetail: false,
  },
  reducers: {
    getTVShowDetailRequest(state) {
      return {
        ...state,
        loadingDetail: true,
        errorDetail: false,
      };
    },
    getTVShowDetailSuccess(state, payload: TVShowDetail) {
      return {
        ...state,
        detail: payload,
        loadingDetail: false,
      };
    },
    getTVShowDetailFailure(state) {
      return {
        ...state,
        errorDetail: true,
        loadingDetail: false,
      };
    },
  },
  effects: dispatch => ({
    async getTVShowDetail(movieId: number) {
      dispatch.tvShow.getTVShowDetailRequest();
      const response = (await apiGetTVShowDetail(
        movieId,
      )) as AxiosResponse<TVShowDetail>;

      if (response.status >= 200 && response.status < 300) {
        dispatch.tvShow.getTVShowDetailSuccess(response.data);
      } else {
        dispatch.tvShow.getTVShowDetailFailure();
      }
    },
  }),
});
