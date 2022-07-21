import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjetComponent } from './all-projet.component';

describe('AllProjetComponent', () => {
  let component: AllProjetComponent;
  let fixture: ComponentFixture<AllProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
