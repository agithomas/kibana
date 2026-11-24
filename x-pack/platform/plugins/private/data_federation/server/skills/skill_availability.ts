/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { AvailabilityConfig } from '@kbn/agent-builder-server';
import { DATA_FEDERATION_ENABLED_SETTING_ID } from '@kbn/management-settings-ids';

/** Hides the skill unless ES|QL Data Federation is enabled in this space. */
export const dataFederationSkillAvailability: AvailabilityConfig = {
  cacheMode: 'space',
  handler: async ({ uiSettings }) => {
    const federationEnabled = await uiSettings
      .get<boolean>(DATA_FEDERATION_ENABLED_SETTING_ID)
      .catch(() => false);
    return federationEnabled
      ? { status: 'available' }
      : { status: 'unavailable', reason: 'ES|QL Data Federation is not enabled.' };
  },
};
