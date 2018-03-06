import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'performance-analysis-user-behavior-basis',
  templateUrl: './performance-analysis-user-behavior-basis.component.html',
  styleUrls: ['./performance-analysis-user-behavior-basis.component.scss']
})
export class PerformanceAnalysisUserBehaviorBasisComponent implements OnInit {
  currentlevel;
  lastAction;
  engagement;
  totalGame;
  userSkill;
  Out_of_Lives;
  LevelStickiness;
  Loyalty_Index;
  Platform;
  constructor(private http: HttpClient) {

    this.http.get('../../../json/new/editednew_currentlevel-aggr-format.json').subscribe((data: any) => {
      this.currentlevel = data.currentlevel;
      console.log(data.currentlevel)
    });
    this.http.get('../../../json/new/editednew_lastaction-aggr-format.json').subscribe((data: any) => {
      this.lastAction = data.LastAction;
      console.log(data.LastAction)
    });
    this.http.get('../../../json/new/editednew_engagement-aggr-format.json').subscribe((data: any) => {
      this.engagement = data.Engagement;
      console.log(data.Engagement)
    });
    this.http.get('../../../json/new/editednew_Total time in game-aggr-format.json').subscribe((data: any) => {
      this.totalGame = data['Total time in game'];
      console.log(data.Total_time_spent_in_Game)
    });
    // this.http.get('../../../json/User_Skill-aggr-format.json').subscribe((data: any) => {
    this.http.get('../../../json/new/editednew_skill-aggr-format.json').subscribe((data: any) => {
      this.userSkill = data.skill;
      console.log(data.skill)
    });
    this.http.get('../../../json/new/editednew_out of lives-aggr-format.json').subscribe((data: any) => {
      this.Out_of_Lives = data.Engagement;
      console.log(data.Engagement)
    });
    this.http.get('../../../json/new/editednew_levelstickness-aggr-format.json').subscribe((data: any) => {
      this.LevelStickiness = data['Levelstickness'];
      console.log(data['Level Stickiness'])
    });
    // this.http.get('../../../json/Loyalty_Index-aggr-format.json').subscribe((data: any) => {
    this.http.get('../../../json/new/editednew_Loyality-aggr-format.json').subscribe((data: any) => {
      this.Loyalty_Index = data.Loyality;
      console.log(data.Loyalty_Index)
    });
    this.http.get('../../../json/new/editednew_out of lives-aggr-format.json').subscribe((data: any) => {
      this.Out_of_Lives = data.Out_of_Lives;
      console.log(data.Out_of_Lives)
    });
  }

  ngOnInit() {
  }

}
