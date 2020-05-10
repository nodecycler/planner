import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, rootEffectsInit} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {fetchNodesSuccess} from './nodes.actions';
import {Node} from './nodes.types';

@Injectable()
export class NodesEffects {
  fetchNodes$ = createEffect(() => this.actions$.pipe(
    ofType(rootEffectsInit),
    mergeMap(() => this.http.get('./data/nodes.json').pipe(
      map((nodes: Node[]) => fetchNodesSuccess({nodes}))
    )),
  ));
  constructor(private actions$: Actions, private http: HttpClient) {}
}
