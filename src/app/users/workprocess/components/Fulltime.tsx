import React from "react";
import {
  CiMemoPad,
  CiPizza,
  CiShop,
  CiVideoOn,
} from "react-icons/ci";

const Fulltime:React.FC = () =>  {
  return (
    <>
      <div className="">
        <div className="relative max-w-2xl grid grid-cols-2">
          <div className="m-auto">
            <CiMemoPad size={100} className="text-gray-300" />
          </div>
          <div className="mt-6 border-l-4 border-dotted px-4">
            <p className="bg-blue-600 text-white p-1 w-8 h-8 flex justify-center rounded-full">
              1
            </p>
            <h5 className="mt-2 font-semibold">Full-time 1</h5>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              repudiandae aliquid doloribus accusamus assumenda quam eos quia
              quo, cum voluptates delectus cumque, magnam reprehenderit quis!
              Iste quam id quae quibusdam.
            </p>
          </div>
        </div>

        <div className="relative max-w-2xl grid grid-cols-2">
          <div className="text-right px-5">
            <div className="flex justify-end">
              <p className="bg-blue-600 text-white p-1 w-8 h-8 flex justify-center rounded-full">
                2
              </p>
            </div>
            <h5 className="mt-2 font-semibold">Full-time 2</h5>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              repudiandae aliquid doloribus accusamus assumenda quam eos quia
              quo, cum voluptates delectus cumque, magnam reprehenderit quis!
              Iste quam id quae quibusdam.
            </p>
          </div>

          <div className="mt-6 border-l-4 border-dotted flex justify-center items-center">
            <CiPizza size={100} className="text-gray-300" />
          </div>
        </div>

        <div className="relative max-w-2xl grid grid-cols-2">
          <div className="m-auto">
            <CiShop size={100} className="text-gray-300" />
          </div>

          <div className="mt-6 border-l-4 border-dotted px-4">
            <p className="bg-blue-600 text-white p-1 w-8 h-8 flex justify-center rounded-full">
              3
            </p>
            <h5 className="mt-2 font-semibold">Full-time 3</h5>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              repudiandae aliquid doloribus accusamus assumenda quam eos quia
              quo, cum voluptates delectus cumque, magnam reprehenderit quis!
              Iste quam id quae quibusdam.
            </p>
          </div>
        </div>

        <div className="relative max-w-2xl grid grid-cols-2">
          <div className="text-right px-5">
            <div className="flex justify-end">
              <p className="bg-blue-600 text-white p-1 w-8 h-8 flex justify-center rounded-full">
                4
              </p>
            </div>
            <h5 className="mt-2 font-semibold">Full-time 4</h5>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              repudiandae aliquid doloribus accusamus assumenda quam eos quia
              quo, cum voluptates delectus cumque, magnam reprehenderit quis!
              Iste quam id quae quibusdam.
            </p>
          </div>

          <div className="mt-6 border-l-4 border-dotted flex justify-center items-center">
            <CiVideoOn size={100} className="text-gray-300" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Fulltime;
