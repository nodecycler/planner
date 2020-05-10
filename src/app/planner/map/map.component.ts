import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, Subject} from 'rxjs';
import {debounceTime, map, tap} from 'rxjs/operators';
import {Node, NodeConnection} from '../../store/nodes/nodes.types';
import {booleanContains} from '@turf/turf';
import {LngLatBounds, Map} from 'mapbox-gl';
import {SelectionFacadeService} from '../../services/selection-facade.service';
import {NodesFacadeService} from '../../services/nodes-facade.service';
import {addNode} from '../../store/selection/selection.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  nodes$;
  map: Map;
  bounds$ = new Subject<LngLatBounds>();
  nodesClickable = true;
  connections: NodeConnection[] = [];

  constructor(private selectionFacade: SelectionFacadeService, private nodesFacade: NodesFacadeService) { }

  ngOnInit() {
    this.nodes$ = combineLatest([this.nodesFacade.nodes$, this.bounds$])
      .pipe(
        debounceTime(250),
        map(([nodes, bounds]) => {
          return nodes.filter(node => bounds.contains(node.location));
        })
      );
    this.selectionFacade.startingNode$.subscribe(node => {
      this.nodesClickable = !node;
    });
    this.selectionFacade.lastNode$.subscribe(node => {
      this.connections = node ? node.connections : [];
    });
  }

  onLoad(mapInstance: Map) {
    this.map = mapInstance;
    this.bounds$.next(mapInstance.getBounds());
  }
  onMove() {
    this.bounds$.next(this.map.getBounds());
  }
  selectNode(node) {
    this.selectionFacade.dispatch(addNode({node}));
  }
  isClickable(id) {
    return this.nodesClickable || !!this.connections.find(connection => connection.id === id)
  }
}
