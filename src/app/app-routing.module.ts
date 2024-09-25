import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/Blocks/header/header.component';
import { DashboardComponent } from './component/pages/dashboard/dashboard.component';
import { PagesComponent } from './component/pages/pages.component';
import { CrudComponent } from './component/pages/resumes/crud/crud.component';
import { EducationComponent } from './component/pages/resumes/forms/education/education.component';
import { HobbiesInterestActivitiesComponent } from './component/pages/resumes/forms/hobbies-interest-activities/hobbies-interest-activities.component';
import { PersonalinfoComponent } from './component/pages/resumes/forms/personalinfo/personalinfo.component';
import { WorkexpComponent } from './component/pages/resumes/forms/workexp/workexp.component';
import { SelectionComponent } from './component/pages/resumes/selection/selection.component';
import { ViewComponent } from './component/pages/resumes/view/view.component';
import { View2Component } from './component/pages/resumes/view2/view2.component';
import { UseraccessComponent } from './component/useraccess/useraccess.component';
import { AuthGuard } from './core/auth/auth.guard';


const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children : [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'selection',
        component: SelectionComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'view',
        component: ViewComponent
      },
      {
        path: 'resume/add',
        component: CrudComponent
      },
      {
        path: 'resume/edit/:id',
        component: CrudComponent
      },
      {
        path: 'view',
        component: ViewComponent
      },
      {
        path: 'view2',
        component: View2Component
      },
      {
        path: 'personalinfo',
        component: PersonalinfoComponent
      },
      {
        path: 'education',
        component: EducationComponent
      },
      {
        path: 'workexp',
        component: WorkexpComponent
      },
      {
        path: 'hobbies_interest_activities',
        component: HobbiesInterestActivitiesComponent,
      },
      {
        path: 'header',
        component: HeaderComponent,
      },
    ],
    canActivate:[AuthGuard]
  },
  {
    path:'useraccess',
    component: UseraccessComponent  
  },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
