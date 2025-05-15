import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as Moment from 'moment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OtzRegisterService {
  public get url(): string {
    return this.appSettingsService.getEtlRestbaseurl().trim();
  }

  constructor(
    public http: HttpClient,
    public appSettingsService: AppSettingsService
  ) {}

  public getOTZRegisterReport(params: any): Observable<any> {
    // Format dates if they're moment objects
    const startDate =
      params.startDate instanceof Moment
        ? params.startDate.format('YYYY-MM-DD')
        : params.startDate;

    const endDate =
      params.endDate instanceof Moment
        ? params.endDate.format('YYYY-MM-DD')
        : params.endDate;

    // Create HTTP params for better URL formatting
    const httpParams = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('locationUuids', params.locationUuids);

    // Log the request for debugging
    console.log(`Fetching OTZ register data with params:`, {
      startDate,
      endDate,
      locationUuids: params.locationUuids
    });

    return this.http
      .get(`${this.url}registers/otz-register`, { params: httpParams })
      .pipe(
        catchError((err: any) => {
          console.error('Error fetching OTZ register data:', err);
          const error: any = err;
          const errorObj = {
            error: error.status,
            message: error.statusText || 'An error occurred while fetching data'
          };
          return of(errorObj);
        }),
        map((response: any) => {
          // Transform response if needed
          if (response && Array.isArray(response)) {
            // Process data if necessary
            return this.processOtzData(response);
          }
          return response;
        })
      );
  }

  /**
   * Process the OTZ data to map SQL query results to the expected format
   * for the OTZ register and ensure all required fields are present
   */
  private processOtzData(data: any[]): any[] {
    return data.map((item) => {
      // Map SQL query results to expected frontend structure
      const processedItem = {
        // Map direct fields from SQL query
        serialNumber: item.serial_number || null,
        enrollmentDate: item.date_of_enrollment || null,
        cccNumber: item.CCC || '',
        firstName: item.first_name || '',
        middleName: item.middle_name || '',
        lastName: item.last_name || '',
        birthDate: item.date_of_birth || null,
        ageAtEnrollment: item.age || '',
        gender: item.sex || '',
        dateOfVisit: item.date_of_visit || null,

        // OTZ modules information
        otzOrientation: item.otz_orientation || '',
        otzLiteracy: item.otz_literacy || '',
        otzParticipation: item.otz_participation || '',
        otzMentorship: item.otz_mentorship || '',
        otzLeadership: item.otz_leadership || '',
        otzEduPrevention: item.otz_edu_prevention || '',
        otzFutureDecision: item.otz_future_decision || '',
        otzTransition: item.otz_transition || '',
        otzRemarks: item.otz_remarks || '',

        // Adding expected fields from the previous version that aren't in the current query
        // These will be null/empty until added to the query
        artStartDate: null,
        currentViralLoad: '',
        vlDateDone: null,
        vlDoneWithin6Months: '',
        currentArtRegimen: '',
        dateStartedCurrentRegimen: null,
        regimenLine: '',
        currentRegimenLine: '',
        firstRegimenSwitch: '',
        firstSwitchDate: null,
        firstSwitchReason: '',
        secondRegimenSwitch: '',
        secondSwitchDate: null,
        secondSwitchReason: '',
        thirdRegimenSwitch: '',
        thirdSwitchDate: null,
        thirdSwitchReason: '',
        fourthRegimenSwitch: '',
        fourthSwitchDate: null,
        fourthSwitchReason: '',
        outcome: '',
        outcomeDate: null,
        modulesCompleted: ''
      };

      // Add viral load results placeholders - will need to be updated if these come from the SQL query
      for (let i = 1; i <= 18; i++) {
        processedItem[`vlResult${i}`] = '';
        processedItem[`vlDate${i}`] = null;
      }

      return processedItem;
    });
  }
}
