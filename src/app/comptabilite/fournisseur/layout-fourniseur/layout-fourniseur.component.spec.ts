import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFourniseurComponent } from './layout-fourniseur.component';

describe('LayoutFourniseurComponent', () => {
  let component: LayoutFourniseurComponent;
  let fixture: ComponentFixture<LayoutFourniseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutFourniseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutFourniseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
