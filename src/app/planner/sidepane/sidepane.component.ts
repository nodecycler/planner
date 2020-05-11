import {Component, OnInit} from '@angular/core';
import {SelectionFacadeService} from '../../services/selection-facade.service';

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
}
