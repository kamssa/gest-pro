import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionNavBarComponent } from './mission-nav-bar.component';

describe('MissionNavBarComponent', () => {
  let component: MissionNavBarComponent;
  let fixture: ComponentFixture<MissionNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
