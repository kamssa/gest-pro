import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTresorerieComponent } from './list-tresorerie.component';

describe('ListTresorerieComponent', () => {
  let component: ListTresorerieComponent;
  let fixture: ComponentFixture<ListTresorerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTresorerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTresorerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
