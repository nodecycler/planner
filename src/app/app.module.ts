import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PlannerModule} from './planner/planner.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
