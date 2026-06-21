import {
  Authorize
} from "./chunk-IX2MW76S.js";
import {
  ROLE
} from "./chunk-RUAKYB3P.js";
import "./chunk-GOMI4DH3.js";

// src/app/features/task/task.routes.ts
var TASK_ROUTES = [
  {
    path: "my",
    loadComponent: () => import("./chunk-ZNXM2IRR.js").then((m) => m.Dashboard),
    data: { taskType: "my" }
  },
  {
    path: "team",
    canActivate: [Authorize(ROLE.TEAM_LEAD, ROLE.MANAGER)],
    loadComponent: () => import("./chunk-ZNXM2IRR.js").then((m) => m.Dashboard),
    data: { taskType: "team" }
  },
  {
    path: "all",
    canActivate: [Authorize(ROLE.MANAGER)],
    loadComponent: () => import("./chunk-ZNXM2IRR.js").then((m) => m.Dashboard),
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
//# sourceMappingURL=chunk-6MALDC7J.js.map
