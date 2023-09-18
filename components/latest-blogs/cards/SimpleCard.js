import Image from "next/image";
import { formatDate } from "../../../utils/format-date";
import Link from "next/link";

const SimpleCard = ({ blog }) => {
  return (
    <Link
      href={`/noticias/${blog._id}`}
      className="w-full h-[calc(400px)] bg-white rounded-md shadow-md overflow-hidden relative cursor-pointer"
    >
      <div className="w-full h-[calc(250px)] relative ">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG_URI}/${blog.img}`}
          layout={"fill"}
          width={500}
          height={300}
          alt={blog.title}
          objectFit={"cover"}
          className={"h-full w-full object-cover"}
        ></Image>
      </div>
      <div className="px-[calc(10px)] py-2 flex flex-col gap-3">
        <span className=" font-semibold text-[calc(15px)] text-gray-500">
          {formatDate(blog.createdAt)}
        </span>
        <p className="font-bold text-[calc(20px)] line-clamp-3">{blog.title}</p>
      </div>
    </Link>
  );
};

export default SimpleCard;
