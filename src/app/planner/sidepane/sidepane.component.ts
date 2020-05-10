import {Component, OnInit} from '@angular/core';
import {SelectionFacadeService} from '../../services/selection-facade.service';

@Component({
  selector: 'app-sidepane',
  templateUrl: './sidepane.component.html',
  styleUrls: ['./sidepane.component.scss']
})
export class SidepaneComponent implements OnInit {

  startingNode = null;
  constructor(private selectionFacade: SelectionFacadeService) { }

  ngOnInit() {
    this.selectionFacade.startingNode$.subscribe(node => {
      this.startingNode = node;
    });
  }

}
