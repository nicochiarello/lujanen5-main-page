import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../utils/format-date";

const MainBlog = ({ blog }) => {
  return (
    <Link
      href={`/noticias/${blog._id}`}
      className="w-full bg-black relative  h-[calc(550px)] sm:rounded-md shadow-md overflow-hidden cursor-pointer"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_URI}/${blog.img}`}
        alt={blog.title}
        width={1200}
        height={900}
        className="h-full w-full object-cover opacity-75"
      ></Image>
      <div className="px-[calc(10px)] py-2 flex flex-col gap-3 absolute bottom-0 pb-5 w-full">
        <span className=" font-semibold text-[calc(15px)] text-gray-100">
          {formatDate(blog.createdAt)}
        </span>
        <p className="font-bold text-[calc(28px)] text-white pr-10 line-clamp-2">
          {blog.title}
        </p>
      </div>
    </Link>
  );
};

export default MainBlog;
