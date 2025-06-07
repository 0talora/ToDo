import { TestBed } from '@angular/core/testing';

import { AdminTareasServiceService } from './admin-tareas-service.service';

describe('AdminTareasServiceService', () => {
  let service: AdminTareasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTareasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
