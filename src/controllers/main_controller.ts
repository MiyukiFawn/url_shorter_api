import { Request, Response } from "express";
import Debuger from "debuger";
import { nanoid } from "nanoid";

import { Link, PrismaClient } from "@prisma/client";
import { get_links_params_schema, get_links_params_type } from "validations/get_links_params";
import { validateParams } from "helpers/validateSchema";
import { create_links_params_schema, create_links_params_type } from "validations/create_link_params";
import { get_link_param_schema, get_link_param_type } from "validations/get_link_params";
import ApiErrors from "error/ApiError";

const Debug = Debuger("Main Controller");
const prisma = new PrismaClient();

const nOfLinks = 15;

async function get_links(req: Request, res: Response) {
  const { page }: get_links_params_type = validateParams(req.params, get_links_params_schema);
  const skip = nOfLinks * (page ?? 0);

  let links: Link[] = await prisma.link.findMany({
    skip: skip,
    take: nOfLinks,
  });

  return res.status(200).json(links);
}

async function get_pages(req: Request, res: Response) {
  // const nOfRecords = await prisma.link.count();
  const nOfRecords = 30 / nOfLinks;

  var pages: Number[] = [];

  for (let i = 1; i <= nOfRecords; i++) {
    pages.push(i);
  }

  return res.status(200).json(pages);
}

async function get_link(req: Request, res: Response) {
  const { shortUrl }: get_link_param_type = validateParams(req.params, get_link_param_schema);

  let link: Link | null = await prisma.link.findFirst({
    where: {
      short_url: shortUrl,
    },
  });

  if (!link) throw ApiErrors.notFound("Url not founded");
  if (link.single_access && link.access > 0) throw ApiErrors.forbidden("This link is no longer available");

  link.access++;
  await prisma.link.update({
    data: {
      access: link.access,
    },
    where: {
      id: link.id,
    },
  });

  res.status(200).json({ link: link.full_url });
}

async function create_link(req: Request, res: Response) {
  const { url, singleAccess }: create_links_params_type = validateParams(req.body, create_links_params_schema);

  const shortUrl: string = nanoid(8);

  await prisma.link.create({
    data: {
      full_url: url,
      short_url: shortUrl,
      single_access: singleAccess,
    },
  });

  return res.status(201).json(shortUrl);
}

export default {
  get_links,
  get_link,
  create_link,
  get_pages,
};