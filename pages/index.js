import Head from "next/head";
import Slider from "../components/react-slider/index";
import Navbar from "../components/navbar";
import Footer from "../components/footer/Footer";
import Latest from "../components/latest-blogs/Latest";
import MainBlog from "../components/main-blog/MainBlog";

export default function Home({ latest, categories }) {
  return (
    <div>
      <Head>
        <title>Luján en 5&apos; </title>
        <meta
          name="description"
          content="Diario informativo sobre Mendoza, Luján de Cuyo y mucho mas"
          key="desc"
        />
      </Head>

      <div className="w-full flex justify-center flex-col items-center bg-gray-200">
        <Navbar categories={categories} />

        {latest.length && categories.length ? (
          <section className="w-full max-w-[1280px] h-fit justify-center py-10 flex-col flex items-center gap-16 ">
            <MainBlog blog={latest[0]} />
            <Latest latest={latest} />
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
