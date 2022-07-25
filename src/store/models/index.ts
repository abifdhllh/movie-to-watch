import {Models} from '@rematch/core';
import {movie} from './movie';
import {home} from './home';
import {tvShow} from './tvShow';

export interface RootModel extends Models<RootModel> {
  movie: typeof movie;
  home: typeof home;
  tvShow: typeof tvShow;
}
export const models: RootModel = {movie, home, tvShow};
