import {
  CreateUpdateUser
} from "./chunk-37DLKY2Q.js";
import {
  List
} from "./chunk-SSPVBAD4.js";
import {
  User
} from "./chunk-MKU7DKMS.js";
import {
  MatDialog,
  MatDivider,
  MatFormField,
  MatIcon,
  MatLabel,
  MatOption,
  MatSelect,
  MaterialModule
} from "./chunk-GIXJQKS3.js";
import {
  AlertService,
  Auth,
  ChangeDetectorRef,
  Component,
  Constant,
  MatButton,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-RUAKYB3P.js";
import "./chunk-GOMI4DH3.js";

// src/app/features/user/list/list.ts
function UserList_For_21_Template(rf, ctx) {
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
function UserList_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "mat-icon", 16);
    \u0275\u0275text(2, "account_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 17);
    \u0275\u0275text(4, "No users found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedStatusFilter === "all" ? "No users assigned yet." : "No " + ctx_r1.selectedStatusFilter + " tasks right now.", " ");
  }
}
function UserList_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-list", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("data", ctx_r1.users)("columns", ctx_r1.columns)("options", ctx_r1.options);
  }
}
var UserList = class _UserList {
  selectedStatusFilter = "all";
  dialog = inject(MatDialog);
  user = inject(User);
  cdr = inject(ChangeDetectorRef);
  alert = inject(AlertService);
  auth = inject(Auth);
  users = [];
  assignableUsers = [];
  ROLE_OPTIONS = Constant.ROLE_OPTION(this.auth.user?.role);
  options = [
    { id: "1", name: "edit", listener: (user) => this.openTaskDialog(user) },
    { id: "2", name: "deleted", listener: (id) => this.deleteTask(id) }
  ];
  columns = [
    { key: "name", label: "Name", sortable: true, type: "text", truncateLength: 0 },
    { key: "email", label: "Email", sortable: false, type: "text", truncateLength: 0 },
    { key: "role", label: "Role", sortable: false, type: "text", truncateLength: 0 },
    { key: "reportToName", label: "Report To", sortable: false, type: "text", truncateLength: 0 },
    { key: "isActive", label: "Status", sortable: false, type: "text", truncateLength: 0 }
  ];
  ngOnInit() {
    this.refresh();
    this.userList();
  }
  refresh() {
    this.user.userList().subscribe({
      next: (response) => {
        this.users = [...response.data];
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.alert.error(error.error.message);
      }
    });
  }
  userList() {
    this.user.assignableUsers().subscribe({
      next: (response) => {
        this.assignableUsers = response.data;
      },
      error: (error) => {
        this.alert.error(error.error.message);
      }
    });
  }
  openTaskDialog(userToEdit = null) {
    const dialogRef = this.dialog.open(CreateUpdateUser, {
      width: "550px",
      disableClose: true,
      data: { user: userToEdit, assignableUsers: this.assignableUsers }
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
      this.users = this.users.filter((t) => t.id !== id);
    }
  }
  static \u0275fac = function UserList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserList)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserList, selectors: [["app-dashboard"]], decls: 26, vars: 3, consts: [[1, "dashboard-card", "mat-elevation-z1"], [1, "card-header", "mb-4"], [1, "title-block"], [1, "page-title", "m-0"], [1, "task-count-badge"], ["mat-raised-button", "", "color", "primary", 1, "add-btn", 3, "click"], [1, "page-subtitle", "mb-3"], [1, "toolbar-row", "mb-3"], ["appearance", "outline", 1, "status-filter"], [3, "valueChange", "selectionChange", "value"], ["value", "all"], [3, "value"], [1, "mb-3"], [1, "table-responsive"], [1, "empty-state", "text-center", "p-5"], [3, "data", "columns", "options"], ["color", "disabled"], [1, "empty-title", "m-0"], [1, "empty-subtitle", "text-muted"]], template: function UserList_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4, "Users");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 5);
      \u0275\u0275listener("click", function UserList_Template_button_click_7_listener() {
        return ctx.openTaskDialog();
      });
      \u0275\u0275elementStart(8, "mat-icon");
      \u0275\u0275text(9, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " Add New User ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "p", 6);
      \u0275\u0275text(12, "Manage all users.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 7)(14, "mat-form-field", 8)(15, "mat-label");
      \u0275\u0275text(16, "Filter by Role");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-select", 9);
      \u0275\u0275twoWayListener("valueChange", function UserList_Template_mat_select_valueChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedStatusFilter, $event) || (ctx.selectedStatusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function UserList_Template_mat_select_selectionChange_17_listener() {
        return ctx.onStatusFilterChange();
      });
      \u0275\u0275elementStart(18, "mat-option", 10);
      \u0275\u0275text(19, "All");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(20, UserList_For_21_Template, 2, 2, "mat-option", 11, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(22, "mat-divider", 12);
      \u0275\u0275elementStart(23, "div", 13);
      \u0275\u0275conditionalCreate(24, UserList_Conditional_24_Template, 7, 1, "div", 14)(25, UserList_Conditional_25_Template, 1, 3, "app-list", 15);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.users.length);
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("value", ctx.selectedStatusFilter);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.ROLE_OPTIONS);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.users.length === 0 ? 24 : 25);
    }
  }, dependencies: [MaterialModule, MatButton, MatIcon, MatFormField, MatLabel, MatSelect, MatOption, MatDivider, List], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserList, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [MaterialModule, List], template: `<div class="dashboard-card mat-elevation-z1">

    <div class="card-header mb-4">
        <div class="title-block">
            <h1 class="page-title m-0">Users</h1>
            <span class="task-count-badge">{{ users.length }}</span>
        </div>
        <button mat-raised-button color="primary" class="add-btn" (click)="openTaskDialog()">
            <mat-icon>add</mat-icon> Add New User
        </button>
    </div>

    <p class="page-subtitle mb-3">Manage all users.</p>

    <div class="toolbar-row mb-3">
        <mat-form-field appearance="outline" class="status-filter">
            <mat-label>Filter by Role</mat-label>
            <mat-select [(value)]="selectedStatusFilter" (selectionChange)="onStatusFilterChange()">
                <mat-option value="all">All</mat-option>
                @for (item of ROLE_OPTIONS; track $index) {
                <mat-option [value]="item.value">{{item.label}}</mat-option>
                }
            </mat-select>
        </mat-form-field>
    </div>

    <mat-divider class="mb-3"></mat-divider>

    <div class="table-responsive">
        @if (users.length === 0) {
        <div class="empty-state text-center p-5">
            <mat-icon color="disabled">account_circle</mat-icon>
            <p class="empty-title m-0">No users found</p>
            <p class="empty-subtitle text-muted">
                {{ selectedStatusFilter === 'all' ? 'No users assigned yet.' : 'No ' + selectedStatusFilter + ' tasks
                right now.' }}
            </p>
        </div>
        } @else {
        <app-list [data]="users" [columns]="columns" [options]="options"></app-list>
        }
    </div>
</div>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserList, { className: "UserList", filePath: "src/app/features/user/list/list.ts", lineNumber: 21 });
})();
export {
  UserList
};
//# sourceMappingURL=chunk-P6ML4JLZ.js.map
