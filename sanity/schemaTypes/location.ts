import { defineField, defineType } from "sanity";

export const locationType = defineType({
  name: "geoPoint",
  title: "Location",
  type: "object",
  fields: [
    defineField({ name: "lat", title: "Latitude", type: "number", validation: (r) => r.required() }),
    defineField({ name: "lng", title: "Longitude", type: "number", validation: (r) => r.required() }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
  ],
});
