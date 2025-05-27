import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancionInterfaceComponent } from './cancion-interface.component';

describe('CancionInterfaceComponent', () => {
  let component: CancionInterfaceComponent;
  let fixture: ComponentFixture<CancionInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancionInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancionInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
