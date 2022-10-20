import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAchatParFactureComponent } from './list-achat-par-facture.component';

describe('ListAchatParFactureComponent', () => {
  let component: ListAchatParFactureComponent;
  let fixture: ComponentFixture<ListAchatParFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAchatParFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAchatParFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
