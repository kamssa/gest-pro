import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailSiteTravauxComponent } from './detail-site-travaux.component';

describe('DetailSiteTravauxComponent', () => {
  let component: DetailSiteTravauxComponent;
  let fixture: ComponentFixture<DetailSiteTravauxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSiteTravauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSiteTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
