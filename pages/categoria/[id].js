import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import Image from "next/image";
import { formatDate } from "../../utils/format-date";
import formatString from "../../utils/format-string";
import { useRouter } from "next/router";

const Category = ({ category }) => {
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter()

  useEffect(() => {
    setPage(1);
    setNbPages(1);
    setBlogs([]);
    setLoader(true);
  }, [category]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URI}/api/categories/info/${category._id}`,
        {
          cancelToken: source.token,
          params: {
            page: page,
          },
        }
      )
      .then((res) => {
        setLoader(false);
        setBlogs((prevBlogs) => {
          return [...new Set([...prevBlogs, ...res.data.blogs])];
        });
        setNbPages(res.data.totalPages);
      })
      .catch((err) => {});

    return () => {
      source.cancel();
    };
  }, [page, category]);

  const observer = useRef();

  const lastBlogChild = useCallback(
    (node) => {
      if (loader) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (page < nbPages) {
            setPage((prev) => prev + 1);
          }
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loader]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{category.title}</title>
      </Head>

      <Navbar category={category._id} />
      <div className="flex-1 bg-gray-200">
        <section className="w-full max-w-[1280px] m-auto h-fit justify-center py-10 flex-col flex items-center gap-16 ">
          {" "}
          <div className="w-full px-2 border font-semibold border-b-gray-400 py-4">
            <h2 className="text-2xl">{category.title}</h2>
          </div>
          <section className="w-full px-2 h-fit rounded-md grid sm:grid-cols-2 md:grid-cols-3 gap-[1rem] lg:gap-[calc(40px)]">
            {blogs.map((i, key) => {
              return key === 0 || key % 5 === 0 ? (
                <article
                  onClick={() => router.push(`/noticias/${i._id}`)}
                  key={i.id}
                  ref={blogs.length === key + 1 ? lastBlogChild : null}
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
                  ref={blogs.length === key + 1 ? lastBlogChild : null}
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
            {loader && (
              <div className="w-full h-full py-4 col-span-full flex items-center justify-center">
                <p>Cargando...</p>
              </div>
            )}
          </section>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const getCategory = await fetch(
    `${process.env.API_URI}/api/categories/id/${context.params.id}`
  );
  const data = await getCategory.json();

  return {
    props: {
      category: data.category,
    },
  };
}

export default Category;
