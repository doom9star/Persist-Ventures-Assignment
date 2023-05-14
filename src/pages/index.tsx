import { GetStaticProps } from "next";
import { AiOutlineArrowDown } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md";
import prisma from "../../lib/prisma";
import { Article, Section } from "@prisma/client";
import { Fragment } from "react";

type Props = {
  article: Article & { sections: Section[] };
};

export default function Home({ article }: Props) {
  return (
    <div className="relative">
      <img className="w-[100vw] h-[100vh] object-cover" src="/earth.jpg" />
      <div className="absolute w-[100vw] h-[100vh] top-0 flex flex-col justify-center p-10 items-start font-bold text-gray-300 text-5xl font-mono">
        <div className="flex items-center mb-2">
          <HiLocationMarker className="mr-2 text-3xl text-red-500" />
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
        <div className="flex flex-col items-center w-1/4">
          {article.sections.map((s, idx) => (
            <Fragment key={idx}>
              <a className="text-sm py-2 font-semibold" href={`#${s.id}`}>
                {s.head}
              </a>
              {idx !== article.sections.length - 1 && (
                <div className="w-[2px] h-20 bg-gray-500" />
              )}
            </Fragment>
          ))}
        </div>
        <div className="w-3/4">
          {article.sections.map((s) => (
            <div key={s.id} id={s.id} className="flex flex-col mb-8">
              <span className="font-bold text-xl my-2">{s.head}</span>
              <span>{s.body}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const article = await prisma.article.findUnique({
    where: { id: "clhniqiwh0000qkgd3wp8y32r" },
    include: {
      sections: true,
    },
  });

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
  };
};
