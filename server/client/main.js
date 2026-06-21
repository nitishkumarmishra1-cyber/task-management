import {
  toCapitalCase
} from "./chunk-PS6XOAYV.js";
import {
  CreateUpdateUser
} from "./chunk-3I7GH5YD.js";
import "./chunk-EPAIUKAM.js";
import {
  MatBadge,
  MatBadgeModule,
  MatDialog,
  MatDivider,
  MatDividerModule,
  MatIcon,
  MatIconModule,
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger,
  MatNavList,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
  MatToolbar,
  MatToolbarModule,
  MaterialModule
} from "./chunk-7EGRQU55.js";
import {
  Api,
  Auth,
  Component,
  Constant,
  Injectable,
  MatButtonModule,
  MatIconButton,
  MatSnackBarModule,
  ROLE,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  catchError,
  importProvidersFrom,
  inject,
  provideBrowserGlobalErrorListeners,
  provideHttpClient,
  provideRouter,
  setClassMetadata,
  signal,
  throwError,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withFetch,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-WL3QX2OF.js";
import "./chunk-GOMI4DH3.js";

// src/app/shared/services/notification.ts
var Notification = class _Notification {
  api = inject(Api);
  update(data) {
    return this.api.patch(`${Constant.UPDATE_NOTIFICATION}`, data);
  }
  unseenCount() {
    return this.api.get(`${Constant.UNSEEN_COUNT_NOTIFICATION}`);
  }
  allNotifications() {
    return this.api.get(`${Constant.GET_NOTIFICATION}`);
  }
  static \u0275fac = function Notification_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Notification)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _Notification, factory: _Notification.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Notification, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/layout/header/header.ts
var Header = class _Header {
  auth = inject(Auth);
  notification = inject(Notification);
  dialog = inject(MatDialog);
  notificationCount = signal(0, ...ngDevMode ? [{ debugName: "notificationCount" }] : (
    /* istanbul ignore next */
    []
  ));
  currentUsername = "";
  currentUserRole = "";
  ngOnInit() {
    this.currentUsername = toCapitalCase(this.auth.user.name ?? "");
    this.currentUserRole = toCapitalCase(this.auth.user.role ?? "");
    this.getCount();
  }
  editProfile() {
    const dialogRef = this.dialog.open(CreateUpdateUser, {
      width: "550px",
      disableClose: true,
      data: { user: this.auth.user, assignableUsers: [] }
    });
    dialogRef.afterClosed().subscribe((formResult) => {
      if (!formResult)
        return;
    });
  }
  getCount() {
    this.notification.unseenCount().subscribe({
      next: (response) => {
        this.notificationCount.set(response.data);
      },
      error: (error) => {
      }
    });
  }
  onLogout() {
    this.auth.logout();
  }
  static \u0275fac = function Header_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Header)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Header, selectors: [["app-header"]], decls: 28, vars: 4, consts: [["profileMenu", "matMenu"], ["color", "primary", 1, "app-header", "mat-elevation-z4"], [1, "header-container"], [1, "brand"], [1, "logo-icon"], [1, "actions"], ["mat-icon-button", "", "matTooltip", "Notifications"], [3, "matBadge"], ["mat-icon-button", "", "matTooltip", "Account Profile", 3, "matMenuTriggerFor"], [1, "profile-menu-panel"], ["mat-menu-item", "", 3, "click"], [1, "menu-user-info"], [1, "menu-username"], [1, "menu-role"]], template: function Header_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-toolbar", 1)(1, "div", 2)(2, "div", 3)(3, "mat-icon", 4);
      \u0275\u0275text(4, "assignment_turned_in");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span");
      \u0275\u0275text(6, "TaskHub");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "button", 6)(9, "mat-icon", 7);
      \u0275\u0275text(10, "notifications");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "button", 8)(12, "mat-icon");
      \u0275\u0275text(13, "account_circle");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "mat-menu", 9, 0)(16, "button", 10);
      \u0275\u0275listener("click", function Header_Template_button_click_16_listener() {
        return ctx.editProfile();
      });
      \u0275\u0275elementStart(17, "div", 11)(18, "span", 12);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span", 13);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(22, "mat-divider");
      \u0275\u0275elementStart(23, "button", 10);
      \u0275\u0275listener("click", function Header_Template_button_click_23_listener() {
        return ctx.onLogout();
      });
      \u0275\u0275elementStart(24, "mat-icon");
      \u0275\u0275text(25, "logout");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span");
      \u0275\u0275text(27, "Logout");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      const profileMenu_r1 = \u0275\u0275reference(15);
      \u0275\u0275advance(9);
      \u0275\u0275property("matBadge", ctx.notificationCount());
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", profileMenu_r1);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.currentUsername);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.currentUserRole);
    }
  }, dependencies: [MatToolbarModule, MatToolbar, MatButtonModule, MatIconButton, MatIconModule, MatIcon, MatBadgeModule, MatBadge, MatMenuModule, MatMenu, MatMenuItem, MatMenuTrigger, MatDividerModule, MatDivider], styles: ["\n.header-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.1rem;\n  font-weight: 500;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  height: 28px;\n  width: 28px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.menu-user-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 12px 16px;\n}\n.menu-username[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 0.95rem;\n}\n.menu-role[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: rgba(0, 0, 0, 0.6);\n}\n  .mat-mdc-menu-panel.profile-menu-panel {\n  min-width: 220px;\n  max-width: 320px;\n}\n/*# sourceMappingURL=header.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Header, [{
    type: Component,
    args: [{ selector: "app-header", imports: [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatBadgeModule,
      MatMenuModule,
      MatDividerModule
    ], template: '<mat-toolbar color="primary" class="app-header mat-elevation-z4">\n    <div class="header-container">\n        <div class="brand">\n            <mat-icon class="logo-icon">assignment_turned_in</mat-icon>\n            <span>TaskHub</span>\n        </div>\n\n        <div class="actions">\n            <button mat-icon-button matTooltip="Notifications">\n                <mat-icon [matBadge]="notificationCount()">notifications</mat-icon>\n            </button>\n\n            <!-- Clicking this opens the profile dropdown (matMenuTriggerFor) -->\n            <button mat-icon-button matTooltip="Account Profile" [matMenuTriggerFor]="profileMenu">\n                <mat-icon>account_circle</mat-icon>\n            </button>\n\n            <!-- Dropdown panel content - hidden until the button above is clicked -->\n            <mat-menu #profileMenu="matMenu" class="profile-menu-panel">\n                <button mat-menu-item (click)="editProfile()">\n                    <div class="menu-user-info">\n                        <span class="menu-username">{{ currentUsername }}</span>\n                        <span class="menu-role">{{ currentUserRole }}</span>\n                    </div>\n                </button>\n                <mat-divider></mat-divider>\n                <button mat-menu-item (click)="onLogout()">\n                    <mat-icon>logout</mat-icon>\n                    <span>Logout</span>\n                </button>\n            </mat-menu>\n        </div>\n    </div>\n</mat-toolbar>', styles: ["/* src/app/layout/header/header.css */\n.header-container {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n.brand {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.1rem;\n  font-weight: 500;\n}\n.logo-icon {\n  font-size: 28px;\n  height: 28px;\n  width: 28px;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.menu-user-info {\n  display: flex;\n  flex-direction: column;\n  padding: 12px 16px;\n}\n.menu-username {\n  font-weight: 500;\n  font-size: 0.95rem;\n}\n.menu-role {\n  font-size: 0.8rem;\n  color: rgba(0, 0, 0, 0.6);\n}\n::ng-deep .mat-mdc-menu-panel.profile-menu-panel {\n  min-width: 220px;\n  max-width: 320px;\n}\n/*# sourceMappingURL=header.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Header, { className: "Header", filePath: "src/app/layout/header/header.ts", lineNumber: 29 });
})();

// src/app/layout/main-layout/main-layout.ts
var _c0 = () => ({ exact: false });
function MainLayout_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 5)(1, "mat-icon", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 8);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r1.route)("routerLinkActiveOptions", \u0275\u0275pureFunction0(4, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
var MainLayout = class _MainLayout {
  auth = inject(Auth);
  menuItems = [];
  ngOnInit() {
    this.menuItems = this.buildMenuForRole(this.auth.user?.role);
  }
  buildMenuForRole(role = ROLE.USER) {
    const items = [
      { label: "My Tasks", icon: "checklist", route: "/task-management/tasks/my" }
    ];
    if (role === ROLE.MANAGER || role === ROLE.TEAM_LEAD) {
      items.push({ label: "Team Tasks", icon: "assignment_ind", route: `/task-management/tasks/${role === ROLE.MANAGER ? "all" : "team"}` });
      items.push({ label: "Users", icon: "group", route: "/task-management/user-list" });
    }
    return items;
  }
  static \u0275fac = function MainLayout_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MainLayout)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MainLayout, selectors: [["app-main-layout"]], decls: 16, vars: 0, consts: [[1, "sidebar-shell"], ["mode", "side", "opened", "", 1, "sidebar-panel"], [1, "header-container"], [1, "brand"], [1, "logo-icon"], ["mat-list-item", "", "routerLinkActive", "active-link", 3, "routerLink", "routerLinkActiveOptions"], [1, "content-wrapper"], ["matListItemIcon", ""], ["matListItemTitle", ""]], template: function MainLayout_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-sidenav-container", 0)(1, "mat-sidenav", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon", 4);
      \u0275\u0275text(5, "assignment_turned_in");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7, "TaskHub");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(8, "mat-divider");
      \u0275\u0275elementStart(9, "mat-nav-list");
      \u0275\u0275repeaterCreate(10, MainLayout_For_11_Template, 5, 5, "a", 5, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-sidenav-content");
      \u0275\u0275element(13, "app-header");
      \u0275\u0275elementStart(14, "main", 6);
      \u0275\u0275element(15, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.menuItems);
    }
  }, dependencies: [MaterialModule, MatIcon, MatDivider, MatSidenav, MatSidenavContainer, MatSidenavContent, MatNavList, MatListItem, MatListItemIcon, MatListItemTitle, Header, RouterModule, RouterOutlet, RouterLink, RouterLinkActive], styles: ["\n.content-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  min-height: calc(100vh - 64px);\n  background-color: #f5f5f5;\n  padding: 2rem 1rem;\n  box-sizing: border-box;\n}\n.content-wrapper[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.header-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 16px 16px;\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 500;\n  font-size: 1.25rem;\n  letter-spacing: 0.5px;\n}\n.brand[_ngcontent-%COMP%]   .logo-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n}\n.active-link[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.06) !important;\n  font-weight: 500;\n}\n/*# sourceMappingURL=main-layout.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MainLayout, [{
    type: Component,
    args: [{ selector: "app-main-layout", imports: [MaterialModule, Header, RouterModule], template: '<mat-sidenav-container class="sidebar-shell">\n  <mat-sidenav mode="side" opened class="sidebar-panel">\n    <div class="header-container">\n      <div class="brand">\n        <mat-icon class="logo-icon">assignment_turned_in</mat-icon>\n        <span>TaskHub</span>\n      </div>\n    </div>\n\n    <mat-divider></mat-divider>\n\n    <mat-nav-list>\n      @for (item of menuItems; track $index) {\n      <a mat-list-item [routerLink]="item.route" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: false }">\n        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>\n        <span matListItemTitle>{{ item.label }}</span>\n      </a>\n      }\n    </mat-nav-list>\n  </mat-sidenav>\n  <mat-sidenav-content>\n    <app-header></app-header>\n    <main class="content-wrapper">\n      <router-outlet></router-outlet>\n    </main>\n  </mat-sidenav-content>\n</mat-sidenav-container>', styles: ["/* src/app/layout/main-layout/main-layout.css */\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  min-height: calc(100vh - 64px);\n  background-color: #f5f5f5;\n  padding: 2rem 1rem;\n  box-sizing: border-box;\n}\n.content-wrapper > * {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.header-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 16px 16px;\n}\n.brand {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 500;\n  font-size: 1.25rem;\n  letter-spacing: 0.5px;\n}\n.brand .logo-icon {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n}\n.active-link {\n  background-color: rgba(0, 0, 0, 0.06) !important;\n  font-weight: 500;\n}\n/*# sourceMappingURL=main-layout.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MainLayout, { className: "MainLayout", filePath: "src/app/layout/main-layout/main-layout.ts", lineNumber: 14 });
})();

// src/app/shared/guard/auth-guard.ts
var authGuard = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const isAuthenticated = auth.checkSession();
  if (!isAuthenticated) {
    return router.parseUrl("/auth/login");
  }
  return true;
};

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: () => import("./chunk-FZFE6FYD.js").then((m) => m.AUTH_ROUTES)
  },
  {
    path: "task-management",
    component: MainLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: "tasks",
        loadChildren: () => import("./chunk-SDF7XIV4.js").then((m) => m.TASK_ROUTES)
      },
      {
        path: "user-list",
        loadChildren: () => import("./chunk-AX4WVPQG.js").then((m) => m.USER_ROUTES)
      },
      {
        path: "",
        redirectTo: "tasks",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/task-management/tasks/my",
    pathMatch: "full"
  }
];

// src/app/shared/interceptor/auth.ts
var AuthInterceptor = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const dialog = inject(MatDialog);
  const updateRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth.user?.accessToken}`
    }
  });
  return next(updateRequest).pipe(catchError((error) => {
    if (error.status === 401 && !updateRequest.url.includes("login")) {
      dialog.closeAll();
      router.navigateByUrl("/auth/login");
    }
    return throwError(() => error);
  }));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    importProvidersFrom(MatSnackBarModule)
  ]
};

// src/app/app.ts
var App = class _App {
  title = signal("client", ...ngDevMode ? [{ debugName: "title" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet], template: `<router-outlet></router-outlet>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
