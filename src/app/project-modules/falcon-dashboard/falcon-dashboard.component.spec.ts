import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalconDashboardComponent } from './falcon-dashboard.component';

describe('FalconDashboardComponent', () => {
  let component: FalconDashboardComponent;
  let fixture: ComponentFixture<FalconDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalconDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalconDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
