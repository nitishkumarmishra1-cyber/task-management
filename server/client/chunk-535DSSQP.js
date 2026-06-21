import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatIcon,
  MatPaginator,
  MatRow,
  MatRowDef,
  MatSort,
  MatSortHeader,
  MatTable,
  MatTableDataSource,
  MaterialModule
} from "./chunk-7EGRQU55.js";
import {
  CommonModule,
  Component,
  Input,
  MatIconButton,
  NgClass,
  ViewChild,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-WL3QX2OF.js";

// src/app/shared/components/badge/badge.ts
var Badge = class _Badge {
  status = "pending";
  static \u0275fac = function Badge_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Badge)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Badge, selectors: [["app-status-badge"]], inputs: { status: "status" }, decls: 2, vars: 2, consts: [[1, "status-badge", 3, "ngClass"]], template: function Badge_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "span", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", ctx.status === "completed" ? "badge-completed" : "badge-pending");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.status === "completed" ? "Completed" : "Pending", "\n");
    }
  }, dependencies: [CommonModule, NgClass], styles: ["\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 12px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  text-transform: capitalize;\n  line-height: 1.6;\n}\n.badge-pending[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n  color: #856404;\n}\n.badge-completed[_ngcontent-%COMP%] {\n  background-color: #d4edda;\n  color: #155724;\n}\n/*# sourceMappingURL=badge.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Badge, [{
    type: Component,
    args: [{ selector: "app-status-badge", standalone: true, imports: [CommonModule], template: `<span class="status-badge" [ngClass]="status === 'completed' ? 'badge-completed' : 'badge-pending'">
  {{ status === 'completed' ? 'Completed' : 'Pending' }}
</span>`, styles: ["/* src/app/shared/components/badge/badge.css */\n.status-badge {\n  display: inline-block;\n  padding: 2px 12px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  text-transform: capitalize;\n  line-height: 1.6;\n}\n.badge-pending {\n  background-color: #fff3cd;\n  color: #856404;\n}\n.badge-completed {\n  background-color: #d4edda;\n  color: #155724;\n}\n/*# sourceMappingURL=badge.css.map */\n"] }]
  }], null, { status: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Badge, { className: "Badge", filePath: "src/app/shared/components/badge/badge.ts", lineNumber: 14 });
})();

// src/app/shared/components/list/list.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function List_For_3_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const col_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("mat-sort-header", col_r1.sortable === false ? "" : col_r1.key)("disabled", col_r1.sortable === false);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", col_r1.label, " ");
  }
}
function List_For_3_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-status-badge", 11);
  }
  if (rf & 2) {
    const row_r2 = \u0275\u0275nextContext().$implicit;
    const col_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("status", row_r2[col_r1.key]);
  }
}
function List_For_3_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r2 = \u0275\u0275nextContext().$implicit;
    const col_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.truncate(row_r2[col_r1.key], col_r1.truncateLength || 40));
  }
}
function List_For_3_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r2 = \u0275\u0275nextContext().$implicit;
    const col_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r2[col_r1.key]);
  }
}
function List_For_3_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 10);
    \u0275\u0275conditionalCreate(1, List_For_3_td_2_Case_1_Template, 1, 1, "app-status-badge", 11)(2, List_For_3_td_2_Case_2_Template, 2, 1, "span", 12)(3, List_For_3_td_2_Case_3_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const col_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_12_0 = col_r1.type) === "status-badge" ? 1 : tmp_12_0 === "truncate" ? 2 : 3);
  }
}
function List_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 2);
    \u0275\u0275template(1, List_For_3_th_1_Template, 2, 3, "th", 7)(2, List_For_3_td_2_Template, 4, 1, "td", 8);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const col_r1 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", col_r1.key);
  }
}
function List_Conditional_4_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 15);
    \u0275\u0275text(1, " Actions ");
    \u0275\u0275elementEnd();
  }
}
function List_Conditional_4_td_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function List_Conditional_4_td_2_For_2_Template_button_click_0_listener() {
      const option_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const row_r6 = \u0275\u0275nextContext().$implicit;
      return \u0275\u0275resetView(option_r5.listener(row_r6));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r5.name);
  }
}
function List_Conditional_4_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 16);
    \u0275\u0275repeaterCreate(1, List_Conditional_4_td_2_For_2_Template, 3, 1, "button", 17, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.options);
  }
}
function List_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 3);
    \u0275\u0275template(1, List_Conditional_4_th_1_Template, 2, 0, "th", 13)(2, List_Conditional_4_td_2_Template, 3, 0, "td", 14);
    \u0275\u0275elementContainerEnd();
  }
}
function List_tr_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 19);
  }
}
function List_tr_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 20);
  }
}
var List = class _List {
  data = [];
  columns = [];
  options = [];
  pageSizeOptions = [5, 10, 20];
  sort;
  paginator;
  dataSource = new MatTableDataSource([]);
  get displayedColumns() {
    const keys = this.columns.map((c) => c.key);
    return this.options?.length ? [...keys, "actions"] : keys;
  }
  ngOnChanges(changes) {
    if (changes["data"]) {
      this.dataSource.data = this.data || [];
    }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  truncate(value, length) {
    if (!value)
      return "";
    return value.length > length ? value.slice(0, length) + "..." : value;
  }
  static \u0275fac = function List_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _List)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _List, selectors: [["app-list"]], viewQuery: function List_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5)(MatPaginator, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
    }
  }, inputs: { data: "data", columns: "columns", options: "options", pageSizeOptions: "pageSizeOptions" }, features: [\u0275\u0275NgOnChangesFeature], decls: 8, vars: 5, consts: [[1, "list-shell", "mat-elevation-z2"], ["mat-table", "", "matSort", "", 1, "w-100", 3, "dataSource"], [3, "matColumnDef"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "data-row", 4, "matRowDef", "matRowDefColumns"], ["showFirstLastButtons", "", "aria-label", "Select page", 3, "pageSizeOptions"], ["mat-header-cell", "", 3, "mat-sort-header", "disabled", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", 3, "mat-sort-header", "disabled"], ["mat-cell", ""], [3, "status"], [1, "text-truncate-cell"], ["mat-header-cell", "", "class", "text-end", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "text-end", 4, "matCellDef"], ["mat-header-cell", "", 1, "text-end"], ["mat-cell", "", 1, "text-end"], ["mat-icon-button", "", "color", "accent"], ["mat-icon-button", "", "color", "accent", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 1, "data-row"]], template: function List_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "table", 1);
      \u0275\u0275repeaterCreate(2, List_For_3_Template, 3, 1, "ng-container", 2, _forTrack0);
      \u0275\u0275conditionalCreate(4, List_Conditional_4_Template, 3, 0, "ng-container", 3);
      \u0275\u0275template(5, List_tr_5_Template, 1, 0, "tr", 4)(6, List_tr_6_Template, 1, 0, "tr", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "mat-paginator", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.columns);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.options.length ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("pageSizeOptions", ctx.pageSizeOptions);
    }
  }, dependencies: [MaterialModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatIconButton, MatIcon, MatPaginator, MatSort, MatSortHeader, Badge], styles: ["\n/*# sourceMappingURL=list.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(List, [{
    type: Component,
    args: [{ selector: "app-list", standalone: true, imports: [MaterialModule, Badge], template: `<div class="list-shell mat-elevation-z2">
    <table mat-table [dataSource]="dataSource" matSort class="w-100">

        @for (col of columns; track col.key) {
        <ng-container [matColumnDef]="col.key">
            <th mat-header-cell *matHeaderCellDef
                [mat-sort-header]="col.sortable === false ? '' : col.key"
                [disabled]="col.sortable === false">
                {{ col.label }}
            </th>

            <td mat-cell *matCellDef="let row">
                @switch (col.type) {
                    @case ('status-badge') {
                        <app-status-badge [status]="row[col.key]"></app-status-badge>
                    }
                    @case ('truncate') {
                        <span class="text-truncate-cell">{{ truncate(row[col.key], col.truncateLength || 40) }}</span>
                    }
                    @default {
                        <span>{{ row[col.key] }}</span>
                    }
                }
            </td>
        </ng-container>
        }

        <!-- Actions column only renders when actions are actually passed in -->
        @if (options.length) {
        <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef class="text-end"> Actions </th>
            <td mat-cell *matCellDef="let row" class="text-end">
                @for (option of options; track option.id) {
                <button mat-icon-button color="accent" (click)="option.listener(row)">
                    <mat-icon>{{ option.name }}</mat-icon>
                </button>
                }
            </td>
        </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="data-row"></tr>
    </table>

    <mat-paginator [pageSizeOptions]="pageSizeOptions" showFirstLastButtons aria-label="Select page">
    </mat-paginator>
</div>`, styles: ["/* src/app/shared/components/list/list.css */\n/*# sourceMappingURL=list.css.map */\n"] }]
  }], null, { data: [{
    type: Input
  }], columns: [{
    type: Input
  }], options: [{
    type: Input
  }], pageSizeOptions: [{
    type: Input
  }], sort: [{
    type: ViewChild,
    args: [MatSort]
  }], paginator: [{
    type: ViewChild,
    args: [MatPaginator]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(List, { className: "List", filePath: "src/app/shared/components/list/list.ts", lineNumber: 17 });
})();

export {
  List
};
//# sourceMappingURL=chunk-535DSSQP.js.map
