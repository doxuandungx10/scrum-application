import { TestBed } from '@angular/core/testing';

import { SprintbacklogService } from './sprintbacklog.service';

describe('SprintbacklogService', () => {
  let service: SprintbacklogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintbacklogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
