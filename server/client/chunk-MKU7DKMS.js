import {
  Api,
  Constant,
  Injectable,
  inject,
  setClassMetadata,
  shareReplay,
  ɵɵdefineInjectable
} from "./chunk-RUAKYB3P.js";

// src/app/shared/services/user.ts
var User = class _User {
  api = inject(Api);
  create(data) {
    return this.api.post(Constant.CREATE_USER, data);
  }
  update(id, data) {
    return this.api.patch(`${Constant.UPDATE_USER}${id}`, data);
  }
  meProfile() {
    return this.api.get(`${Constant.USER_ME}`);
  }
  userList() {
    return this.api.get(`${Constant.USER_LIST}`);
  }
  delete(id) {
    return this.api.delete(`${Constant.DELETE_USER}${id}`);
  }
  assignableUsers() {
    return this.api.get(`${Constant.ASSIGNABLE_USER}`).pipe(shareReplay(1));
  }
  static \u0275fac = function User_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _User)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _User, factory: _User.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(User, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  User
};
//# sourceMappingURL=chunk-MKU7DKMS.js.map
