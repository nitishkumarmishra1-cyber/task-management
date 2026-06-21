import "./chunk-GOMI4DH3.js";

// src/app/auth/auth.routes.ts
var AUTH_ROUTES = [
  {
    path: "login",
    loadComponent: () => import("./chunk-QNXA5M36.js").then((m) => m.Login)
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  }
  // {
  //     path : 'register',
  //     loadComponent : () => import('./register/register').then(m => m.Register)
  // }
];
export {
  AUTH_ROUTES
};
//# sourceMappingURL=chunk-IJWOB2EP.js.map
