import { TestBed } from '@angular/core/testing';

import { ProgramTourService } from './program-tour.service';

describe('ProgramTourService', () => {
  let service: ProgramTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
