export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(40),
    },
    {
      name: "shortDescription",
      title: "Short description (for cards)",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(80),
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "weight",
      title: "Weight",
      type: "number",
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "number",
    },
    {
      name: "material",
      title: "Material",
      type: "string",
    },
    {
      name: "lead_time",
      title: "Lead time",
      type: "number",
    },
    {
      name: "numer",
      title: "NO",
      type: "number",
    },
    {
      name: "color",
      title: "Color",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" },
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
    },
  },
};
