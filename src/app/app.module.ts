import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {TodoModule} from "./todo-list/todo-list.module";
import { StoreModule } from '@ngrx/store';
import { AppState } from './state/app.state';
import { TodoReducer } from './state/todo/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/todo/todo.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TodoModule,
    StoreModule.forRoot<AppState>({
      todoState: TodoReducer
    }),
    EffectsModule.forRoot([ TodoEffects ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
