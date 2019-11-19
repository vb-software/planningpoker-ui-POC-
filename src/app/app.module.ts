import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanningService } from './planning.service';
import { PlanningBoardComponent } from './planning-board/planning-board.component';

@NgModule({
  declarations: [AppComponent, PlanningBoardComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [PlanningService],
  bootstrap: [AppComponent]
})
export class AppModule {}
