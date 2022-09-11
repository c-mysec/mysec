import { TestBed } from '@angular/core/testing';

import { CloudSessionService } from './cloud-session.service';

describe('CloudSessionService', () => {
  let service: CloudSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
