import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanchePersonalizadoComponent } from './lanche-personalizado.component';

describe('LanchePersonalizadoComponent', () => {
  let component: LanchePersonalizadoComponent;
  let fixture: ComponentFixture<LanchePersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanchePersonalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanchePersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
