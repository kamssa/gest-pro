import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeProjetComponent } from './edite-projet.component';

describe('EditeProjetComponent', () => {
  let component: EditeProjetComponent;
  let fixture: ComponentFixture<EditeProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
