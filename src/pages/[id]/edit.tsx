import { Article, Section } from "@prisma/client";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { GetServerSideProps } from "next";
import { Quicksand } from "next/font/google";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { MdAdd, MdArrowDownward, MdArrowUpward } from "react-icons/md";
import prisma from "../../../lib/prisma";

const quicksand = Quicksand({ subsets: ["latin"] });

type Props = {
  article: Article & { sections: Section[] };
};

type Info = Pick<Props["article"], "title" | "about" | "sections">;

export default function Edit({ article }: Props) {
  const [info, setInfo] = useState<Info>({
    title: article.title,
    about: article.about,
    sections: article.sections,
  });
  const [addSectionID, setAddSectionID] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  const router = useRouter();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.target.name.includes("section")) {
        const s = e.target.name.split("-");
        setInfo((prev) => {
          const sidx = prev.sections.findIndex((_s) => _s.id === s[1]);
          (prev.sections as any)[sidx][s[2]] = e.target.value;
          return { ...prev };
        });
      } else {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    },
    []
  );

  const addNewSection = useCallback(
    (where: "before" | "after") => {
      const section = {
        id: nanoid(),
        head: "",
        body: "",
        createdAt: new Date(),
        articleId: article.id,
      };
      const sidx = info.sections.findIndex((s) => s.id === addSectionID);
      let sections: Section[] = [];

      if (where === "before") {
        sections = [
          ...info.sections.slice(0, sidx),
          section,
          ...info.sections.slice(sidx),
        ];
      } else {
        sections = [
          ...info.sections.slice(0, sidx + 1),
          section,
          ...info.sections.slice(sidx + 1),
        ];
      }

      setInfo({ ...info, sections });
      setAddSectionID(null);
    },
    [info, article, addSectionID]
  );

  const publishArticle = useCallback(() => {
    setPublishing(true);
    fetch("/api/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          router.replace(`/${data.articleId}`);
        }
      })
      .finally(() => {
        setPublishing(false);
      });
  }, [info, router]);

  useEffect(() => {
    if (Object.keys(article).length === 0) {
      router.replace("/");
    }
  }, [article, router]);

  if (Object.keys(article).length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center mt-20">
      <a
        href="#"
        className="mx-10 text-sm text-gray-600"
        onClick={() => router.back()}
      >
        <FaArrowLeft />
      </a>
      <div className={`flex flex-col mt-10 w-1/2 ${quicksand.className}`}>
        <input
          className="border outline-none m-2 p-2 text-xs"
          name="title"
          value={info.title}
          type="text"
          placeholder="Title"
          onChange={onChange}
        />
        <textarea
          className="border outline-none m-2 p-2 text-xs"
          rows={5}
          name="about"
          value={info.about}
          placeholder="About"
          spellCheck={false}
          onChange={onChange}
        ></textarea>
        <div className="my-8">
          {info.sections.map((s, i) => (
            <div key={s.id} className="flex mb-8 items-center">
              <span className="mx-2">{i + 1}.</span>
              <div className="flex flex-col w-[95%]">
                <input
                  className="border outline-none m-2 p-2 text-xs"
                  name={`section-${s.id}-head`}
                  value={s.head}
                  type="text"
                  placeholder="Head"
                  onChange={onChange}
                />
                <textarea
                  className="border outline-none m-2 p-2 text-xs"
                  name={`sections-${s.id}-body`}
                  value={s.body}
                  rows={5}
                  placeholder="Body"
                  spellCheck={false}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="flex flex-col mx-2">
                <div className="relative">
                  <button
                    className="bg-green-500 text-white text-xs p-2 mb-1 rounded-md"
                    onClick={() =>
                      setAddSectionID(addSectionID === s.id ? null : s.id)
                    }
                  >
                    <MdAdd />
                  </button>
                  {addSectionID === s.id && (
                    <motion.div
                      className="absolute bg-white border whitespace-nowrap rounded-md"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ fontSize: "0.6rem" }}
                    >
                      <span
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addNewSection("before")}
                      >
                        <MdArrowUpward />
                        &nbsp;Insert Above
                      </span>
                      <span
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addNewSection("after")}
                      >
                        <MdArrowDownward />
                        &nbsp;Insert Below
                      </span>
                    </motion.div>
                  )}
                </div>
                <button
                  className={`bg-red-500 text-white text-xs p-2 rounded-md ${
                    info.sections.length === 1 ? "opacity-50" : ""
                  }`}
                  disabled={info.sections.length === 1}
                  onClick={() =>
                    setInfo({
                      ...info,
                      sections: info.sections.filter((_s) => _s.id !== s.id),
                    })
                  }
                >
                  <AiOutlineMinus />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className={`bg-green-500 relative text-white mb-20 mx-auto flex items-center text-xs p-2 rounded-md font-bold ${
            publishing ? "bg-green-400" : ""
          }`}
          onClick={publishArticle}
        >
          {publishing && (
            <div className="w-5 h-5 border-2 border-t-0 left-9 rounded-full border-white absolute animate-spin" />
          )}
          <FaPaperPlane className="mr-2" /> Publish
        </button>
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
