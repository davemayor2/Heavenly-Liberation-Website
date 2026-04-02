import { defineField, defineType } from "sanity";

export const sermonType = defineType({
  name: "sermon",
  title: "Sermon",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "preacher",
      title: "Preacher / Speaker",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date Preached",
      type: "date",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "Full YouTube link e.g. https://youtu.be/xyz or https://www.youtube.com/watch?v=xyz",
    }),
    defineField({
      name: "category",
      title: "Category (e.g. Faith, Prayer, Healing)",
      type: "string",
    }),
    defineField({
      name: "scripture",
      title: "Key Scripture (e.g. John 3:16)",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g. 45 mins)",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Thumbnail Image",
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
    select: { title: "title", media: "image", preacher: "preacher", date: "date" },
    prepare({ title, media, preacher, date }) {
      const d = date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
      return { title, media, subtitle: `${preacher ?? ""} · ${d}` };
    },
  },
  orderings: [
    {
      title: "Date (Latest First)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
