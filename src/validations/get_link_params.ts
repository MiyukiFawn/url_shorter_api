import z from "zod";

const get_link_param_schema = z.object({
  shortUrl: z.string().length(8).nonempty(),
});

type get_link_param_type = z.infer<typeof get_link_param_schema>;

export { get_link_param_schema, get_link_param_type };
