import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatError,
  MatFormField,
  MatIcon,
  MatInput,
  MatLabel,
  MatSuffix,
  MaterialModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-GIXJQKS3.js";
import {
  AlertService,
  Auth,
  Component,
  MatButton,
  MatIconButton,
  Router,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-RUAKYB3P.js";
import "./chunk-GOMI4DH3.js";

// src/app/auth/login/login.ts
function Login_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Email is required ");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Enter a valid email address ");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Password is required ");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Password must be at least 6 characters ");
    \u0275\u0275elementEnd();
  }
}
var Login = class _Login {
  auth = inject(Auth);
  fb = inject(FormBuilder);
  alert = inject(AlertService);
  router = inject(Router);
  loginForm;
  hidePassword = true;
  isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    const credentials = this.loginForm.value;
    this.auth.login(credentials).subscribe({
      next: (response) => {
        this.auth.update = response.data;
        this.alert.success(response.message);
        this.router.navigateByUrl("/task-management/tasks/my");
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.alert.error(error.error.message);
      }
    });
  }
  static \u0275fac = function Login_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Login)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Login, selectors: [["app-login"]], decls: 27, vars: 9, consts: [[1, "container", "d-flex", "justify-content-center", "align-items-center", "login-container"], [1, "col-12", "col-md-6", "col-lg-4"], [1, "p-4"], [1, "d-flex", "flex-column", "align-items-center", "mb-3"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "w-100", "mb-2"], ["matInput", "", "type", "email", "formControlName", "email", "placeholder", "you@example.com"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "w-100", "mb-2", 3, "disabled"]], template: function Login_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "mat-card", 2)(3, "mat-card-header", 3)(4, "mat-card-title");
      \u0275\u0275text(5, "Sign In");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "mat-card-subtitle");
      \u0275\u0275text(7, "Enter your credentials to continue");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card-content")(9, "form", 4);
      \u0275\u0275listener("ngSubmit", function Login_Template_form_ngSubmit_9_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(10, "mat-form-field", 5)(11, "mat-label");
      \u0275\u0275text(12, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "input", 6);
      \u0275\u0275conditionalCreate(14, Login_Conditional_14_Template, 2, 0, "mat-error");
      \u0275\u0275conditionalCreate(15, Login_Conditional_15_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "mat-form-field", 5)(17, "mat-label");
      \u0275\u0275text(18, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "input", 7);
      \u0275\u0275elementStart(20, "button", 8);
      \u0275\u0275listener("click", function Login_Template_button_click_20_listener() {
        return ctx.hidePassword = !ctx.hidePassword;
      });
      \u0275\u0275elementStart(21, "mat-icon");
      \u0275\u0275text(22);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(23, Login_Conditional_23_Template, 2, 0, "mat-error");
      \u0275\u0275conditionalCreate(24, Login_Conditional_24_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 9);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(5);
      \u0275\u0275conditional((ctx.email == null ? null : ctx.email.hasError("required")) ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.email == null ? null : ctx.email.hasError("email")) && !(ctx.email == null ? null : ctx.email.hasError("required")) ? 15 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility_off" : "visibility");
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.password == null ? null : ctx.password.hasError("required")) ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.password == null ? null : ctx.password.hasError("minlength")) && !(ctx.password == null ? null : ctx.password.hasError("required")) ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isSubmitting());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isSubmitting() ? "Signing in..." : "Sign In", " ");
    }
  }, dependencies: [MaterialModule, MatButton, MatIconButton, MatIcon, MatFormField, MatLabel, MatError, MatSuffix, MatInput, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n.login-container[_ngcontent-%COMP%] {\n  min-height: 90vh;\n}\n/*# sourceMappingURL=login.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Login, [{
    type: Component,
    args: [{ selector: "app-login", imports: [MaterialModule, ReactiveFormsModule], template: `<div class="container d-flex justify-content-center align-items-center login-container">
    <div class="col-12 col-md-6 col-lg-4">
        <mat-card class="p-4">
            <mat-card-header class="d-flex flex-column align-items-center mb-3">
                <mat-card-title>Sign In</mat-card-title>
                <mat-card-subtitle>Enter your credentials to continue</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">

                    <mat-form-field appearance="outline" class="w-100 mb-2">
                        <mat-label>Email</mat-label>
                        <input matInput type="email" formControlName="email" placeholder="you@example.com">
                        @if (email?.hasError('required')) {
                        <mat-error>
                            Email is required
                        </mat-error>
                        }
                        @if (email?.hasError('email') && !email?.hasError('required')) {
                        <mat-error>
                            Enter a valid email address
                        </mat-error>
                        }
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="w-100 mb-2">
                        <mat-label>Password</mat-label>
                        <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
                        <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                            <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                        </button>
                        @if (password?.hasError('required')) {
                        <mat-error >
                            Password is required
                        </mat-error>
                        }
                        @if (password?.hasError('minlength') && !password?.hasError('required')) {
                        <mat-error >
                            Password must be at least 6 characters
                        </mat-error>
                        }
                    </mat-form-field>

                    <button mat-raised-button color="primary" type="submit" class="w-100 mb-2"
                        [disabled]="isSubmitting()">
                        {{ isSubmitting() ? 'Signing in...' : 'Sign In' }}
                    </button>

                    <!-- <div class="text-center mt-2">
                        <span>Don't have an account? </span>
                        <a href="javascript:void(0)" routerLink="/auth/register">Register here</a>
                    </div> -->

                </form>
            </mat-card-content>
        </mat-card>
    </div>
</div>`, styles: ["/* src/app/auth/login/login.css */\n.login-container {\n  min-height: 90vh;\n}\n/*# sourceMappingURL=login.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Login, { className: "Login", filePath: "src/app/auth/login/login.ts", lineNumber: 16 });
})();
export {
  Login
};
//# sourceMappingURL=chunk-QNXA5M36.js.map
