import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAchatParFactureComponent } from './dialog-achat-par-facture.component';

describe('DialogAchatParFactureComponent', () => {
  let component: DialogAchatParFactureComponent;
  let fixture: ComponentFixture<DialogAchatParFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAchatParFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAchatParFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
