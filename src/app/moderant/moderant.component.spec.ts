import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerantComponent } from './moderant.component';

describe('ModerantComponent', () => {
  let component: ModerantComponent;
  let fixture: ComponentFixture<ModerantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModerantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
