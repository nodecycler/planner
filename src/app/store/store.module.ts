import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {metaReducers, reducers} from './index';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NodesEffects} from './nodes/nodes.effects';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgrxStoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([NodesEffects]),

  ]
})
export class StoreModule { }
