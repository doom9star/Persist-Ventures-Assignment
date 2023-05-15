import { Article, Section } from "@prisma/client";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import { Anton, Lilita_One, Nunito_Sans } from "next/font/google";
import Image from "next/image";
import { Fragment, useState } from "react";
import { AiOutlineArrowDown, AiOutlineDown } from "react-icons/ai";
import { MdModeEditOutline, MdOutlineGpsFixed } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import prisma from "../../lib/prisma";
import cutAndGrpLns from "../utils/cutAndGrpLns";

const nunito = Nunito_Sans({ subsets: ["latin"] });
const lilita = Lilita_One({ subsets: ["latin"], weight: "400" });
const anton = Anton({ subsets: ["latin"], weight: "400" });

type Props = {
  article: Article & { sections: Section[] };
};

export default function Home({ article }: Props) {
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const { ref, inView } = useInView();
  return (
    <div className="relative">
      <div className="w-[100vw] h-[100vh] relative">
        <Image
          src="/earth.jpg"
          alt="Earth"
          ref={ref}
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="absolute w-[100vw] h-[100vh] top-0 flex flex-col justify-center p-10 items-start font-bold text-gray-300 text-5xl">
        <div className="flex items-center mb-2 px-10">
          <span className={anton.className}>{article.title}</span>
        </div>
        <span className={`text-xs px-10 w-96 mb-4 ${nunito.className}`}>
          {article.about}
        </span>
        <div className={`flex px-10 ${nunito.className}`}>
          <a
            href={`#${article.sections[0].id}`}
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
      <div className={`flex p-10 ${nunito.className}`}>
        <div className="w-1/4" />
        <motion.div
          className="flex flex-col items-end w-1/4 pr-20 fixed top-20"
          initial={{ opacity: 0 }}
          animate={{
            opacity: inView ? 0 : 1,
            y: inView ? -20 : 0,
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
                      idx < currentSectionIdx ? "bg-gray-200" : ""
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
            <Fragment key={s.id}>
              <div className="pb-8" id={s.id} />
              <div className={`flex flex-col mb-8`}>
                <span
                  className={`font-bold text-xl mb-2 flex items-center text-gray-700 ${lilita.className}`}
                >
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
            </Fragment>
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
      sections: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
  };
};
