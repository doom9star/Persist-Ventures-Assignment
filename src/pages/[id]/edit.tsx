import { Article, Section } from "@prisma/client";
import { GetServerSideProps } from "next";
import { ChangeEvent, useCallback, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import prisma from "../../../lib/prisma";
import { useRouter } from "next/router";

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

  return (
    <div className="flex justify-center mt-20">
      <a
        href="#"
        className="mx-10 text-lg text-gray-600"
        onClick={() => router.back()}
      >
        <FaArrowLeft />
      </a>
      <div className="flex flex-col mt-10 w-1/2 font-mono">
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
        <div className="m-8">
          {article.sections.map((s) => (
            <div key={s.id} className="flex mb-8">
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
              <div className="flex flex-col m-2">
                <a
                  href={`#`}
                  className="bg-green-500 text-white text-xs p-2 mb-1 rounded-md"
                >
                  <MdAdd />
                </a>
                <a
                  href={`#`}
                  className="bg-red-500 text-white text-xs p-2 rounded-md"
                >
                  <AiOutlineMinus />
                </a>
              </div>
            </div>
          ))}
        </div>
        <a
          href={`#`}
          className="bg-green-500 text-white mb-20 mx-auto w-20 flex items-center text-xs p-2 rounded-md"
        >
          <FaPaperPlane className="mr-2" /> Publish
        </a>
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
        sections: true,
      },
    });
  }
  return {
    props: {
      article: article ? JSON.parse(JSON.stringify(article)) : {},
    },
  };
};
