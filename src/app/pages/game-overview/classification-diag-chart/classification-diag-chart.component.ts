import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-classification-diag-chart',
  styleUrls: ['./classification-diag-chart.component.scss'],
  template: `
    <nb-card>
      <div class="col-sm-12">
        <div class="row p-3 bb-1">
          <div class="title">classification diag chart</div>
        </div>
        <div class="row">
          <chart type="pie" [data]="data" [options]="options"></chart>
        </div>
      </div>
    </nb-card>
  `,
})
export class ClassificationDiagChartComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['X', 'Y', 'Z'],
        datasets: [{
          data: [500],
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
