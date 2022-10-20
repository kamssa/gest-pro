import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAchatParFactureComponent } from './edit-achat-par-facture.component';

describe('EditAchatParFactureComponent', () => {
  let component: EditAchatParFactureComponent;
  let fixture: ComponentFixture<EditAchatParFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAchatParFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAchatParFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
