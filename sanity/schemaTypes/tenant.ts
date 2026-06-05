import { defineField, defineType } from "sanity";

export const tenantType = defineType({
  name: "tenant",
  title: "Tenant / Client",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "logo", type: "image" }),
  ],
  preview: { select: { title: "name", subtitle: "category", media: "logo" } },
});
