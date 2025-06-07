import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasComponentComponent } from './tareas-component.component';

describe('TareasComponentComponent', () => {
  let component: TareasComponentComponent;
  let fixture: ComponentFixture<TareasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
