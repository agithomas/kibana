/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { platformCoreTools } from '@kbn/agent-builder-common';
import { defineSkillType } from '@kbn/agent-builder-server/skills/type_definition';
import { dataFederationSkillAvailability } from './skill_availability';
import content from './visualization.skill.md.text';
import esqlRecipes from './references/esql-recipes.md.text';
import formats from './references/formats.md.text';

export const dataFederationVisualizationSkill = defineSkillType({
  id: 'data-federation-visualization',
  name: 'data-federation-visualization',
  basePath: 'skills/platform/data-federation',
  description:
    'Create Lens charts or a Kibana dashboard on an ES|QL Data Federation dataset with FROM <dataset>, not an Elasticsearch index. Dashboard panels pass explicit ES|QL to the dashboards skill. Use for Parquet, NDJSON, CSV, or TSV files registered with _query/dataset. Index-backed charts go to visualization-creation.',
  content,
  availability: dataFederationSkillAvailability,
  referencedContent: [
    { relativePath: './references', name: 'esql-recipes', content: esqlRecipes },
    { relativePath: './references', name: 'formats', content: formats },
  ],
  getRegistryTools: () => [
    platformCoreTools.listIndices,
    platformCoreTools.executeWorkflow,
    platformCoreTools.executeEsql,
    platformCoreTools.createVisualization,
  ],
});
