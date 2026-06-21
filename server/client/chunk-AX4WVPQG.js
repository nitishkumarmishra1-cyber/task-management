import {
  Authorize
} from "./chunk-VJ4U3MGZ.js";
import {
  ROLE
} from "./chunk-WL3QX2OF.js";
import "./chunk-GOMI4DH3.js";

// src/app/features/user/user.routes.ts
var USER_ROUTES = [
  {
    path: "",
    canActivate: [Authorize(ROLE.MANAGER, ROLE.TEAM_LEAD)],
    loadComponent: () => import("./chunk-WCF4QSG5.js").then((m) => m.UserList)
  }
];
export {
  USER_ROUTES
};
//# sourceMappingURL=chunk-AX4WVPQG.js.map
