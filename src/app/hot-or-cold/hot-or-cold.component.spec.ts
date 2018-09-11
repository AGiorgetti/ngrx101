import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotOrColdComponent } from './hot-or-cold.component';

describe('HotOrColdComponent', () => {
  let component: HotOrColdComponent;
  let fixture: ComponentFixture<HotOrColdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotOrColdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotOrColdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
