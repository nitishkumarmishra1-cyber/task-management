import {
  Authorize
} from "./chunk-VJ4U3MGZ.js";
import {
  ROLE
} from "./chunk-WL3QX2OF.js";
import "./chunk-GOMI4DH3.js";

// src/app/features/task/task.routes.ts
var TASK_ROUTES = [
  {
    path: "my",
    loadComponent: () => import("./chunk-3WUSDL5N.js").then((m) => m.Dashboard),
    data: { taskType: "my" }
  },
  {
    path: "team",
    canActivate: [Authorize(ROLE.TEAM_LEAD, ROLE.MANAGER)],
    loadComponent: () => import("./chunk-3WUSDL5N.js").then((m) => m.Dashboard),
    data: { taskType: "team" }
  },
  {
    path: "all",
    canActivate: [Authorize(ROLE.MANAGER)],
    loadComponent: () => import("./chunk-3WUSDL5N.js").then((m) => m.Dashboard),
    data: { taskType: "all" }
  },
  {
    path: "",
    redirectTo: "my",
    pathMatch: "full"
  }
];
export {
  TASK_ROUTES
};
//# sourceMappingURL=chunk-SDF7XIV4.js.map
