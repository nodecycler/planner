import {Action, createReducer, on} from '@ngrx/store';
import * as Actions from './selection.actions';

const reducer = createReducer(
  [],
  on(Actions.reset, state => ([])),
  on(Actions.addNode, (state, action) => ([...state, action.node])),
  on(Actions.removeLastNode, (state) => ([...state.splice(0, state.length - 1)])),
);

export function selectionReducer(state = [], action: Action) {
  return reducer(state, action);
}
