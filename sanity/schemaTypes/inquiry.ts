import { defineField, defineType } from "sanity";

export const inquiryType = defineType({
  name: "inquiry",
  title: "Inquiry / Lead",
  type: "document",
  // Created server-side by /api/inquiry. Read-only in the Studio.
  readOnly: true,
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "source", type: "string", description: "Form/page the lead came from" }),
    defineField({ name: "propertyTitle", type: "string" }),
    defineField({ name: "createdAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "name", subtitle: "source" },
  },
});
