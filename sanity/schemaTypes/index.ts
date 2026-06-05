import type { SchemaTypeDefinition } from "sanity";
import { locationType } from "./location";
import { projectType } from "./project";
import { propertyType } from "./property";
import { serviceType } from "./service";
import { tenantType } from "./tenant";
import { inquiryType } from "./inquiry";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  locationType,
  projectType,
  propertyType,
  serviceType,
  tenantType,
  inquiryType,
  siteSettingsType,
];
