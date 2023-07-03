import z from "zod";

const create_links_params_schema = z.object({
  url: z
    .string({
      required_error: "url must be provided",
      invalid_type_error: "url must be a valid URL (Ex: http://example.com)",
    })
    .url(),
  singleAccess: z.boolean({
    required_error: "singleAccess must be provided",
    invalid_type_error: "singleAccess must be true or false",
  }),
});

type create_links_params_type = z.infer<typeof create_links_params_schema>;

export { create_links_params_schema, create_links_params_type };
