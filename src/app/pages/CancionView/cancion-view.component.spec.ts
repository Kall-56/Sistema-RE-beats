import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancionViewComponent } from './cancion-view.component';

describe('CancionViewComponent', () => {
  let component: CancionViewComponent;
  let fixture: ComponentFixture<CancionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
