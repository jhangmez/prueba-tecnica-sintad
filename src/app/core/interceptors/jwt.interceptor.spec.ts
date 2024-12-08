import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { jwtInterceptor } from './jwt.interceptor';
import { AuthService } from '../services/auth.service';

describe('jwtInterceptor', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;
  const mockToken = 'test-token';

  beforeEach(() => {
    const mockAuthService = {
      getToken: () => mockToken,
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: jwtInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  it('should add an Authorization header if a token exists', () => {
    const next: any = {
      handle: (req: HttpRequest<any>) => {
        return of(null);
      },
    };

    const req = new HttpRequest('GET', '/test');

    const interceptor = new jwtInterceptor(authService);
    interceptor.intercept(req, next).subscribe();

    const testRequest = httpMock.expectOne('/test');
  });

  it('should not add an Authorization header if a token does not exist', () => {
    const mockAuthService = {
      getToken: () => null,
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: jwtInterceptor,
          multi: true,
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    const next: any = {
      handle: (req: HttpRequest<any>) => {
        return of(null);
      },
    };

    const req = new HttpRequest('GET', '/test');
    const interceptor = new jwtInterceptor(authService);
    interceptor.intercept(req, next).subscribe();
  });
});
