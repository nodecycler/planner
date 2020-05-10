import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store';
import {NodesFacadeService} from './nodes-facade.service';
import {map, withLatestFrom} from 'rxjs/operators';
import {Node} from '../store/nodes/nodes.types';

@Injectable({
  providedIn: 'root'
})
export class SelectionFacadeService {
  public selectedNodes$ = this.store.select('selection').pipe(
    withLatestFrom(this.nodesFacade.nodes$),
    map(([ids, nodes]) => {
      return ids.map(id => nodes.find((node: Node) => node.id));
    })
  );
  public startingNode$ = this.selectedNodes$.pipe(
    map(nodes => nodes.length > 0 ? nodes[0] : null)
  );

  constructor(private store: Store<AppState>, private nodesFacade: NodesFacadeService) {
  }

  dispatch(action) {
    return this.store.dispatch(action);
  }
}
