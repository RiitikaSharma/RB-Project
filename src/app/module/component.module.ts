import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../component/Blocks/header/header.component';
import { FooterComponent } from '../component/Blocks/footer/footer.component';
import { UseraccessComponent } from '../component/useraccess/useraccess.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagesComponent } from '../component/pages/pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from '../component/pages/dashboard/dashboard.component';
import { CrudComponent } from '../component/pages/resumes/crud/crud.component';
import { ViewComponent } from '../component/pages/resumes/view/view.component';
import { PersonalinfoComponent } from '../component/pages/resumes/forms/personalinfo/personalinfo.component';
import { EducationComponent } from '../component/pages/resumes/forms/education/education.component';
import { WorkexpComponent } from '../component/pages/resumes/forms/workexp/workexp.component';
import { HobbiesInterestActivitiesComponent } from '../component/pages/resumes/forms/hobbies-interest-activities/hobbies-interest-activities.component';
import { MaterialModule } from './material.module';
import { View2Component } from '../component/pages/resumes/view2/view2.component';
import { SelectionComponent } from '../component/pages/resumes/selection/selection.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PagesComponent,
    UseraccessComponent,
    DashboardComponent,
    CrudComponent,
    ViewComponent,
    PersonalinfoComponent,
    EducationComponent,
    WorkexpComponent,
    HobbiesInterestActivitiesComponent,
    View2Component,
    SelectionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class ComponentModule {
  
 }
