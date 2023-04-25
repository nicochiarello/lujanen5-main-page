import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import ScrollContainer from "react-indiana-drag-scroll";

const Navbar = ({ category, categories }) => {
  const router = useRouter();
  // const [categories, setCategories] = useState([]);
  const element = useRef();


  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URI}/api/categories/all`)
  //     .then((res) => {
  //       setCategories(res.data.categories);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <header className="w-full h-fit flex justify-center shadow-lg">
      <div className=" bg-white w-full h-full flex flex-col justify-between items-center">
        <Link
          href={"/"}
          className="py-3 text-[40px] md:text-[calc(50px)] abril-font"
        >
          Luján en 5<span className="main-color">’</span>{" "}
        </Link>

        <nav
          className="w-full overflow-x-scroll max-w-[1280px] scrollbar-hide px-2"

          // onWheel={(e) => {
          //   e.preventDefault();
          //   element.current.scrollLeft =
          //     element.current.scrollLeft + e.deltaY + e.deltaX;
          // }}
        >
          <ScrollContainer>
            <ul className="flex min-w-full w-fit px-4 whitespace-nowrap m-auto gap-10 items-center  text-[calc(18px)] justify-center py-4  border-t-[calc(0.5px)] line ">
              <Link
                href={"/"}
                className={
                  router.asPath === "/" &&
                  "main-color border-main cursor-pointer"
                }
              >
                Inicio
              </Link>
              {categories.map((i) => {
                return (
                  <Link
                    href={`/categoria/${i._id}`}
                    key={i._id}
                    className={
                      i._id === category &&
                      "main-color border-main cursor-pointer flex-nowrap "
                    }
                  >
                    {i.title}
                  </Link>
                );
              })}
            </ul>
          </ScrollContainer>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
