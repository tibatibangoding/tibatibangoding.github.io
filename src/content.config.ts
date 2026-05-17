import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
    }),
});

const projects = defineCollection({
  // Load Markdown and MDX files in the `src/content/projects/` directory.
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional().nullable(),
    description: z.string(),
    date: z.coerce.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    link: z.string().optional().nullable(),
    draft: z.boolean().optional(),
    category: z.string().optional(),
  }),
});

const teams = defineCollection({
  loader: glob({ base: "./src/content/teams", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    email: z.string().optional(),
    image: z.string().optional(),
    position: z.string().optional(),
    active: z.boolean().optional(),
    social: z
      .array(
        z.object({
          name: z.string(),
          link: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { blog, projects, teams };
