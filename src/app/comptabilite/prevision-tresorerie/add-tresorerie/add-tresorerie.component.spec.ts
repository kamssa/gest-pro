import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTresorerieComponent } from './add-tresorerie.component';

describe('AddTresorerieComponent', () => {
  let component: AddTresorerieComponent;
  let fixture: ComponentFixture<AddTresorerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTresorerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTresorerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
