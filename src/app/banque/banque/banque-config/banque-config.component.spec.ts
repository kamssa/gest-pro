import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanqueConfigComponent } from './banque-config.component';

describe('BanqueConfigComponent', () => {
  let component: BanqueConfigComponent;
  let fixture: ComponentFixture<BanqueConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanqueConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanqueConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
