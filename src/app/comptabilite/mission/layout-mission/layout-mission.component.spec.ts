import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMissionComponent } from './layout-mission.component';

describe('LayoutMissionComponent', () => {
  let component: LayoutMissionComponent;
  let fixture: ComponentFixture<LayoutMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
