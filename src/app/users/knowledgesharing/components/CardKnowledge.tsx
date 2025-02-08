import React from "react";
import Image from "next/image";
import BtnView from "./BtnView";
import { contentKnowlegde, KnowledgeContent } from "@/app/db/knowledge";
import { useGetKnowledges } from "@/app/services/queries";
import { KnowledgeType } from "@/interfaces/Knowledge";

const CardKnowledge: React.FC = () => {
  const { data: getKnowledge } = useGetKnowledges();
  const knowledges: KnowledgeType[] = getKnowledge?.totalKnowledges;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
        {knowledges?.map((knowledge, index: number) => (
          <div
            key={index}
            className="grid grid-cols-2 min-w-[200px]  bg-gray-50 rounded-md shadow-md"
          >
            <div className="">
              <p className="absolute bg-green-600 text-white px-3 text-xs">
                {knowledge?.teamOwner}
              </p>
              <Image
                className="w-64 h-72 object-fill rounded-l-md"
                width={150}
                height={150}
                src={knowledge?.imgUrl}
                alt="cover card knowledge"
              />
            </div>
            <div className="p-2 flex flex-col justify-between max-h-40">
              <div>
                <h5 className="font-bold line-clamp-2">{knowledge?.title}</h5>
                <p className="text-xs max-h-20 line-clamp-3">
                  {knowledge?.description}
                </p>
              </div>
              <div className="">
                <BtnView href={`/users/knowledgesharing/views/${knowledge?._id}`} btnText={`View`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardKnowledge;
