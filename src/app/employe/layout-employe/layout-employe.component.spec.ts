import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEmployeComponent } from './layout-employe.component';

describe('LayoutEmployeComponent', () => {
  let component: LayoutEmployeComponent;
  let fixture: ComponentFixture<LayoutEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
