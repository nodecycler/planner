import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {first, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {addNode, createRoute} from './selection.actions';
import {NodesFacadeService} from '../../services/nodes-facade.service';
import {SelectionFacadeService} from '../../services/selection-facade.service';
import {EMPTY, NEVER, of} from 'rxjs';
import {distance} from '@turf/turf';

@Injectable()
export class SelectionEffects {
  calculateRoute$ = createEffect(() => this.actions$.pipe(
    ofType(createRoute),
    withLatestFrom(this.selectionFacade.lastNode$),
    mergeMap(([{destination}, lastNode]) => {
      if (!lastNode) {
        return of(addNode({node: destination}));
      }
      if (lastNode.id === destination) {
        return NEVER;
      }
      return this.nodesFacades.nodes$.pipe(
        first(),
        switchMap(nodes => {
          let lastStep = lastNode;
          const destinationNode = nodes.find(node => node.id === destination);
          const steps = [];
          while (lastStep.id !== destination) {
            const candidateNodes = lastStep.connections
              .filter(connection => !steps.includes(connection.id))
              .map(connection => {
                const node = nodes.find(item => item.id === connection.id);
                const distanceToDestination = distance(node.location, destinationNode.location);
                return {node, distanceToDestination};
              })
              .sort((a, b) => a.distanceToDestination - b.distanceToDestination);

            const closestNode = candidateNodes.shift().node;
            steps.push(closestNode.id);
            lastStep = closestNode;
          }
          return steps.map(node => addNode({node}));
        })
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private nodesFacades: NodesFacadeService,
    private selectionFacade: SelectionFacadeService,
  ) {
  }
}
