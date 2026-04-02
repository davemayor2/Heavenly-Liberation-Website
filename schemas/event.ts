import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time (display string e.g. 2:00 PM – 6:00 PM)",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "tag",
      title: "Category Tag (e.g. Special Service, Conference)",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Feature this event (shown prominently on homepage)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", media: "image", date: "date" },
    prepare({ title, media, date }) {
      const d = date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
      return { title, media, subtitle: d };
    },
  },
  orderings: [
    {
      title: "Date (Upcoming First)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
