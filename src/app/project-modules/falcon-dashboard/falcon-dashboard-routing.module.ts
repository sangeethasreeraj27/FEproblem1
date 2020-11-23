import { ResultComponent } from './components/result/result.component';
import { FalconDashboardComponent } from './falcon-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DescriptionComponent } from './components/description/description.component';
import { TaskComponent } from './components/task/task.component';
import { FindComponent } from './components/find/find.component';

const routes: Routes = [
  {
    path: '',
    component: FalconDashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'describe',
        component: DescriptionComponent
      },
      {
        path: 'task',
        component: TaskComponent
      },
      {
        path: 'find',
        component: FindComponent
      },
      {
        path: 'result',
        component: ResultComponent
      },
      {
        path: '',
        redirectTo: '/home', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FalconDashboardRoutingModule { }
