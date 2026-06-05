import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Fuel / Service Station", value: "fuel" },
          { title: "Retail Center", value: "retail" },
          { title: "Government / Institutional", value: "government" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "client", type: "string", validation: (r) => r.required() }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "state", type: "string" }),
    defineField({ name: "location", type: "geoPoint", validation: (r) => r.required() }),
    defineField({ name: "year", type: "number" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "scope", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "image" },
  },
});
