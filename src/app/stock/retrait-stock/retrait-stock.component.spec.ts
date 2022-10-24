import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitStockComponent } from './retrait-stock.component';

describe('RetraitStockComponent', () => {
  let component: RetraitStockComponent;
  let fixture: ComponentFixture<RetraitStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetraitStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetraitStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
