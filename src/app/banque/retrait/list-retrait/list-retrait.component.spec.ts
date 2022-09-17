import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRetraitComponent } from './list-retrait.component';

describe('ListRetraitComponent', () => {
  let component: ListRetraitComponent;
  let fixture: ComponentFixture<ListRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRetraitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
