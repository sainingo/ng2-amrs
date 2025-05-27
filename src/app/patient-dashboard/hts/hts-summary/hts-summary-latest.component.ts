import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from '../../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'hts-summary-latest',
  templateUrl: './hts-summary-latest.component.html',
  styles: []
})
export class HtsSummaryLatestComponent implements OnInit, OnDestroy {
  public loadingSummary = false;
  public subscription: Subscription;
  public patient: Patient;
  public patientUuid: any;
  public errors: any = [];
  public summaryData: any;
  @Input() public programUuid: string;

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.getPatient();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getPatient() {
    this.loadingSummary = true;
    this.subscription = this.patientService.currentlyLoadedPatient.subscribe(
      (patient) => {
        if (patient) {
          this.patient = patient;
          this.patientUuid = this.patient.person.uuid;
          this.loadHtsSummary(); // Use mock now, real API later
        }
      },
      (err) => {
        console.error(err);
        this.loadingSummary = false;
        this.errors.push({
          id: 'patient',
          message: 'Error fetching patient'
        });
      }
    );
  }

  loadHtsSummary() {
    // Simulated data — replace with API call later
    setTimeout(() => {
      this.summaryData = {
        last_test_result: 'Negative',
        date_tested: '2025-05-20',
        testing_strategy: 'PITC',
        client_type: 'New Client',
        entry_point: 'OPD',
        consent: true,
        provider: 'Dr. Jane Doe'
      };
      this.loadingSummary = false;
    }, 1000);
  }
}
