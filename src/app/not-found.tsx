import Image from "next/image";
import Link from "next/link";

import Img from "../../public/rb_7971.png";

export default function NotFound() {
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
        <div>
            <Image 
            src={Img}
            width={400}
            height={400}
            alt="404"   
            />
        </div>
      <div className="h-60 grid">
        <h2 className=" font-bold text-2xl">Opps!</h2>
        <h2 className=" font-bold text-9xl">404</h2>
        <p>Could not find requested resource</p>
        <Link href="/" className=" rounded-full px-4 py-2 text-center bg-yellow-300 mt-5">
          Go back to home
        </Link>
      </div>
    </div>
  );
}
