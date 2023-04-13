import React from "react";
import parse from "html-react-parser";
import { formatDate } from "../../utils/format-date";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Slider from "../../components/react-slider";
import Footer from "../../components/footer/Footer";

const SinglePage = ({ blog, latest }) => {
  return (
    <div className="bg-gray-200">
      <Head>
        <title>{blog.title}</title>
      </Head>

      <Navbar />

      <section className="max-w-[calc(900px)] relative h-fit m-auto overflow-hidden">
        <p className="mt-5 w-fit font-semibold px-6 text-white bg-red-600 flex justify-between">
          <span className="">{blog.category?.title}</span>{" "}
        </p>

        <h3 className="text-[calc(42px)] font-semibold leading-[45px] mb-5 mt-1">
          {blog.title}
        </h3>
        <p className="text-2xl my-2">{blog.copete}</p>
        <Image
          width={800}
          height={900}
          className="w-full max-h-[calc(40rem)] object-cover  mb-2 mt-4"
          src={`${process.env.NEXT_PUBLIC_IMG_URI}/${blog.img}`}
          alt=""
        />
        <p className="my-2 text-sm font-semibold">
          {formatDate(blog.createdAt)}
        </p>
        <div className="w-full text-xl font-serif font-light flex ">
          <div className="w-full max-w-[700px] py-5 leading-[28px]">
            {parse(blog.body)}
          </div>
        </div>
      </section>
      <div className="my-6 w-full max-w-[900px] m-auto">
        <Slider category={latest} />
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const getSingleItem = await fetch(
    `${process.env.API_URI}/api/blogs/${context.params.id}`
  );
  const data = await getSingleItem.json();

  return {
    props: {
      blog: data.blog,
      latest: data.latest,
    },
  };
}

export default SinglePage;
