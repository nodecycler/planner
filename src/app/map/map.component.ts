import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, Subject} from 'rxjs';
import {debounceTime, map, tap} from 'rxjs/operators';
import {Node} from '../nodes.types';
import {booleanContains} from '@turf/turf';
import {LngLatBounds, Map} from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  nodes$;
  map: Map;
  bounds$ = new Subject<LngLatBounds>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.nodes$ = combineLatest([this.http.get("/data/nodes.json") as Observable<Node[]>, this.bounds$])
      .pipe(
        debounceTime(250),
        map(([nodes, bounds]) => {
          return nodes.filter(node => bounds.contains(node.location));
        })
      );
  }

  onLoad(mapInstance: Map) {
    this.map = mapInstance;
    this.bounds$.next(mapInstance.getBounds());
  }
  onMove() {
    this.bounds$.next(this.map.getBounds());
  }
}
