import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatParFactureComponent } from './achat-par-facture.component';

describe('AchatParFactureComponent', () => {
  let component: AchatParFactureComponent;
  let fixture: ComponentFixture<AchatParFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchatParFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchatParFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
