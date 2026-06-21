import "./chunk-GOMI4DH3.js";

// src/app/auth/auth.routes.ts
var AUTH_ROUTES = [
  {
    path: "login",
    loadComponent: () => import("./chunk-4TFHBO7V.js").then((m) => m.Login)
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
//# sourceMappingURL=chunk-FZFE6FYD.js.map
