import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "cityStateZip", type: "string" }),
    defineField({ name: "hours", type: "string" }),
    defineField({ name: "location", type: "geoPoint" }),
    defineField({
      name: "departments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "email", type: "string" },
            { name: "description", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
