import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {selectionReducer} from './selection/selection.reducer';
import {nodesReducer} from './nodes/nodes.reducer';
import {Node} from './nodes/nodes.types';

export interface AppState {
  selection: string[];
  nodes: Node[];
}

export const reducers: ActionReducerMap<AppState> = {
  selection: selectionReducer,
  nodes: nodesReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
