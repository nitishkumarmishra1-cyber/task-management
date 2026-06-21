import {
  Auth,
  Router,
  inject
} from "./chunk-WL3QX2OF.js";

// src/app/shared/guard/permission-guard.ts
var Authorize = (...roles) => {
  return (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    const isAuthenticated = auth.checkSession();
    if (!isAuthenticated) {
      return router.parseUrl("/auth/login");
    }
    const requestRole = auth.user?.role;
    if (!requestRole || !roles.includes(requestRole)) {
      return router.parseUrl("/task-management/task-list");
    }
    return true;
  };
};

export {
  Authorize
};
//# sourceMappingURL=chunk-VJ4U3MGZ.js.map
