import Link from "next/link";
import Image from "next/image";
import { formatDate } from "../../utils/format-date";

const SliderCard = ({ blog }) => {
  return (
    <Link
      href={`/noticias/${blog._id}`}
      className="w-[calc(280px)] h-[calc(300px)] bg-white rounded-md shadow-md overflow-hidden shrink-0 cursor-pointer"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_URI}/${blog.img}`}
        width="300"
        height="200"
        alt={blog.title}
        className="w-full h-[60%] object-cover"
      />
      <div className="px-2 h-[40%] py-2 flex flex-col gap-3 overflow-hidden">
        <span className="font-semibold text-sm text-gray-500">
          {formatDate(blog.createdAt)}
        </span>
        <div className="font-semibold flex-1">
          <p className="line-clamp-2 text-[20px]">{blog.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default SliderCard;
