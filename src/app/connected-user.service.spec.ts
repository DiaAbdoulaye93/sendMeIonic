import { TestBed } from '@angular/core/testing';

import { ConnectedUserService } from './connected-user.service';

describe('ConnectedUserService', () => {
  let service: ConnectedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
