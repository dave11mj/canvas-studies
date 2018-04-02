import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelRotationComponent } from './wheel-rotation.component';

describe('WheelRotationComponent', () => {
  let component: WheelRotationComponent;
  let fixture: ComponentFixture<WheelRotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheelRotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelRotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
