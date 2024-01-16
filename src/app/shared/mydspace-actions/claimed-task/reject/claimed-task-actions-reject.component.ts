import { Component, Injector, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { NgbModal, NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClaimedTaskActionsAbstractComponent } from '../abstract/claimed-task-actions-abstract.component';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../notifications/notifications.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchService } from '../../../../core/shared/search/search.service';
import { RequestService } from '../../../../core/data/request.service';
import { Observable, of } from 'rxjs';
import { RemoteData } from '../../../../core/data/remote-data';
import { DSpaceObject } from '../../../../core/shared/dspace-object.model';
import {
  ClaimedDeclinedTaskSearchResult
} from '../../../object-collection/shared/claimed-declined-task-search-result.model';
import { AsyncPipe, NgIf } from '@angular/common';

export const WORKFLOW_TASK_OPTION_REJECT = 'submit_reject';

@Component({
    selector: 'ds-claimed-task-actions-reject',
    styleUrls: ['./claimed-task-actions-reject.component.scss'],
    templateUrl: './claimed-task-actions-reject.component.html',
    standalone: true,
    imports: [NgbTooltipModule, NgIf, FormsModule, ReactiveFormsModule, AsyncPipe, TranslateModule]
})
/**
 * Component for displaying and processing the reject action on a workflow task item
 */
export class ClaimedTaskActionsRejectComponent extends ClaimedTaskActionsAbstractComponent implements OnInit {
  /**
   * This component represents the reject option
   */
  option = WORKFLOW_TASK_OPTION_REJECT;

  /**
   * The reject form group
   */
  public rejectForm: UntypedFormGroup;

  /**
   * Reference to NgbModal
   */
  public modalRef: NgbModalRef;

  constructor(protected injector: Injector,
              protected router: Router,
              protected notificationsService: NotificationsService,
              protected translate: TranslateService,
              protected searchService: SearchService,
              protected requestService: RequestService,
              private formBuilder: UntypedFormBuilder,
              private modalService: NgbModal) {
    super(injector, router, notificationsService, translate, searchService, requestService);
  }

  /**
   * Initialize form
   */
  ngOnInit() {
    this.rejectForm = this.formBuilder.group({
      reason: ['', Validators.required]
    });
  }

  /**
   * Submit a reject option for the task
   */
  submitTask() {
    this.modalRef.close('Send Button');
    super.submitTask();
  }

  /**
   * Create the request body for rejecting a workflow task
   * Includes the reason from the form
   */
  createbody(): any {
    const reason = this.rejectForm.get('reason').value;
    return Object.assign(super.createbody(), { reason });
  }

  /**
   * Open modal
   *
   * @param content
   */
  openRejectModal(content: any) {
    this.rejectForm.reset();
    this.modalRef = this.modalService.open(content);
  }

  reloadObjectExecution(): Observable<RemoteData<DSpaceObject> | DSpaceObject> {
    return of(this.object);
  }

  convertReloadedObject(dso: DSpaceObject): DSpaceObject {
    const reloadedObject = Object.assign(new ClaimedDeclinedTaskSearchResult(), dso, {
      indexableObject: dso
    });
    return reloadedObject;
  }
}
