import React from "react";
import parse from "html-react-parser";
import { formatDate } from "../../utils/format-date";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Slider from "../../components/react-slider";
import Footer from "../../components/footer/Footer";

const SinglePage = ({ blog, latest, categories }) => {
  return (
    <div className="bg-gray-200">
      <Head>
        <title>{blog.title}</title>
        <meta name="og:title" content={blog.title} />
        <meta name="og:type" content="article" />
        <meta
          name="og:url"
          content={`https://www.lujanen5.com/noticias/${blog._id}`}
        />
        <meta
          name="og:image"
          content={`${process.env.NEXT_PUBLIC_IMG_URI.replace("http", "https")}/${blog.img}`}
        />
        <meta name="og:description" content={blog.copete} />
      </Head>

      <Navbar category={blog.category._id || null} categories={categories} />

      <section className="max-w-[calc(1020px)] px-2 md:px-0 relative h-fit m-auto overflow-hidden">
        <p className="mt-5 w-fit font-semibold px-6 text-white bg-red-600 flex justify-between">
          <span className="">{blog.category?.title}</span>{" "}
        </p>

        <h3 className="text-[28px] md:text-[calc(42px)] font-semibold md:leading-[45px] mb-5 mt-1">
          {blog.title}
        </h3>
        <p className="text-xl md:text-2xl my-2">{blog.copete}</p>
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
          <div className="w-full max-w-[700px] h-fit py-5 flex flex-col gap-2 leading-[28px]">
            {parse(blog.body)}
          </div>
        </div>
      </section>
      <div className="my-6 w-full max-w-[1020px] m-auto">
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

  const getCategories = await fetch(
    `${process.env.API_URI}/api/categories/all`
  );

  const categoriesData = await getCategories.json();

  return {
    props: {
      blog: data.blog,
      latest: data.latest,
      categories: categoriesData.categories
    },
  };
}

export default SinglePage;
