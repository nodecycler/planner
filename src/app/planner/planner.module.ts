import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlannerComponent} from './planner.component';
import {MapComponent} from './map/map.component';
import {SidepaneComponent} from './sidepane/sidepane.component';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '../store/store.module';


@NgModule({
  declarations: [PlannerComponent, MapComponent, SidepaneComponent],
  exports: [
    PlannerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoid2ViYmVyaWciLCJhIjoiY2s4cmFzYjFnMDFhMTNlcGVldzQxZGw1diJ9.TqIpoD7cCQNa6_QaZRZr5Q'
    }),
    StoreModule,
  ]
})
export class PlannerModule {
}
