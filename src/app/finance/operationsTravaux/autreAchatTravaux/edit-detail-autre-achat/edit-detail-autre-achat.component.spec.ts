import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailAutreAchatComponent } from './edit-detail-autre-achat.component';

describe('EditDetailAutreAchatComponent', () => {
  let component: EditDetailAutreAchatComponent;
  let fixture: ComponentFixture<EditDetailAutreAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailAutreAchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDetailAutreAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
