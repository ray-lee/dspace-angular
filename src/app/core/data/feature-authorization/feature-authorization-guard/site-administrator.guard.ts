import { Injectable } from '@angular/core';
import { FeatureAuthorizationGuard } from './feature-authorization.guard';
import { FeatureID } from '../feature-id';
import { AuthorizationDataService } from '../authorization-data.service';

/**
 * Prevent unauthorized activating and loading of routes when the current authenticated user doesn't have administrator
 * rights to the {@link Site}
 */
@Injectable({
  providedIn: 'root'
})
export class SiteAdministratorGuard extends FeatureAuthorizationGuard {
  constructor(protected authorizationService: AuthorizationDataService) {
    super(authorizationService);
  }

  /**
   * Check administrator authorization rights
   */
  getFeatureID(): FeatureID {
    return FeatureID.AdministratorOf;
  }
}
