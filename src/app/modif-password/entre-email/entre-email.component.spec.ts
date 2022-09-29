import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreEmailComponent } from './entre-email.component';

describe('EntreEmailComponent', () => {
  let component: EntreEmailComponent;
  let fixture: ComponentFixture<EntreEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntreEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntreEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
