import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store';

@Injectable({
  providedIn: 'root'
})
export class NodesFacadeService {
  nodes$ = this.store.select('nodes');
  constructor(private store: Store<AppState>) { }
}
