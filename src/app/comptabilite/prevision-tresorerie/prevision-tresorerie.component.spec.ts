import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisionTresorerieComponent } from './prevision-tresorerie.component';

describe('PrevisionTresorerieComponent', () => {
  let component: PrevisionTresorerieComponent;
  let fixture: ComponentFixture<PrevisionTresorerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevisionTresorerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisionTresorerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
