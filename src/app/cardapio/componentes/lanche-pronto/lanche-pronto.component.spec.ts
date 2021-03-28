import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancheProntoComponent } from './lanche-pronto.component';

describe('LancheProntoComponent', () => {
  let component: LancheProntoComponent;
  let fixture: ComponentFixture<LancheProntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancheProntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancheProntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
