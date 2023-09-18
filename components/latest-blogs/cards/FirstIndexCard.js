import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../../utils/format-date";

const FirstIndexCard = ({ blog }) => {
  return (
    <Link
      key={blog.id}
      href={`/noticias/${blog._id}`}
      className="w-full h-[calc(400px)] rounded-md overflow-hidden sm:bg-black col-span-full md:col-span-2 relative shadow-xl cursor-pointer"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_URI}/${blog.img}`}
        width={500}
        height={300}
        layout={"fill"}
        alt={blog.title}
        objectFit={"cover"}
        className={"h-[65%] sm:h-full w-full object-cover sm:opacity-75"}
      ></Image>
      <div className="px-[calc(10px)] sm:h-fit flex-1 bg-white sm:bg-transparent py-2 flex flex-col gap-3 absolute bottom-0 pb-5 w-full">
        <span className=" font-semibold text-[calc(15px)] text-gray-500 sm:text-gray-100">
          {formatDate(blog.createdAt)}
        </span>
        <p className="font-bold text-[calc(20px)] text-black sm:text-white line-clamp-3">
          {blog.title}
        </p>
      </div>
    </Link>
  );
};

export default FirstIndexCard;
