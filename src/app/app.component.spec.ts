import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './core/services/auth.service';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  const mockAuthService = {
    isAuthenticated: () => false,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'pruebatecnica' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pruebatecnica');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Bienvenido a pruebatecnica'
    );
  });
  it('should return true if user is authenticated', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(authService.isAuthenticated()).toBe(true);
  });

  it('should call logout() on logout', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const authService = TestBed.inject(AuthService);
    const spyLogout = spyOn(authService, 'logout');

    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');

    button.click();

    expect(spyLogout).toHaveBeenCalled();
  });
});
