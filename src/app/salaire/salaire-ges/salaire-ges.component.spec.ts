import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalaireGesComponent } from './salaire-ges.component';

describe('SalaireGesComponent', () => {
  let component: SalaireGesComponent;
  let fixture: ComponentFixture<SalaireGesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireGesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireGesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
