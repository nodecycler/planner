import {Component, Inject, OnInit} from '@angular/core';
import {combineLatest, Subject} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {LngLatBounds, Map} from 'mapbox-gl';
import {SelectionFacadeService} from '../../services/selection-facade.service';
import {NodesFacadeService} from '../../services/nodes-facade.service';
import {addNode, createRoute} from '../../store/selection/selection.actions';
import {LOCAL_STORAGE, StorageService} from 'angular-webstorage-service';
import {Node} from '../../store/nodes/nodes.types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  nodes$;
  map: Map;
  bounds$ = new Subject<LngLatBounds>();
  startingNode: Node = null;
  lastNode: Node = null;

  selectedRoutes: {
    route: string;
    id: number;
  }[] = [];
  layerIndex = 0;
  center = [4.236673, 50.995208];

  constructor(
    private selectionFacade: SelectionFacadeService,
    private nodesFacade: NodesFacadeService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
  }

  ngOnInit() {
    const storedCenter = this.storage.get('position');
    if (storedCenter) {
      this.center = storedCenter;
    }
    this.nodes$ = combineLatest([this.nodesFacade.nodes$, this.bounds$])
      .pipe(
        debounceTime(250),
        map(([nodes, bounds]) => {
          this.storage.set('position', this.map.getCenter().toArray());
          return nodes.filter(node => bounds.contains(node.location));
        })
      );
    this.selectionFacade.startingNode$.subscribe(node => {
      this.startingNode = node;
    });
    this.selectionFacade.lastNode$.subscribe(node => {
      this.lastNode = node;
      if (node) {
        this.center = node.location;
      }
    });
    this.selectionFacade.connections$.subscribe((routes = []) => {
      this.selectedRoutes = routes.map(connection => ({
        id: this.layerIndex++,
        route: connection.route,
      }));
    });
  }

  onLoad(mapInstance: Map) {
    this.map = mapInstance;
    this.bounds$.next(mapInstance.getBounds());
  }

  onMove() {
    this.bounds$.next(this.map.getBounds());
  }

  selectNode(destination) {
    this.selectionFacade.dispatch(createRoute({destination}));
  }

  getNodeClass(id) {
    if (this.startingNode && this.startingNode.id === id) {
      return '__start';
    }
    if (this.lastNode && this.lastNode.id === id) {
      return '__last';
    }
    return '';
  }
}
