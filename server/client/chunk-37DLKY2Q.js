import {
  User
} from "./chunk-MKU7DKMS.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatError,
  MatFormField,
  MatIcon,
  MatInput,
  MatLabel,
  MatOption,
  MatSelect,
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
  Constant,
  MatButton,
  MatIconButton,
  ROLE,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-RUAKYB3P.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/features/user/create-update-user/create-update-user.ts
var _forTrack0 = ($index, $item) => $item.id;
function CreateUpdateUser_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Name is required");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateUser_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Name must be at least 3 characters");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateUser_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Email is required ");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateUser_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Enter a valid email address ");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateUser_Conditional_16_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("value", item_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function CreateUpdateUser_Conditional_16_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    \u0275\u0275property("value", user_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r2.name);
  }
}
function CreateUpdateUser_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 9)(2, "mat-form-field", 2)(3, "mat-label");
    \u0275\u0275text(4, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-select", 10);
    \u0275\u0275repeaterCreate(6, CreateUpdateUser_Conditional_16_For_7_Template, 2, 2, "mat-option", 11, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 9)(9, "mat-form-field", 2)(10, "mat-label");
    \u0275\u0275text(11, "Report To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-select", 12);
    \u0275\u0275repeaterCreate(13, CreateUpdateUser_Conditional_16_For_14_Template, 2, 2, "mat-option", 11, _forTrack0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r2.ROLE_OPTIONS);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r2.data.assignableUsers);
  }
}
function CreateUpdateUser_Conditional_17_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Password is required ");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateUser_Conditional_17_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Password must be at least 6 characters ");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateUser_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 2)(1, "mat-label");
    \u0275\u0275text(2, "Password");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 13);
    \u0275\u0275elementStart(4, "button", 14);
    \u0275\u0275listener("click", function CreateUpdateUser_Conditional_17_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.hidePassword = !ctx_r2.hidePassword);
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, CreateUpdateUser_Conditional_17_Conditional_7_Template, 2, 0, "mat-error");
    \u0275\u0275conditionalCreate(8, CreateUpdateUser_Conditional_17_Conditional_8_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("type", ctx_r2.hidePassword ? "password" : "text");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.hidePassword ? "visibility_off" : "visibility");
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r2.password == null ? null : ctx_r2.password.hasError("required")) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r2.password == null ? null : ctx_r2.password.hasError("minlength")) && !(ctx_r2.password == null ? null : ctx_r2.password.hasError("required")) ? 8 : -1);
  }
}
var CreateUpdateUser = class _CreateUpdateUser {
  auth = inject(Auth);
  user = inject(User);
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  alert = inject(AlertService);
  userForm;
  isEditMode = false;
  hidePassword = true;
  ROLE_OPTIONS = Constant.ROLE_OPTION(this.auth.user?.role);
  isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
    /* istanbul ignore next */
    []
  ));
  isProfile = signal(false, ...ngDevMode ? [{ debugName: "isProfile" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    this.isEditMode = !!this.data?.user;
    this.isProfile.set(this.data?.user?.id === this.auth.user?.id);
    this.initForm();
    this.userForm.get("role")?.valueChanges.subscribe((value) => {
      if (value === ROLE.TEAM_LEAD) {
        this.userForm.get("reportTo")?.setValue(this.auth.user?.id);
        this.userForm.get("reportTo")?.disable();
      } else {
        this.userForm.get("reportTo")?.enable();
      }
    });
  }
  initForm() {
    this.userForm = this.fb.group({
      name: [
        this.data?.user?.name || "",
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        this.data?.user?.email || "",
        [Validators.required, Validators.email]
      ],
      role: [
        this.data?.user?.role || ROLE.USER,
        [Validators.required, Validators.maxLength(500)]
      ],
      reportTo: [
        { value: this.data?.user?.reportTo?.id || "", disabled: this.data?.user?.role === ROLE.TEAM_LEAD },
        [Validators.required]
      ],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
    if (this.isEditMode) {
      this.userForm.get("password")?.clearValidators();
    }
    if (this.isProfile()) {
      this.userForm.get("role")?.clearValidators();
      this.userForm.get("reportTo")?.clearValidators();
    }
  }
  get name() {
    return this.userForm.get("name");
  }
  get email() {
    return this.userForm.get("email");
  }
  get password() {
    return this.userForm.get("password");
  }
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    const payload = __spreadValues({}, this.userForm.getRawValue());
    let $performAction = this.user.create(payload);
    if (this.isEditMode) {
      if (this.isProfile()) {
        this.userForm.get("role")?.clearValidators();
        this.userForm.get("reportTo")?.clearValidators();
      }
      delete payload.password;
      $performAction = this.user.update(this.data?.user?.id, payload);
    }
    $performAction.subscribe({
      next: (response) => {
        this.alert.success(response.message);
        this.dialogRef.close(response.data);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.alert.error(error.error.message);
      }
    });
  }
  onCancel() {
    this.dialogRef.close(null);
  }
  static \u0275fac = function CreateUpdateUser_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateUpdateUser)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateUpdateUser, selectors: [["app-create-update-user"]], decls: 23, vars: 10, consts: [["mat-dialog-title", ""], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "w-100", "mb-2"], ["matInput", "", "formControlName", "name", "placeholder", "e.g. Rahul"], ["matInput", "", "type", "email", "formControlName", "email", "placeholder", "you@example.com"], [1, "row"], ["align", "end"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], [1, "col-12", "col-md-6"], ["formControlName", "role"], [3, "value"], ["formControlName", "reportTo"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"]], template: function CreateUpdateUser_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "form", 1);
      \u0275\u0275listener("ngSubmit", function CreateUpdateUser_Template_form_ngSubmit_2_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(3, "mat-dialog-content")(4, "mat-form-field", 2)(5, "mat-label");
      \u0275\u0275text(6, "Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "input", 3);
      \u0275\u0275conditionalCreate(8, CreateUpdateUser_Conditional_8_Template, 2, 0, "mat-error");
      \u0275\u0275conditionalCreate(9, CreateUpdateUser_Conditional_9_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "mat-form-field", 2)(11, "mat-label");
      \u0275\u0275text(12, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "input", 4);
      \u0275\u0275conditionalCreate(14, CreateUpdateUser_Conditional_14_Template, 2, 0, "mat-error");
      \u0275\u0275conditionalCreate(15, CreateUpdateUser_Conditional_15_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, CreateUpdateUser_Conditional_16_Template, 15, 0, "div", 5);
      \u0275\u0275conditionalCreate(17, CreateUpdateUser_Conditional_17_Template, 9, 4, "mat-form-field", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-dialog-actions", 6)(19, "button", 7);
      \u0275\u0275listener("click", function CreateUpdateUser_Template_button_click_19_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(20, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "button", 8);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit User" : "Add New User");
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.userForm);
      \u0275\u0275advance(6);
      \u0275\u0275conditional((ctx.name == null ? null : ctx.name.hasError("required")) ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.name == null ? null : ctx.name.hasError("minlength")) && !(ctx.name == null ? null : ctx.name.hasError("required")) ? 9 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional((ctx.email == null ? null : ctx.email.hasError("required")) ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.email == null ? null : ctx.email.hasError("email")) && !(ctx.email == null ? null : ctx.email.hasError("required")) ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isProfile() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isEditMode ? 17 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.userForm.invalid || ctx.isSubmitting());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Update" : "Add", " User ");
    }
  }, dependencies: [MaterialModule, MatButton, MatIconButton, MatIcon, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormField, MatLabel, MatError, MatSuffix, MatInput, MatSelect, MatOption, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n.w-100[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mb-2[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n/*# sourceMappingURL=create-update-user.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateUpdateUser, [{
    type: Component,
    args: [{ selector: "app-create-update-user", standalone: true, imports: [
      MaterialModule,
      ReactiveFormsModule
    ], template: `<h2 mat-dialog-title>{{ isEditMode ? 'Edit User' : 'Add New User' }}</h2>

<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
    <mat-dialog-content>
        <mat-form-field appearance="outline" class="w-100 mb-2">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="e.g. Rahul">
            @if (name?.hasError('required')) {
            <mat-error>Name is required</mat-error>
            }
            @if (name?.hasError('minlength') && !name?.hasError('required')) {
            <mat-error>Name must be at least 3 characters</mat-error>
            }
        </mat-form-field>

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

        @if (!isProfile()) {
        <div class="row">
            <div class="col-12 col-md-6">
                <mat-form-field appearance="outline" class="w-100 mb-2">
                    <mat-label>Role</mat-label>
                    <mat-select formControlName="role">
                        @for (item of ROLE_OPTIONS; track $index) {
                        <mat-option [value]="item.value">{{item.label}}</mat-option>
                        }
                    </mat-select>
                </mat-form-field>
            </div>

            <div class="col-12 col-md-6">
                <mat-form-field appearance="outline" class="w-100 mb-2">
                    <mat-label>Report To</mat-label>
                    <mat-select formControlName="reportTo">
                        @for (user of data.assignableUsers; track user.id) {
                        <mat-option [value]="user.id">{{ user.name }}</mat-option>
                        }
                    </mat-select>
                </mat-form-field>
            </div>
        </div>
        }

        @if (!isEditMode) {
        <mat-form-field appearance="outline" class="w-100 mb-2">
            <mat-label>Password</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
            <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            @if (password?.hasError('required')) {
            <mat-error>
                Password is required
            </mat-error>
            }
            @if (password?.hasError('minlength') && !password?.hasError('required')) {
            <mat-error>
                Password must be at least 6 characters
            </mat-error>
            }
        </mat-form-field>
        }

    </mat-dialog-content>

    <mat-dialog-actions align="end">
        <button mat-stroked-button type="button" (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="userForm.invalid || isSubmitting()">
            {{ isEditMode ? 'Update' : 'Add' }} User
        </button>
    </mat-dialog-actions>
</form>`, styles: ["/* angular:styles/component:css;2f45a4833931d4e1a4c678fc8ed3fc19901f0b99f69895bb7b0be1f884df7078;/Users/nitishmishra/Desktop/Projects/Task-Management/client/src/app/features/user/create-update-user/create-update-user.ts */\n.w-100 {\n  width: 100%;\n}\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n/*# sourceMappingURL=create-update-user.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateUpdateUser, { className: "CreateUpdateUser", filePath: "src/app/features/user/create-update-user/create-update-user.ts", lineNumber: 25 });
})();

export {
  CreateUpdateUser
};
//# sourceMappingURL=chunk-37DLKY2Q.js.map
