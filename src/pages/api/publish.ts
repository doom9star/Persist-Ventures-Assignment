import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, Section } from "@prisma/client";

type ResponseData = {
  status: "success" | "error";
  articleId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method !== "POST") throw new Error("Only POST method allowed!");

    let article: Prisma.ArticleCreateInput = {
      title: req.body.title,
      about: req.body.about,
      sections: {
        create: req.body.sections.map((s: any) => {
          let _ = { ...s };
          delete _.id;
          delete _.articleId;
          delete _.createdAt;
          return _;
        }),
      },
    };

    article = await prisma.article.create({
      data: article,
    });

    return res.json({ status: "success", articleId: article.id });
  } catch (err) {
    console.error(err);
    return res.json({ status: "error" });
  }
}

export const config = {
  api: {
    bodyParser: "4mb",
  },
};
