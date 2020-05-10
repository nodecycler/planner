import {createAction, props} from '@ngrx/store';
import {Node} from './nodes.types';

export const fetchNodesSuccess = createAction('[Nodes] Fetch SUCCESS', props<{nodes: Node[]}>());
