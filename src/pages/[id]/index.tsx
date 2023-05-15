import { Article, Section } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineDown } from "react-icons/ai";
import { MdModeEditOutline, MdOutlineGpsFixed } from "react-icons/md";
import prisma from "../../../lib/prisma";
import cutAndGrpLns from "../../utils/cutAndGrpLns";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

type Props = {
  article: Article & { sections: Section[] };
};

export default function Home({ article }: Props) {
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const { ref, inView } = useInView();
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(article).length === 0) {
      router.replace("/");
    }
  }, [article, router]);

  if (Object.keys(article).length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <img
        className="w-[100vw] h-[100vh] object-cover"
        src="/earth.jpg"
        alt="Earth"
        ref={ref}
      />
      <div className="absolute w-[100vw] h-[100vh] top-0 flex flex-col justify-center p-10 items-start font-bold text-gray-300 text-5xl font-mono">
        <div className="flex items-center mb-2 px-10">
          <span>{article.title}</span>
        </div>
        <span className="text-xs px-10 w-96 mb-4">{article.about}</span>
        <div className="flex px-10">
          <a
            href="#content"
            className="bg-green-500 text-white flex items-center text-xs p-2 mr-2 rounded-md"
          >
            <AiOutlineArrowDown className="mr-1" /> Article
          </a>
          <a
            href={`/${article.id}/edit`}
            className="bg-orange-500 text-white flex items-center text-xs p-2 rounded-md"
          >
            <MdModeEditOutline className="mr-1" /> Edit
          </a>
        </div>
      </div>
      <div className="flex p-10 font-mono" id="content">
        <div className="w-1/4" />
        <motion.div
          className="flex flex-col items-end w-1/4 pr-20 fixed top-20"
          animate={{
            opacity: inView ? 0 : 1,
          }}
        >
          {article.sections.map((s, idx) => (
            <Fragment key={idx}>
              <a
                className="text-sm py-2 font-semibold flex items-center"
                href={`#${s.id}`}
                onClick={() => setCurrentSectionIdx(idx)}
              >
                <span
                  className={idx < currentSectionIdx ? "text-gray-400" : ""}
                >
                  {s.head}{" "}
                </span>
                <MdOutlineGpsFixed
                  className={`ml-2 ${
                    idx < currentSectionIdx
                      ? "text-green-600"
                      : idx === currentSectionIdx
                      ? "text-red-600"
                      : ""
                  }`}
                />
              </a>
              {idx !== article.sections.length - 1 && (
                <div
                  className={`flex flex-col items-center ${
                    idx < currentSectionIdx ? "text-gray-400" : ""
                  }`}
                >
                  <div
                    className={`w-[2px] h-20 bg-gray-500 ${
                      idx < currentSectionIdx ? "bg-gray-400" : ""
                    }`}
                  />
                  <AiOutlineDown />
                </div>
              )}
            </Fragment>
          ))}
        </motion.div>
        <div className="w-3/4">
          {article.sections.map((s, idx) => (
            <div key={s.id} id={s.id} className="flex flex-col mb-8">
              <span className="font-bold text-xl mb-2 flex items-center">
                <MdOutlineGpsFixed
                  className={`mr-2 text-sm ${
                    idx < currentSectionIdx
                      ? "text-green-600"
                      : currentSectionIdx === idx
                      ? "text-red-600"
                      : ""
                  }`}
                />{" "}
                {s.head}
              </span>
              <span className="whitespace-pre-wrap">
                {cutAndGrpLns(s.body).map((p, i) => (
                  <Fragment key={`para-${s.id}-${i}`}>
                    {p}
                    <br />
                    <br />
                  </Fragment>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articleId = ctx.params?.id;
  let article: (Article & { sections: Section[] }) | null = null;
  if (articleId) {
    article = await prisma.article.findUnique({
      where: { id: articleId as string },
      include: {
        sections: { orderBy: { createdAt: "asc" } },
      },
    });
  }
  return {
    props: {
      article: article ? JSON.parse(JSON.stringify(article)) : {},
    },
  };
};
