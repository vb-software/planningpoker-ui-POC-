import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../planning.service';
import { User } from '../models/user';

@Component({
  selector: 'app-planning-board',
  templateUrl: './planning-board.component.html',
  styleUrls: ['./planning-board.component.scss']
})
export class PlanningBoardComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: ''
  };
  users: Array<User> = [];
  showScores: boolean;

  constructor(private planningService: PlanningService) { }

  ngOnInit() {
    this.planningService.userJoined.subscribe(res => {
      console.log(res);
      this.users.push(res);
    });
  }

  onSubmit() {
    console.log(this.user);
    this.planningService.addUserToPlanning(this.user);
  }

  onToggleScores() {
    console.table(this.users);
    this.showScores = !this.showScores;
    console.log(this.showScores)
  }

}
