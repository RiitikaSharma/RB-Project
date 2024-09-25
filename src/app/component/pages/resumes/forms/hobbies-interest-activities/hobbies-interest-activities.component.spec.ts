import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesInterestActivitiesComponent } from './hobbies-interest-activities.component';

describe('HobbiesInterestActivitiesComponent', () => {
  let component: HobbiesInterestActivitiesComponent;
  let fixture: ComponentFixture<HobbiesInterestActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HobbiesInterestActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbiesInterestActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
