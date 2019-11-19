import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanningBoardComponent } from './planning-board/planning-board.component';

const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  { path: '', component: PlanningBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
