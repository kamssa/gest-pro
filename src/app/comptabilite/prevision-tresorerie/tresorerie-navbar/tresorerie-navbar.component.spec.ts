import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TresorerieNavbarComponent } from './tresorerie-navbar.component';

describe('TresorerieNavbarComponent', () => {
  let component: TresorerieNavbarComponent;
  let fixture: ComponentFixture<TresorerieNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TresorerieNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TresorerieNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
