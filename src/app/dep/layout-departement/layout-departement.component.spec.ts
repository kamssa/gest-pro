import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDepartementComponent } from './layout-departement.component';

describe('LayoutDepartementComponent', () => {
  let component: LayoutDepartementComponent;
  let fixture: ComponentFixture<LayoutDepartementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDepartementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
