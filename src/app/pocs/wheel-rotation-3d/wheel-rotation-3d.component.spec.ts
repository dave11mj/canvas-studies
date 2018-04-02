import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelRotation3dComponent } from './wheel-rotation-3d.component';

describe('WheelRotation3dComponent', () => {
  let component: WheelRotation3dComponent;
  let fixture: ComponentFixture<WheelRotation3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheelRotation3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelRotation3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
