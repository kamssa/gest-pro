import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaionEssenceComponent } from './staion-essence.component';

describe('StaionEssenceComponent', () => {
  let component: StaionEssenceComponent;
  let fixture: ComponentFixture<StaionEssenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaionEssenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaionEssenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
