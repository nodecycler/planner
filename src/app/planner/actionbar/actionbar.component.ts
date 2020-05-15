import {Component, OnInit} from '@angular/core';
import {SelectionFacadeService} from '../../services/selection-facade.service';
import {removeLastNode, reset} from '../../store/selection/selection.actions';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent implements OnInit {

  startingNode = null;

  constructor(private selectionFacade: SelectionFacadeService) { }

  ngOnInit() {
    this.selectionFacade.startingNode$.subscribe(node => {
      this.startingNode = node;
    });
  }

  reset() {
    this.selectionFacade.dispatch(reset());
  }
  goback() {
    this.selectionFacade.dispatch(removeLastNode());
  }
}
