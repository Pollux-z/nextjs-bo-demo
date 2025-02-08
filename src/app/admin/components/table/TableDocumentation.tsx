'use client'

import React from 'react'
import { useGetDocumentations } from '@/app/services/queries'
import {IDocumentation} from '../../../../interfaces/Documentation'

const TableDocumentation: React.FC = () => {
    const {data: getDocumentations} = useGetDocumentations()
    const documentations: IDocumentation[] = getDocumentations?.totalDocumentations
  
  return (
    <>
    <table className="table-auto w-full text-left mt-5 ">
        <thead className="border-b">
          <tr className="*:py-3 *:px-3 *:font-normal text-sm">
            <th className="rounded-s-md">ID</th>
            <th className="">Title</th>
            <th className="">Discription</th>
            <th className="">Active</th>
            <th className="">File</th>
            <th className="text-center">Remark</th>
          </tr>
        </thead>
        <tbody className="">
        {documentations?.map((documentation, index) => (
            <tr key={index} className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16">
              <td className="min-w-24 max-w-32">{documentation.id}</td>
            <td className="max-w-80">{documentation.title}</td>
            <td className="">{documentation.description}</td>
            <td className="">{documentation.isActive  ? "Active" : "Disable"}</td>
            <td>{documentation.url}</td>
            <td className="text-center">{documentation.remark}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </>
  )
}

export default TableDocumentation