import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailTechComponent } from './detail-tech.component';

describe('DetailTechComponent', () => {
  let component: DetailTechComponent;
  let fixture: ComponentFixture<DetailTechComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
