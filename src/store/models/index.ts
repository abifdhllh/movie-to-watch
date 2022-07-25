import {Models} from '@rematch/core';
import {movie} from './movie';
import {home} from './home';
export interface RootModel extends Models<RootModel> {
  movie: typeof movie;
  home: typeof home;
}
export const models: RootModel = {movie, home};
