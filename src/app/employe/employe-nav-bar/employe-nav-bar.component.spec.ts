import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeNavBarComponent } from './employe-nav-bar.component';

describe('EmployeNavBarComponent', () => {
  let component: EmployeNavBarComponent;
  let fixture: ComponentFixture<EmployeNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
