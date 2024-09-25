import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PluginsModule } from './module/plugins.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { ComponentModule } from './module/component.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
// import { MydirectiveDirective } from './direcitves/mydirective.directive';
// import { PersonalinfoComponent } from './component/pages/resumes/forms/personalinfo/personalinfo.component';
// import { ObjectiveComponent } from './component/pages/resumes/forms/objective/objective.component';
// import { EducationComponent } from './component/pages/resumes/forms/education/education.component';
// import { WorkexpComponent } from './component/pages/resumes/forms/workexp/workexp.component';
// import { SkillsComponent } from './component/pages/resumes/forms/skills/skills.component';
// import { HobbiesInterestActivitiesComponent } from './component/pages/resumes/forms/hobbies-interest-activities/hobbies-interest-activities.component';
// import { ReferencesComponent } from './component/pages/resumes/forms/references/references.component';



@NgModule({
  declarations: [
    AppComponent,
    
    // MydirectiveDirective,
    // PersonalinfoComponent,
    // ObjectiveComponent,
    // EducationComponent,
    // WorkexpComponent,
    // SkillsComponent,
    // HobbiesInterestActivitiesComponent,
    // ReferencesComponent,
  
  ],
  imports: [
    BrowserModule,
    PluginsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentModule,
    HttpClientModule,
    LayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
