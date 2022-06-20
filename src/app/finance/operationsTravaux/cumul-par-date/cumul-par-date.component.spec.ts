import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulParDateComponent } from './cumul-par-date.component';

describe('CumulParDateComponent', () => {
  let component: CumulParDateComponent;
  let fixture: ComponentFixture<CumulParDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulParDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulParDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
