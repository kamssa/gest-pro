import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTresorerieComponent } from './layout-tresorerie.component';

describe('LayoutTresorerieComponent', () => {
  let component: LayoutTresorerieComponent;
  let fixture: ComponentFixture<LayoutTresorerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutTresorerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutTresorerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
