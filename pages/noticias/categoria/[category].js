import React from "react";
import Image from "next/image";
import { formatDate } from "../../../utils/format-date";
import formatString from "../../../utils/format-string";
import Navbar from "../../../components/navbar";
import Head from "next/head";
import { useRouter } from "next/router";

const Category = ({ category, posts, categoryList }) => {
    const router = useRouter()
  return (
    <div>
        <Head>
            <title>{category}</title>
        </Head>
        <Navbar categories={categoryList} />
      
      <section className="w-full h-fit justify-center py-10 flex-col flex items-center gap-16 bg-gray-200">
            <article className="w-[calc(1280px)] min-w-[calc(1280px)]  h-fit rounded-md grid grid-cols-3 gap-[calc(40px)] grid-flow-dense">
                {posts.map((i, key)=>{
                    return key % 6 === 0 ? (
                        <article onClick={()=> router.push(`/noticias/${i._id}`)}
                          key={i.id}
                          className="w-full h-[calc(400px)] rounded-md overflow-hidden bg-black col-span-2 relative shadow-xl "
                        >
                          <Image
                            src={i.img}
                            width={500}
                            height={300}
                            layout={"fill"}
                            alt={i.title}
                            objectFit={"cover"}
                            className={"h-full w-full object-cover opacity-75"}
                          ></Image>
                          <div className="px-[calc(10px)] py-2 flex flex-col gap-3 absolute bottom-0 pb-5 w-full">
                            <span className=" font-semibold text-[calc(15px)] text-gray-100">
                              {formatDate(i.createdAt)}
                            </span>
                            <p className="font-bold text-[calc(20px)] text-white">{i.title}</p>
                          </div>
                        </article>
                      ) : (
                        <article onClick={()=> router.push(`/noticias/${i._id}`)} className="w-full h-[calc(400px)] bg-white rounded-md shadow-md overflow-hidden relative">
                          <div className="w-full h-[calc(250px)] relative ">
                            <Image
                              src={i.img}
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
                              {formatString(
                                i.title
                              )}
                            </p>
                          </div>
                        </article>
                      );
                })}
            </article>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const category = context.params.category;
  const getData = await fetch(
    `http://localhost:3000/api/categories/populatedCategory/${category}`
  );
  const data = await getData.json();
  return {
    props: {
      category: data.category.title,
      posts: data.category.posts,
      categoryList: data.otherCategories
    },
  };
}

export default Category;
