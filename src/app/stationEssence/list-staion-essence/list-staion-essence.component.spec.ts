import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStaionEssenceComponent } from './list-staion-essence.component';

describe('ListStaionEssenceComponent', () => {
  let component: ListStaionEssenceComponent;
  let fixture: ComponentFixture<ListStaionEssenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStaionEssenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStaionEssenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
