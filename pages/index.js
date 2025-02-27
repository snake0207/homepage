import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { Autoplay, EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper.min.css';
import "swiper/css";
import "swiper/css/effect-cards";
import { getListPage } from "../lib/contentParser";
import { useEffect, useRef, useState } from "react";
import { FetchImage } from "@lib/utils/imageDom";

const Home = ({ frontmatter }) => {
  const { banner, about, business, solutions, works, patent } = frontmatter;
  const { title } = config.site;
  const [swiperSize, setSwiperSize] = useState({ width: 0, height: 0 });
  const swiperRef = useRef(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [slideEffect, setSlideEffect] = useState({
    effect: "cards",
    module: EffectCards,
    data: [],
  });
  const styleTitle = {
    fontSize: slidesPerView === 1 ? "42px" : "62px",
    wordBreak: "keep-all",
  };

  useEffect(() => {
    const handleResize = () => {
      // console.log('window : ', window.innerWidth);
      if (window.innerWidth >= 768) {
        setSlidesPerView("auto");
        setSlideEffect({
          effect: "cards",
          module: EffectCards,
          data: works?.pc_images,
        });
      } else {
        setSlidesPerView(1);
        setSlideEffect({
          effect: "cards",
          module: EffectCards,
          data: works?.mob_images,
        });
      }

      // Swiper 크기 설정
      if (swiperRef.current) {
        setSwiperSize({
          width: swiperRef.current.clientWidth * 0.4,
          height: swiperRef.current.clientHeight * 0.5,
        });
      }
    };

    handleResize(); // 초기 렌더링 시 실행
    window.addEventListener("resize", handleResize);

    // 클린업 함수로 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, [works?.pc_images, works?.mob_images]);

  return (
    <Base title={title}>
      {/* Banner */}
      <section
        id="home"
        className="section"
        style={{
          backgroundImage: process.env.NEXT_PUBLIC_IMAGEPATH
            ? `url(
            ${process.env.NEXT_PUBLIC_IMAGEPATH}${banner?.background}
          )`
            : `url(${banner?.background})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row text-center">
            <div className="mx-auto text-left md:col-10">
              <div>
                <h2 className="mt-2 text-white" style={styleTitle}>
                  {markdownify(banner.content)}
                </h2>
                <h2 className="mt-2 text-white" style={styleTitle}>
                  {markdownify(banner.subContent)}
                </h2>
              </div>

              {banner.button.enable && (
                <Link
                  className="btn btn-primary mr-4 mt-16 md:mt-24"
                  href={
                    process.env.NEXT_PUBLIC_DOCPATH
                      ? `${process.env.NEXT_PUBLIC_DOCPATH}${banner.button?.link}`
                      : `${banner.button?.link}`
                  }
                  rel={banner.button?.rel}
                  target="_blank"
                >
                  {slidesPerView === 1 ? (
                    <h5 className="text-gray-200">{banner.button?.label}</h5>
                  ) : (
                    <h4 className="text-gray-200">{banner.button?.label}</h4>
                  )}
                </Link>
              )}
              {banner.recruit?.enable && (
                <Link
                  className="btn btn-outline-primary"
                  href={process.env.NEXT_PUBLIC_RECRUITURL}
                  rel={banner.recruit?.rel}
                  target="_blank"
                >
                  {slidesPerView === 1 ? (
                    <h5 className="text-gray-200">{banner.recruit?.label}</h5>
                  ) : (
                    <h4 className="text-gray-200">{banner.recruit?.label}</h4>
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="mt-2" style={styleTitle}>
              {markdownify(about.title)}
            </h2>
          </div>

          <div className="mt-16 grid gap-x-6 gap-y-6 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
            {about.items.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white p-2 pb-8 text-center"
                key={`about-${i}`}
              >
                <div className="mt-4">
                  {markdownify(item.name, "h4", "h5")}
                  <h2 className="mt-6 text-5xl">{markdownify(item.content)}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business */}
      <section
        id="business"
        className="section"
        style={{
          backgroundImage: process.env.NEXT_PUBLIC_IMAGEPATH
            ? `url(
            ${process.env.NEXT_PUBLIC_IMAGEPATH}${business?.background}
          )`
            : `url(${business?.background})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="text-center">
            <h2 className="mt-2 text-white" style={styleTitle}>
              {markdownify(business.title)}
            </h2>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-1 md:mt-24 md:grid-cols-2 md:gap-8">
            {business?.items.map((item, index) => (
              <div
                className="m-4 mb-6 grid grid-cols-1 md:grid-cols-1"
                key={index}
              >
                <div className="flex items-center justify-center">
                  <FetchImage
                    className="rounded-3xl"
                    src={
                      process.env.NEXT_PUBLIC_IMAGEPATH
                        ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${item.image}`
                        : `${item.image}`
                    }
                    style={{
                      width: slidesPerView === 1 ? "70%" : "90%",
                      height: "auto",
                      border: "3px solid rgb(229,231,235)",
                    }}
                    alt="제공 서비스 설명"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
                <div className="mt-6 flex items-center justify-center md:mt-8">
                  <h1 className="text-3xl text-white md:text-4xl">
                    {markdownify(item.name)}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* solutions */}
      <section
        id="solutions"
        className="section"
        style={{
          backgroundImage: process.env.NEXT_PUBLIC_IMAGEPATH
            ? `url(
            ${process.env.NEXT_PUBLIC_IMAGEPATH}${solutions?.background}
          )`
            : `url(${solutions?.background})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container md:pl-0 md:pr-0">
          <div className="text-center">
            <h2 className="mt-2" style={styleTitle}>
              {markdownify(solutions.title)}
            </h2>
          </div>

          <div
            className="m-4 mt-16 grid grid-cols-1 gap-4 sm:m-24 sm:gap-8 md:mt-24 md:grid-cols-2 lg:grid-cols-3"
            // style={{ border: "1px solid red" }}
          >
            {/* Content  */}
            {solutions?.items.map((item, i) => (
              <div
                className="rounded-xl p-4 pb-16 pt-16 shadow"
                key={`solutions-${i}`}
                style={{ border: "1px solid #ddd" }}
              >
                <div className={"flex items-center justify-center"}>
                  <FetchImage
                    src={
                      process.env.NEXT_PUBLIC_IMAGEPATH
                        ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${item?.image}`
                        : `${item?.image}`
                    }
                    alt={`${item.content}`}
                    width={150}
                    height={150}
                    className={"rounded-[50%] p-4"}
                    style={{ border: "1px solid #ccc" }}
                  />
                </div>
                <div className="mt-20 grid grid-cols-1 text-center">
                  <h1 className="mb-4 text-2xl font-bold text-gray-400">
                    {`"${item.name}"`}
                  </h1>
                  <h2 className="mb-1 text-xl sm:text-3xl md:text-2xl">
                    {item?.content_1}
                  </h2>
                  <h2 className="text-xl sm:text-3xl md:text-2xl">
                    {item?.content_2}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* works */}
      <section
        id="works"
        key="work"
        className="section"
        style={{
          backgroundImage: process.env.NEXT_PUBLIC_IMAGEPATH
            ? `url(
            ${process.env.NEXT_PUBLIC_IMAGEPATH}${works.background}
          )`
            : `url(${works.background})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className={"service-content text-center"}>
            <h2 className="mt-2  text-white" style={styleTitle}>
              {markdownify(works?.title)}
            </h2>
          </div>
        </div>

        <div ref={swiperRef} className="mt-16 md:mt-24">
          {slideEffect.data.length > 0 && (
            <Swiper
              loop={true}
              slidesPerView={"auto"}
              centeredSlides={true}
              modules={[Autoplay, slideEffect.module]}
              effect={slideEffect.effect}
              cardsEffect={{
                slideShadows: false,
              }}
              autoplay={{
                delay: 3000,
              }}
            >
              {slideEffect.data.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FetchImage
                    src={
                      process.env.NEXT_PUBLIC_IMAGEPATH
                        ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${slide}`
                        : `${slide}`
                    }
                    alt="project"
                    width={swiperSize.width}
                    height={swiperSize.height}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Patent */}
      <section
        id="patent"
        className="section bg-theme-light"
        style={{
          backgroundImage: process.env.NEXT_PUBLIC_IMAGEPATH
            ? `url(
            ${process.env.NEXT_PUBLIC_IMAGEPATH}${patent?.image}
          )`
            : `url(${patent?.image})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div>
            <h2 className="mt-2 text-center" style={styleTitle}>
              {markdownify(patent.title)}
            </h2>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-6 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
            {patent.items.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
                key={`feature-${i}`}
              >
                <div>
                  <FetchImage
                    src={
                      process.env.NEXT_PUBLIC_IMAGEPATH
                        ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${item}`
                        : `${item}`
                    }
                    width={320}
                    height={400}
                    alt="특허 및 수상내역"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
