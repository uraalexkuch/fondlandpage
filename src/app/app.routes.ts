import { Routes } from '@angular/router';
import { HomeComponent } from "./fond/home/home.component";
import { DczFondComponent } from "./fond/dcz-fond/dcz-fond.component";
import { DczFondDocComponent } from "./fond/dcz-fond-doc/dcz-fond-doc.component";
import { DczBudgetComponent } from "./fond/dcz-budget/dcz-budget.component";
import { DczBudgetYearComponent } from "./fond/dcz-budget/dcz-budget-year/dcz-budget-year.component";
import { DczHomeComponent } from "./fond/dcz-home/dcz-home.component";
import { DczBudgetViewComponent } from "./fond/dcz-budget/dcz-budget-view/dcz-budget-view.component";
import { PageNotFoundComponent } from "./fond/page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aboutfond', component: DczFondComponent },
  { path: 'low', component: DczFondDocComponent },
  {
    path: 'budget', component: DczHomeComponent,
    children: [
      { path: '', component: DczBudgetComponent, data: { breadcrumb: 'Бюджет' } },
      {
        path: 'period', component: DczBudgetYearComponent, data: { breadcrumb: 'Період' },
        children: [
          { path: '', component: DczBudgetYearComponent },
          { path: 'view', component: DczBudgetViewComponent, data: { breadcrumb: 'Перегляд' } }
        ]
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }  // Wildcard route placed at the end
];
