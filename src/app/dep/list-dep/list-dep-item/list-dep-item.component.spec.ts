import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepItemComponent } from './list-dep-item.component';

describe('ListDepItemComponent', () => {
  let component: ListDepItemComponent;
  let fixture: ComponentFixture<ListDepItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDepItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDepItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
