import { defineField, defineType } from "sanity";

export const propertyType = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Office", value: "office" },
          { title: "Warehouse", value: "warehouse" },
          { title: "Retail", value: "retail" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "sqft", title: "Square Feet", type: "number", validation: (r) => r.required() }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "location", type: "geoPoint", validation: (r) => r.required() }),
    defineField({ name: "leaseRate", type: "string" }),
    defineField({ name: "available", type: "boolean", initialValue: true }),
    defineField({ name: "highTraffic", title: "High-traffic location", type: "boolean", initialValue: false }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "amenities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "anchorTenants", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
  ],
  preview: {
    select: { title: "title", subtitle: "city", media: "image" },
  },
});
