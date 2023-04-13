import Head from "next/head";
import React, { useRef } from "react";
import Slider from "../components/react-slider/index";
import formatString from "../utils/format-string";
import { formatDate } from "../utils/format-date";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer/Footer";

export default function Home({ latest, categories }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Luján en 5&apos; </title>
      </Head>

      <div className="w-full flex justify-center flex-col items-center bg-gray-200">
        <Navbar categories={categories} />

        {latest.length && categories.length ? (
          <section className="w-full max-w-[1280px] h-fit justify-center py-10 flex-col flex items-center gap-16 ">
            <article
              onClick={() => router.push(`/noticias/${latest[0]._id}`)}
              className="w-full bg-black relative  h-[calc(550px)] sm:rounded-md shadow-md overflow-hidden cursor-pointer"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URI}/${latest[0].img}`}
                alt={latest[0].title}
                width={1200}
                height={900}
                className="h-full w-full object-cover opacity-75"
              ></Image>
              <div className="px-[calc(10px)] py-2 flex flex-col gap-3 absolute bottom-0 pb-5 w-full">
                <span className=" font-semibold text-[calc(15px)] text-gray-100">
                  {formatDate(latest[0].createdAt)}
                </span>
                <p className="font-bold text-[calc(28px)] text-white pr-10">
                  {formatString(latest[0].title, false)}
                </p>
              </div>
            </article>

            <section className="w-full px-2 h-fit rounded-md grid sm:grid-cols-2 md:grid-cols-3 gap-[1rem] lg:gap-[calc(40px)]">
              {latest.slice(1, 6).map((i, key) => {
                return key === 0 ? (
                  <article
                    onClick={() => router.push(`/noticias/${i._id}`)}
                    key={i.id}
                    className="w-full h-[calc(400px)] rounded-md overflow-hidden sm:bg-black col-span-full md:col-span-2  relative shadow-xl cursor-pointer"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMG_URI}/${i.img}`}
                      width={500}
                      height={300}
                      layout={"fill"}
                      alt={i.title}
                      objectFit={"cover"}
                      className={
                        "h-[65%] sm:h-full w-full object-cover sm:opacity-75"
                      }
                    ></Image>
                    <div className="px-[calc(10px)] h-[35%] sm:h-fit bg-white sm:bg-transparent py-2 flex flex-col gap-3 absolute bottom-0 pb-5 w-full">
                      <span className=" font-semibold text-[calc(15px)] text-gray-500 sm:text-gray-100">
                        {formatDate(i.createdAt)}
                      </span>
                      <p className="font-bold text-[calc(20px)] text-black sm:text-white">
                        {i.title}
                      </p>
                    </div>
                  </article>
                ) : (
                  <article
                    onClick={() => router.push(`/noticias/${i._id}`)}
                    className="w-full h-[calc(400px)] bg-white rounded-md shadow-md overflow-hidden relative cursor-pointer"
                  >
                    <div className="w-full h-[calc(250px)] relative ">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_URI}/${i.img}`}
                        layout={"fill"}
                        width={500}
                        height={300}
                        alt={i.title}
                        objectFit={"cover"}
                        className={"h-full w-full object-cover"}
                      ></Image>
                    </div>
                    <div className="px-[calc(10px)] py-2 flex flex-col gap-3">
                      <span className=" font-semibold text-[calc(15px)] text-gray-500">
                        {formatDate(i.createdAt)}
                      </span>
                      <p className="font-bold text-[calc(20px)]">
                        {formatString(i.title, false)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* //categorias */}
            {categories.map((i) => {
              if (i.blogs.length > 0) {
                return <Slider key={i.id} category={i} />;
              }
            })}
          </section>
        ) : (
          <div className="min-h-[calc(100vh-10rem)] flex justify-center items-center">
            <p>Estamos trabajando en traerte las mejores noticias</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const getInitialData = await fetch(
      `${process.env.API_URI}/api/categories/populatedInfo`
    );
    const initialData = await getInitialData.json();

    return {
      props: {
        latest: initialData.latest,
        categories: initialData.categories,
      },
    };
  } catch (error) {
    return {
      props: {
        latest: [],
        categories: [],
      },
    };
  }
}
