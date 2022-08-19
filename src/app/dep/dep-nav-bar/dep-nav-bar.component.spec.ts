import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepNavBarComponent } from './dep-nav-bar.component';

describe('DepNavBarComponent', () => {
  let component: DepNavBarComponent;
  let fixture: ComponentFixture<DepNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
