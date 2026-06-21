import {
  Authorize
} from "./chunk-IX2MW76S.js";
import {
  ROLE
} from "./chunk-RUAKYB3P.js";
import "./chunk-GOMI4DH3.js";

// src/app/features/user/user.routes.ts
var USER_ROUTES = [
  {
    path: "",
    canActivate: [Authorize(ROLE.MANAGER, ROLE.TEAM_LEAD)],
    loadComponent: () => import("./chunk-P6ML4JLZ.js").then((m) => m.UserList)
  }
];
export {
  USER_ROUTES
};
//# sourceMappingURL=chunk-IFNRMMIJ.js.map
