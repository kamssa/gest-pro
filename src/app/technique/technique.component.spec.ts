import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TechniqueComponent } from './technique.component';

describe('TechniqueComponent', () => {
  let component: TechniqueComponent;
  let fixture: ComponentFixture<TechniqueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
