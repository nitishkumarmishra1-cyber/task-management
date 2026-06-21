import {
  toCapitalCase
} from "./chunk-PS6XOAYV.js";
import {
  List
} from "./chunk-535DSSQP.js";
import {
  User
} from "./chunk-EPAIUKAM.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDivider,
  MatError,
  MatFormField,
  MatIcon,
  MatInput,
  MatLabel,
  MatOption,
  MatSelect,
  MaterialModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-7EGRQU55.js";
import {
  AlertService,
  Api,
  Auth,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Constant,
  Injectable,
  Input,
  MatButton,
  ROLE,
  STATUS,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WL3QX2OF.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/shared/services/task.ts
var Task = class _Task {
  api = inject(Api);
  create(data) {
    return this.api.post(Constant.CREATE_TASK, data);
  }
  update(id, data) {
    return this.api.patch(`${Constant.UPDATE_TASK}${id}`, data);
  }
  taskList(taskType) {
    return this.api.get(`${Constant.GET_TASK}${taskType === "my" ? "" : `/${taskType}`}`);
  }
  allTasks() {
    return this.api.get(`${Constant.ALL_TASK}`);
  }
  delete(id) {
    return this.api.delete(`${Constant.DELETE_TASK}${id}`);
  }
  static \u0275fac = function Task_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Task)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _Task, factory: _Task.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Task, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/task/create-update-task/create-update-task.ts
var _forTrack0 = ($index, $item) => $item.id;
function CreateUpdateTask_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Title is required");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateTask_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Title must be at least 3 characters");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateTask_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Description is required");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateTask_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Description cannot exceed 500 characters");
    \u0275\u0275elementEnd();
  }
}
function CreateUpdateTask_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 8);
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
function CreateUpdateTask_Conditional_24_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 8);
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
function CreateUpdateTask_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-form-field", 2)(2, "mat-label");
    \u0275\u0275text(3, "Assign To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 13);
    \u0275\u0275repeaterCreate(5, CreateUpdateTask_Conditional_24_For_6_Template, 2, 2, "mat-option", 8, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.data.assignableUsers);
  }
}
var CreateUpdateTask = class _CreateUpdateTask {
  task = inject(Task);
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef);
  alert = inject(AlertService);
  auth = inject(Auth);
  data = inject(MAT_DIALOG_DATA);
  taskForm;
  isEditMode = false;
  STATUS_OPTIONS = Constant.STATUS_OPTIONS;
  isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    this.isEditMode = !!this.data?.task;
    this.initForm();
  }
  initForm() {
    this.taskForm = this.fb.group({
      title: [
        this.data?.task?.title || "",
        [Validators.required, Validators.minLength(3)]
      ],
      description: [
        this.data?.task?.description || "",
        [Validators.required, Validators.maxLength(500)]
      ],
      status: [
        this.data?.task?.status || STATUS.PENDING,
        [Validators.required]
      ],
      assignTo: [
        this.data?.task?.assignTo?.id ?? this.auth.user?.id,
        [Validators.required]
      ]
    });
  }
  get title() {
    return this.taskForm.get("title");
  }
  get description() {
    return this.taskForm.get("description");
  }
  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    const payload = __spreadValues({}, this.taskForm.value);
    let $performAction = this.task.create(payload);
    if (this.isEditMode) {
      $performAction = this.task.update(this.data?.task?.id, payload);
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
  static \u0275fac = function CreateUpdateTask_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateUpdateTask)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateUpdateTask, selectors: [["app-create-update-task"]], decls: 30, vars: 13, consts: [["mat-dialog-title", ""], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "w-100", "mb-2"], ["matInput", "", "formControlName", "title", "placeholder", "e.g. Finish quarterly report"], ["matInput", "", "formControlName", "description", "rows", "4", "placeholder", "Add details..."], [1, "row"], [1, "col-12"], ["formControlName", "status"], [3, "value"], [1, "col-12", "col-md-6"], ["align", "end"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["formControlName", "assignTo"]], template: function CreateUpdateTask_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "form", 1);
      \u0275\u0275listener("ngSubmit", function CreateUpdateTask_Template_form_ngSubmit_2_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(3, "mat-dialog-content")(4, "mat-form-field", 2)(5, "mat-label");
      \u0275\u0275text(6, "Title");
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "input", 3);
      \u0275\u0275conditionalCreate(8, CreateUpdateTask_Conditional_8_Template, 2, 0, "mat-error");
      \u0275\u0275conditionalCreate(9, CreateUpdateTask_Conditional_9_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "mat-form-field", 2)(11, "mat-label");
      \u0275\u0275text(12, "Description");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "textarea", 4);
      \u0275\u0275conditionalCreate(14, CreateUpdateTask_Conditional_14_Template, 2, 0, "mat-error");
      \u0275\u0275conditionalCreate(15, CreateUpdateTask_Conditional_15_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 5)(17, "div", 6)(18, "mat-form-field", 2)(19, "mat-label");
      \u0275\u0275text(20, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-select", 7);
      \u0275\u0275repeaterCreate(22, CreateUpdateTask_For_23_Template, 2, 2, "mat-option", 8, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(24, CreateUpdateTask_Conditional_24_Template, 7, 0, "div", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "mat-dialog-actions", 10)(26, "button", 11);
      \u0275\u0275listener("click", function CreateUpdateTask_Template_button_click_26_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(27, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "button", 12);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Task" : "Add New Task");
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.taskForm);
      \u0275\u0275advance(6);
      \u0275\u0275conditional((ctx.title == null ? null : ctx.title.hasError("required")) ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.title == null ? null : ctx.title.hasError("minlength")) && !(ctx.title == null ? null : ctx.title.hasError("required")) ? 9 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional((ctx.description == null ? null : ctx.description.hasError("required")) ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.description == null ? null : ctx.description.hasError("maxlength")) && !(ctx.description == null ? null : ctx.description.hasError("required")) ? 15 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("col-md-6", ctx.data.canReassign)("col-md-12", !ctx.data.canReassign);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.STATUS_OPTIONS);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.data.canReassign ? 24 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.taskForm.invalid || ctx.isSubmitting());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Save Changes" : "Add Task", " ");
    }
  }, dependencies: [MaterialModule, MatButton, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormField, MatLabel, MatError, MatInput, MatSelect, MatOption, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n.w-100[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mb-2[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n/*# sourceMappingURL=create-update-task.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateUpdateTask, [{
    type: Component,
    args: [{ selector: "app-create-update-task", standalone: true, imports: [
      MaterialModule,
      ReactiveFormsModule
    ], template: `<h2 mat-dialog-title>{{ isEditMode ? 'Edit Task' : 'Add New Task' }}</h2>

<form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
    <mat-dialog-content>

        <!-- Title field -->
        <mat-form-field appearance="outline" class="w-100 mb-2">
            <mat-label>Title</mat-label>
            <input matInput formControlName="title" placeholder="e.g. Finish quarterly report">
            @if (title?.hasError('required')) {
                <mat-error>Title is required</mat-error>
            }
            @if (title?.hasError('minlength') && !title?.hasError('required')) {
                <mat-error>Title must be at least 3 characters</mat-error>
            }
        </mat-form-field>

        <!-- Description field -->
        <mat-form-field appearance="outline" class="w-100 mb-2">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="4" placeholder="Add details..."></textarea>
            @if (description?.hasError('required')) {
                <mat-error>Description is required</mat-error>
            }
            @if (description?.hasError('maxlength') && !description?.hasError('required')) {
                <mat-error>Description cannot exceed 500 characters</mat-error>
            }
        </mat-form-field>

        <div class="row">
            <!-- Status dropdown mapping directly to enum parameters -->
            <div class="col-12" [class.col-md-6]="data.canReassign" [class.col-md-12]="!data.canReassign">
                <mat-form-field appearance="outline" class="w-100 mb-2">
                    <mat-label>Status</mat-label>
                    <mat-select formControlName="status">
                        @for (item of STATUS_OPTIONS; track $index) {
                            <mat-option [value]="item.value">{{item.label}}</mat-option>
                        }
                    </mat-select>
                </mat-form-field>
            </div>

            <!-- Assignee field -->
            @if (data.canReassign) {
                <div class="col-12 col-md-6">
                    <mat-form-field appearance="outline" class="w-100 mb-2">
                        <mat-label>Assign To</mat-label>
                        <mat-select formControlName="assignTo">
                            @for (user of data.assignableUsers; track user.id) {
                                <mat-option [value]="user.id">{{ user.name }}</mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                </div>
            }
        </div>

    </mat-dialog-content>

    <mat-dialog-actions align="end">
        <button mat-stroked-button type="button" (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="taskForm.invalid || isSubmitting()">
            {{ isEditMode ? 'Save Changes' : 'Add Task' }}
        </button>
    </mat-dialog-actions>
</form>`, styles: ["/* angular:styles/component:css;2f45a4833931d4e1a4c678fc8ed3fc19901f0b99f69895bb7b0be1f884df7078;/Users/nitishmishra/Desktop/Projects/Task-Management/client/src/app/features/task/create-update-task/create-update-task.ts */\n.w-100 {\n  width: 100%;\n}\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n/*# sourceMappingURL=create-update-task.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateUpdateTask, { className: "CreateUpdateTask", filePath: "src/app/features/task/create-update-task/create-update-task.ts", lineNumber: 25 });
})();

// src/app/features/task/dashboard/dashboard.ts
function Dashboard_For_21_Template(rf, ctx) {
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
function Dashboard_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "mat-icon", 16);
    \u0275\u0275text(2, "assignment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 17);
    \u0275\u0275text(4, "No tasks found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedStatusFilter === "all" ? "No tasks assigned yet." : "No " + ctx_r1.selectedStatusFilter + " tasks right now.", " ");
  }
}
function Dashboard_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-list", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("data", ctx_r1.tasks)("columns", ctx_r1.columns)("options", ctx_r1.options);
  }
}
var Dashboard = class _Dashboard {
  task = inject(Task);
  user = inject(User);
  auth = inject(Auth);
  alert = inject(AlertService);
  selectedStatusFilter = "all";
  dialog = inject(MatDialog);
  cdr = inject(ChangeDetectorRef);
  taskType = "my";
  // meta info
  tasks = [];
  users = [];
  pageTitle = "";
  STATUS_OPTIONS = Constant.STATUS_OPTIONS;
  options = [
    { id: "1", name: "edit", listener: (task) => this.openTaskDialog(task) },
    { id: "3", name: "check_circle", listener: (task) => this.openTaskDialog(task) },
    { id: "2", name: "deleted", listener: (id) => this.deleteTask(id) }
  ];
  columns = [
    { key: "title", label: "Title", sortable: true, type: "text", truncateLength: 0 },
    { key: "description", label: "Description", sortable: false, type: "truncate", truncateLength: 30 },
    { key: "status", label: "Status", sortable: false, type: "status-badge", truncateLength: 0 },
    { key: "assignToName", label: "Assignee", sortable: false, type: "text", truncateLength: 0 }
  ];
  ngOnInit() {
    this.userList();
  }
  ngOnChanges() {
    this.pageTitle = toCapitalCase(this.taskType);
    this.refresh();
  }
  refresh() {
    this.task.taskList(this.taskType).subscribe({
      next: (response) => {
        this.tasks = [...response.data];
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.alert.error(error.error.message);
      }
    });
  }
  userList() {
    if (this.auth.user?.role === ROLE.USER)
      return;
    this.user.assignableUsers().subscribe({
      next: (response) => {
        this.users = response.data;
      },
      error: (error) => {
        this.alert.error(error.error.message);
      }
    });
  }
  openTaskDialog(taskToEdit = null) {
    const dialogRef = this.dialog.open(CreateUpdateTask, {
      width: "550px",
      disableClose: true,
      data: {
        task: taskToEdit,
        canReassign: [ROLE.MANAGER, ROLE.TEAM_LEAD].includes(this.auth.user.role),
        assignableUsers: this.users
      }
    });
    dialogRef.afterClosed().subscribe((formResult) => {
      if (!formResult)
        return;
      this.refresh();
    });
  }
  onStatusFilterChange() {
  }
  deleteTask(id) {
    if (id && confirm("Are you sure you want to remove this task?")) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    }
  }
  static \u0275fac = function Dashboard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Dashboard)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Dashboard, selectors: [["app-dashboard"]], inputs: { taskType: "taskType" }, features: [\u0275\u0275NgOnChangesFeature], decls: 26, vars: 5, consts: [[1, "dashboard-card", "mat-elevation-z1"], [1, "card-header", "mb-4"], [1, "title-block"], [1, "page-title", "m-0"], [1, "task-count-badge"], ["mat-raised-button", "", "color", "primary", 1, "add-btn", 3, "click"], [1, "page-subtitle", "mb-3"], [1, "toolbar-row", "mb-3"], ["appearance", "outline", 1, "status-filter"], [3, "valueChange", "selectionChange", "value"], ["value", "all"], [3, "value"], [1, "mb-3"], [1, "table-responsive"], [1, "empty-state", "text-center", "p-5"], [3, "data", "columns", "options"], ["color", "disabled", 1, "empty-icon"], [1, "empty-title", "m-0"], [1, "empty-subtitle", "text-muted"]], template: function Dashboard_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 5);
      \u0275\u0275listener("click", function Dashboard_Template_button_click_7_listener() {
        return ctx.openTaskDialog();
      });
      \u0275\u0275elementStart(8, "mat-icon");
      \u0275\u0275text(9, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " Add New Task ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "p", 6);
      \u0275\u0275text(12, "Manage and track all tasks assigned to you.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 7)(14, "mat-form-field", 8)(15, "mat-label");
      \u0275\u0275text(16, "Filter by Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-select", 9);
      \u0275\u0275twoWayListener("valueChange", function Dashboard_Template_mat_select_valueChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedStatusFilter, $event) || (ctx.selectedStatusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function Dashboard_Template_mat_select_selectionChange_17_listener() {
        return ctx.onStatusFilterChange();
      });
      \u0275\u0275elementStart(18, "mat-option", 10);
      \u0275\u0275text(19, "All");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(20, Dashboard_For_21_Template, 2, 2, "mat-option", 11, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(22, "mat-divider", 12);
      \u0275\u0275elementStart(23, "div", 13);
      \u0275\u0275conditionalCreate(24, Dashboard_Conditional_24_Template, 7, 1, "div", 14)(25, Dashboard_Conditional_25_Template, 1, 3, "app-list", 15);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("", ctx.pageTitle, " Tasks");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("", ctx.tasks.length, " ", ctx.tasks.length === 1 ? "task" : "tasks");
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("value", ctx.selectedStatusFilter);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.STATUS_OPTIONS);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.tasks.length === 0 ? 24 : 25);
    }
  }, dependencies: [MaterialModule, MatButton, MatIcon, MatFormField, MatLabel, MatSelect, MatOption, MatDivider, List], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dashboard, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [MaterialModule, List], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="dashboard-card mat-elevation-z1">

    <div class="card-header mb-4">
        <div class="title-block">
            <h1 class="page-title m-0">{{pageTitle}} Tasks</h1>
            <span class="task-count-badge">{{ tasks.length }} {{ tasks.length === 1 ? 'task' : 'tasks' }}</span>
        </div>
        <button mat-raised-button color="primary" class="add-btn" (click)="openTaskDialog()">
            <mat-icon>add</mat-icon> Add New Task
        </button>
    </div>

    <p class="page-subtitle mb-3">Manage and track all tasks assigned to you.</p>

    <div class="toolbar-row mb-3">
        <mat-form-field appearance="outline" class="status-filter">
            <mat-label>Filter by Status</mat-label>
            <mat-select [(value)]="selectedStatusFilter" (selectionChange)="onStatusFilterChange()">
                <mat-option value="all">All</mat-option>
                @for (item of STATUS_OPTIONS; track $index) {
                <mat-option [value]="item.value">{{item.label}}</mat-option>
                }
            </mat-select>
        </mat-form-field>
    </div>

    <mat-divider class="mb-3"></mat-divider>

    <div class="table-responsive">
        @if (tasks.length === 0) {
        <div class="empty-state text-center p-5">
            <mat-icon class="empty-icon" color="disabled">assignment</mat-icon>
            <p class="empty-title m-0">No tasks found</p>
            <p class="empty-subtitle text-muted">
                {{ selectedStatusFilter === 'all' ? 'No tasks assigned yet.' : 'No ' + selectedStatusFilter + ' tasks
                right now.' }}
            </p>
        </div>
        } @else {
        <app-list [data]="tasks" [columns]="columns" [options]="options"></app-list>
        }
    </div>
</div>` }]
  }], null, { taskType: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Dashboard, { className: "Dashboard", filePath: "src/app/features/task/dashboard/dashboard.ts", lineNumber: 24 });
})();
export {
  Dashboard
};
//# sourceMappingURL=chunk-3WUSDL5N.js.map
