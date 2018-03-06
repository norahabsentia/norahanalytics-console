import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbColorHelper, NbThemeService} from "@nebular/theme";
import {LocalDataSource} from "ng2-smart-table";
import {DataService} from "../../@core/data/getcountrydata.service";
import {SmartTableService} from "../../@core/data/smart-table.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'churn-predictions',
  templateUrl: './churn-predictions.component.html',
  styleUrls: ['./churn-predictions.component.scss']
})
export class ChurnPredictionsComponent implements OnInit, OnDestroy {

  charts = [
    {
      type: 'Table',
      icon: 'fa-table',
      show: false,
      label: 'Display table',
    },
    {
      type: 'Histogram',
      icon: 'fa-bar-chart',
      show: true,
      label: 'Display stacked bar',
    },
  ];
  dataBar1Options = this.charts[1];
  dataBar2Options = this.charts[1];
  dataTable1 = []
  dataTable2 = []
  data: any;
  options: any;
  themeSubscription: any;
  dataBar1: any;
  dataBar2: any;
  optionsBar: any;
  showDownload;
  showEngagement;
  showLocation;
  selectedLocation = "country";
  selectedEngagement = "current level";
  dataLocation= [
    {name: 'country'},
    {name: 'region'},
    {name: 'affluence'},
    {name: 'mobile brand'},
    {name: 'platform'},
    {name: 'app version'},
  ];
  dataEngagement = [
    {name: 'current level'},
    {name: 'engagement'},
    {name: 'total time in game'},
    {name: 'last action'},
    {name: 'level stickiness'},
    {name: 'loyalty'},
    {name: 'out of lives'},
  ];

  objEngagement = {
    'current level': {
      url: 'new2_currentlevel-aggr-format',
      lab: 'currentlevel'
    },
    'engagement': {
      url: 'new2_engagement-aggr-format',
      lab: 'Engagement'
    },
    'total time in game': {
      url: 'new2_Total time in game-aggr-format',
      lab: 'Total time in game'
    },
    'last action': {
      url: 'new2_lastaction-aggr-format',
      lab: 'LastAction'
    },
    'level stickiness': {
      url: 'new2_levelstickness-aggr-format',
      lab: 'Levelstickness'
    },
    'loyalty': {
      url: 'new2_Loyality-aggr-format',
      lab: 'Loyality'
    },
    'out of lives': {
      url: 'new2_out of lives-aggr-format',
      lab: 'Out of lives'
    },
  };

  objLocation = {
    'country': {
      url: 'new2_country-aggr-format',
      lab: 'country'
    },
    'region': {
      url: 'new2_region-aggr-format',
      lab: 'Region'
    },
    'affluence': {
      url: 'new2_afluance-aggr-format',
      lab: 'Affluence'
    },
    'mobile brand': {
      url: 'new2_mobiles-aggr-format',
      lab: 'Mobile'
    },
    'platform': {
      url: 'new2_platform-aggr-format',
      lab: 'Platform'
    },
    'app version': {
      url: 'new2_appversion-aggr-format',
      lab: 'AppVersion'
    },
  };

  clickLocation(item){
    this.selectedLocation = item.name;
    this.showLocation = false;
    this.dataBar1 = null;
    this.dataTable1 = null;

    this.http.get('../../../json/churn-predictions/basis of origin/' + this.objLocation[item.name].url +'.json').subscribe((res: any) => {
      this.setData('dataBar1', res[this.objLocation[item.name].lab]);
      this.dataTable1 = res[this.objLocation[item.name].lab];
    });
  }
  clickEngagement(item){
    this.selectedEngagement = item.name;
    this.showEngagement = false;
    this.dataBar2 = null;
    this.dataTable2 = null;
    this.http.get('../../../json/churn-predictions/basis of behavior/' + this.objEngagement[item.name].url +'.json').subscribe((res: any) => {
      this.setData('dataBar2', res[this.objEngagement[item.name].lab]);
      this.dataTable2 = res[this.objEngagement[item.name].lab];

    });

  }

  changeUserDistribution(item){
    this.dataBar1Options = item;
    console.log(item)
  }

  changeUserDistribution2(item){
    this.dataBar2Options = item;

    console.log(item)
  }

  settings = {
    hideSubHeader: false,
    actions: false,
    columns: {
      ProductID: {
        title: 'User ID',
        type: 'number',
        editable: false,
        filter: false,
        width: '50%'
      },
      AndroidBase: {
        title: 'Churn Probability',
        type: 'string',
        editable: false,
        filter: false,
        width: '50%'
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public tabledata: any


  constructor(private theme: NbThemeService, private service: SmartTableService, public dataservice: DataService, private http: HttpClient) {

    const data = this.service.getData();
    this.source.load(data);

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        // labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
        datasets: [{
          data: [300, 500, 100],
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
        // legend: {
        //   labels: {
        //     fontColor: chartjs.textColor,
        //   },
        // },
      };

      let barOptions = {
        animation: {
          duration: 10,
        },
        tooltips: {
          mode: 'label',
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: { display: false },
          }],
          yAxes: [{
            stacked: true,

          }],
        }, // scales
        legend: {display: true}
      }

      this.http.get('../../../json/churn-predictions/basis of origin/new2_country-aggr-format.json').subscribe((res: any) => {
        this.setData('dataBar1', res.country);
        this.dataTable1 = res.country;
      });
      // this.setData('dataBar2');

      this.http.get('../../../json/churn-predictions/basis of behavior/new2_currentlevel-aggr-format.json').subscribe((res: any) => {
        this.setData('dataBar2', res['currentlevel']);
        this.dataTable2 = res.currentlevel;
      });
      this.optionsBar = barOptions;
    });
  }

  ngOnInit(){
    this.getDataFromJson()

  }

  setData(i, data){
    let labels = [];
    let High_Risk = [];
    let Medium_Risk = [];
    let Low_Risk = [];
    for(let item of data){
      labels.push(item.value);
      High_Risk.push(item.High_Risk);
      Medium_Risk.push(item.Medium_Risk);
      Low_Risk.push(item.Low_Risk);
    }

    this[i] = {
      labels: labels,
      datasets: [
        {
          label: 'high risk',
          data: High_Risk,
          backgroundColor: "#4aa3df",
          hoverBackgroundColor: "#4aa3df",
          hoverBorderWidth: 2,
          hoverBorderColor: 'lightgrey'
        },
        {
          label: 'medium risk',
          data: Medium_Risk,
          backgroundColor: "#81b7dc",
          hoverBackgroundColor: "#81b7dc",
          hoverBorderWidth: 2,
          hoverBorderColor: 'lightgrey'
        },
        {
          label: 'low risk',
          data: Low_Risk,
          backgroundColor: "#bcbabe",
          hoverBackgroundColor: "#bcbabe",
          hoverBorderWidth: 2,
          hoverBorderColor: 'lightgrey'
        }
      ],
    };
  }

  getDataFromJson() {
    this.dataservice.getData().subscribe((data) => {
      this.tabledata = data.data;
    });

  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
