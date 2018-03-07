import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'performance-analysis-overview',
  templateUrl: './performance-analysis-overview.component.html',
  styleUrls: ['./performance-analysis-overview.component.scss']
})
export class PerformanceAnalysisOverviewComponent implements OnInit {
  data;
  constructor(private http: HttpClient) {
    this.http.get('../../../json/churn-predictions/sample_churn_result_analysis_stats.json').subscribe((res: any) => {
      console.log(res)
      this.data = res;
    });
  }

  ngOnInit() {
  }

}
