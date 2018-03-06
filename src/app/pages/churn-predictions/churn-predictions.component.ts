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

  // dataSet1 =  {
  //   'platform' : null,
  //   'app version': null
  // };

  dataSet1 = [];
  dataSet2 = [];
  dataSet3 = [];
  dataSet4 = [];
  dataSet5 = [];

  dataBarData1 = [];
  dataBarData2 = [];
  dataTable1 = [];
  dataTable2 = [];
  dataTable3 = [];
  dataTable4 = [];
  dataTable5 = [];

  dataBarData1Options = this.charts[1];
  dataBarData2Options = this.charts[1];
  dataBarData3Options = this.charts[1];
  dataBarData4Options = this.charts[1];
  dataBarData5Options = this.charts[1];



  dataBar1Options = this.charts[1];
  dataBar2Options = this.charts[1];
  dataBar3Options = this.charts[1];
  dataBar4Options = this.charts[1];
  dataBar5Options = this.charts[1];


  data: any;
  options: any;
  themeSubscription: any;
  dataBar1: any;
  dataBar2: any;
  dataBar3: any;
  dataBar4: any;
  dataBar5: any;

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
      lab: 'currentlevel',
      display: 'Level'
    },
    'engagement': {
      url: 'new2_engagement-aggr-format',
      lab: 'Engagement',
      display: 'Engagement'
    },
    'total time in game': {
      url: 'new2_Total time in game-aggr-format',
      lab: 'Total time in game',
      display: 'Total time'
    },
    'last action': {
      url: 'new2_lastaction-aggr-format',
      lab: 'LastAction',
      display: 'Last Action'
    },
    'level stickiness': {
      url: 'new2_levelstickness-aggr-format',
      lab: 'Levelstickness',
      display: 'Stuck at level'
    },
    'loyalty': {
      url: 'new2_Loyality-aggr-format',
      lab: 'Loyality',
      display: 'Loyality'
    },
    'out of lives': {
      url: 'new2_out of lives-aggr-format',
      lab: 'Out of lives',
      display: 'Out of lives'
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

  changeTabData1(item) {
    console.log(item);
    this.dataBarData1Options = item;
  }

  changeTabData2(item) {
    this.dataBarData2Options = item;
  }

  changeTabData3(item) {
    this.dataBarData3Options = item;
  }

  changeTabData4(item) {
    this.dataBarData4Options = item;
  }

  changeTabData5(item) {
    this.dataBarData5Options = item;
  }

  clickLocation(item){
    // console.log('item',item)
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
    pager: false,
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

  changeTab1(e) {
    let name = e.tabTitle.toLowerCase();
    if(name == 'appversion') {
      name = "app version";
    }
    this.http.get('../../../json/churn-predictions/basis of origin/' + this.objLocation[name].url + '.json').subscribe((res: any) => {
      this.setData('dataBarData1', res[this.objLocation[name].lab]);
      this.dataTable1 = res[this.objLocation[name].lab];
    });
  }

  changeTab2(e) {
    let name = e.tabTitle.toLowerCase();
    if (name == 'mobile') {
      name = "mobile brand";
    }
    this.http.get('../../../json/churn-predictions/basis of origin/' + this.objLocation[name].url + '.json').subscribe((res: any) => {
      this.setData('dataBarData2', res[this.objLocation[name].lab]);
      this.dataTable2 = res[this.objLocation[name].lab];
    });
  }

  changeTab3(e) {
    let name = e.tabTitle.toLowerCase();
    console.log(e)
    if (name == 'loyality') {
      name = "loyalty";
    }
    this.http.get('../../../json/churn-predictions/basis of behavior/' + this.objEngagement[name].url + '.json').subscribe((res: any) => {
      this.setData('dataBarData3', res[this.objEngagement[name].lab]);
      this.dataTable3 = res[this.objEngagement[name].lab];
      console.log(this.dataTable3);
    });
  }

  changeTab4(e) {
    let name = e.tabTitle.toLowerCase();
    console.log(e)
    if (name == 'total time') {
      name = "total time in game";
    }
    if (name == 'stuck at level') {
      name = "level stickiness";
    }
    this.http.get('../../../json/churn-predictions/basis of behavior/' + this.objEngagement[name].url + '.json').subscribe((res: any) => {
      this.setData('dataBarData4', res[this.objEngagement[name].lab]);
      this.dataTable4 = res[this.objEngagement[name].lab];
      console.log(this.dataTable3);
    });
  }

  changeTab5(e) {
    let name = e.tabTitle.toLowerCase();
    console.log(e)
    if (name == 'level') {
      name = "current level";
    }

    this.http.get('../../../json/churn-predictions/basis of behavior/' + this.objEngagement[name].url + '.json').subscribe((res: any) => {
      this.setData('dataBarData5', res[this.objEngagement[name].lab]);
      this.dataTable5 = res[this.objEngagement[name].lab];
      console.log(this.dataTable3);
    });
  }

  constructor(private theme: NbThemeService, private service: SmartTableService, public dataservice: DataService, private http: HttpClient) {

    const data = this.service.getData();
    this.source.load(data);

    //dataSet1
    this.dataSet1.push(this.objLocation.platform);
    this.dataSet1.push(this.objLocation["app version"]);

    // dataSet2
    this.dataSet2.push(this.objLocation.country);
    this.dataSet2.push(this.objLocation.region);
    this.dataSet2.push(this.objLocation.affluence);
    this.dataSet2.push(this.objLocation["mobile brand"]);

    // dataSet3
    this.dataSet3.push(this.objEngagement.engagement);
    this.dataSet3.push(this.objEngagement.loyalty);

    //dataSet4
    this.dataSet4.push(this.objEngagement["total time in game"]);
    this.dataSet4.push(this.objEngagement["out of lives"]);
    this.dataSet4.push(this.objEngagement["level stickiness"]);

    //dataSet5
    this.dataSet5.push(this.objEngagement["current level"]);

    this.http.get('../../../json/churn-predictions/basis of origin/new2_platform-aggr-format.json').subscribe((res: any) => {
      console.log(res)
      this.setData('dataBarData1', res.Platform);
      this.dataTable1 = res.Platform;
    });
    

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
