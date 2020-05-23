import {createAction, props} from '@ngrx/store';

export const addNode = createAction('[Selection] Add node', props<{node: string}>());
export const reset = createAction('[Selection] Reset');
export const removeLastNode = createAction('[Selection] Remove last node');
export const createRoute = createAction('[Selection] Create route', props<{destination: string}>());
