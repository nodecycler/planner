import {Action, createReducer, on} from '@ngrx/store';
import * as Actions from './nodes.actions';

const reducer = createReducer(
  [],
  on(Actions.fetchNodesSuccess, (state, {nodes}) => nodes),
);

export function nodesReducer(state = [], action: Action) {
  return reducer(state, action);
}
