import {Component, OnInit} from '@angular/core';
import {SelectionFacadeService} from '../../services/selection-facade.service';
import {removeLastNode, reset} from '../../store/selection/selection.actions';

@Component({
  selector: 'app-sidepane',
  templateUrl: './sidepane.component.html',
  styleUrls: ['./sidepane.component.scss']
})
export class SidepaneComponent implements OnInit {

  startingNode = null;
  selectedNodes = [];
  constructor(private selectionFacade: SelectionFacadeService) { }

  ngOnInit() {
    this.selectionFacade.startingNode$.subscribe(node => {
      this.startingNode = node;
    });
    this.selectionFacade.selectedNodes$.subscribe(nodes => {
      this.selectedNodes = nodes;
    });
  }

  get connections() {
    const connections = [];
    for (let i = 1; i < this.selectedNodes.length; i++) {
      const previousNode = this.selectedNodes[i - 1];
      const node = this.selectedNodes[i];
      connections.push(previousNode.connections.find(connection => connection.id === node.id));
    }
    return connections;
  }
  formatDistance(distance) {
    if (distance > 1000) {
      return `${Math.round(distance / 100) / 10} km`;
    }
    return `${Math.round(distance)} m`;

  }
  get total() {
    let total = 0;
    this.connections.forEach(connection => {
      total += connection.distance;
    });
    return this.formatDistance(total);
  }
  reset() {
    this.selectionFacade.dispatch(reset());
  }
  goback() {
    this.selectionFacade.dispatch(removeLastNode());
  }
}
