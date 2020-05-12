import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store';
import {NodesFacadeService} from './nodes-facade.service';
import {map, tap, withLatestFrom} from 'rxjs/operators';
import {Node} from '../store/nodes/nodes.types';

@Injectable({
  providedIn: 'root'
})
export class SelectionFacadeService {
  public selectedNodes$ = this.store.select('selection').pipe(
    withLatestFrom(this.nodesFacade.nodes$),
    map(([ids, nodes]) => {
      return ids.map(id => nodes.find((node: Node) => id === node.id));
    }),
  );
  public startingNode$ = this.selectedNodes$.pipe(
    map(nodes => nodes.length > 0 ? nodes[0] : null)
  );
  public lastNode$ = this.selectedNodes$.pipe(
    map(nodes => nodes.length > 0 ? nodes[nodes.length - 1] : null),
  );

  public connections$ = this.selectedNodes$.pipe(
    map(nodes => {
      const connections = [];
      for (let i = 1; i < nodes.length; i++) {
        const previousNode = nodes[i - 1];
        const node = nodes[i];
        connections.push(previousNode.connections.find(connection => connection.id === node.id));
      }
      return connections;
    })
  );

  constructor(private store: Store<AppState>, private nodesFacade: NodesFacadeService) {
  }

  dispatch(action) {
    return this.store.dispatch(action);
  }

}
