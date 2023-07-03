import z from "zod";

const get_links_params_schema = z.object({
  page: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().int().nonnegative().nullable()).optional(),
});

type get_links_params_type = z.infer<typeof get_links_params_schema>;

export { get_links_params_schema, get_links_params_type };
