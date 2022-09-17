import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVersementComponent } from './list-versement.component';

describe('ListVersementComponent', () => {
  let component: ListVersementComponent;
  let fixture: ComponentFixture<ListVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVersementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
