import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import {DatabaseService} from './database.service';

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule,AppRoutingModule],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
