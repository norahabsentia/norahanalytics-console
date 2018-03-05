import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GameOverviewComponent} from './game-overview/game-overview.component';
import {ChurnPredictionsComponent} from "./churn-predictions/churn-predictions.component";
import {PerformanceAnalysisUserBehaviorBasisComponent} from "./retention-booster/user-churn/performance-analysis/performance-analysis-user-behavior-basis/performance-analysis-user-behavior-basis.component";
import {PerformanceAnalysisOverviewComponent} from "./retention-booster/user-churn/performance-analysis/performance-analysis-overview/performance-analysis-overview.component";
import {PerformanceAnalysisUserOriginBasisComponent} from "./retention-booster/user-churn/performance-analysis/performance-analysis-user-origin-basis/performance-analysis-user-origin-basis.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'filler-library',
    loadChildren: './filler-library/filler-library.module#FillerLibraryModule',
  },{
    path: 'norah-scheduler',
    loadChildren: './norah-scheduler/norah-scheduler.module#NorahSchedulerModule',
  }, 
  {
      path: 'notificationslist',
      loadChildren: './notifications/notificationlist.module#NotificationlistModule',
  },{
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  },{
    path: 'smart-pricing',
    loadChildren: './smart-pricing/smart-pricing.module#SmartPricingModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  },
    {
      path: 'retention-booster/user-churn/performance-analysis/performance-analysis-user-behavior-basis',
      component: PerformanceAnalysisUserBehaviorBasisComponent,
    },
    {
      path: 'retention-booster/user-churn/performance-analysis/performance-analysis-overview',
      component: PerformanceAnalysisOverviewComponent,
    },
    {
      path: 'retention-booster/user-churn/performance-analysis/performance-analysis-user-origin-basis',
      component: PerformanceAnalysisUserOriginBasisComponent,
    },
    {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: 'game-overview',
    component: GameOverviewComponent,
  }, {
    path: 'churn-predictions',
    component: ChurnPredictionsComponent,
  },{
    path: 'game-overview',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
