import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceVerCancionesComponent } from './interface-ver-canciones.component';

describe('InterfaceVerCancionesComponent', () => {
  let component: InterfaceVerCancionesComponent;
  let fixture: ComponentFixture<InterfaceVerCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfaceVerCancionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfaceVerCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
