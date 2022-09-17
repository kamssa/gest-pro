import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanqueNavBarComponent } from './banque-nav-bar.component';

describe('BanqueNavBarComponent', () => {
  let component: BanqueNavBarComponent;
  let fixture: ComponentFixture<BanqueNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanqueNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanqueNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
