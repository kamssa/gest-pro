import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixBanqueComponent } from './choix-banque.component';

describe('ChoixBanqueComponent', () => {
  let component: ChoixBanqueComponent;
  let fixture: ComponentFixture<ChoixBanqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixBanqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
