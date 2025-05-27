import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgamrsSharedModule } from '../../shared/ngamrs-shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PocHttpInteceptor } from 'src/app/shared/services/poc-http-interceptor';

import { PanelModule } from 'primeng/primeng';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { HtsLandingPageComponent } from './landing-page/landing-page.component';
import { HtsSummaryComponent } from './hts-summary/hts-summary.component';
import { HtsSummaryLatestComponent } from './hts-summary/hts-summary-latest.component';
import { HtsProgramSnapshotComponent } from './program-snapshot/hts-program-snapshot.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgamrsSharedModule,
    HttpClientModule,
    PanelModule,
    TabsModule.forRoot(),
    NgxPaginationModule
  ],
  exports: [
    HtsLandingPageComponent,
    HtsSummaryComponent,
    HtsProgramSnapshotComponent
  ],
  declarations: [
    HtsLandingPageComponent,
    HtsSummaryComponent,
    HtsSummaryLatestComponent,
    HtsProgramSnapshotComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PocHttpInteceptor,
      multi: true
    }
  ]
})
export class PatientDashboardHtsModule {}
