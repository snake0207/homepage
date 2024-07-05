import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";
import { useEffect, useState } from "react";

const useDevice = () => {
  const { width, height } = useWindowDimensions();

  if (width >= 1024) return 3;
  else if (width < 1024 && width >= 768) return 2;
  else return 1;
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // 초기 렌더링 시 실행
    window.addEventListener("resize", handleResize);

    // 클린업 함수로 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

const Home = ({ frontmatter }) => {
  const { banner, feature, works, services } = frontmatter;
  const { title } = config.site;
  const deviceView = useDevice();

  return (
    <Base title={title}>
      {/* Banner */}
      <section
        id="home"
        className="section"
        style={{
          backgroundImage: process.env.NEXT_PUBLIC_IMAGEPATH
            ? `url(
            ${process.env.NEXT_PUBLIC_IMAGEPATH}${banner.image}
          )`
            : `url(${banner.image})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row text-center">
            <div className="mx-auto text-left md:col-10">
              <p className="text-white">&quot;{banner.title}&quot;</p>

              <div>
                <h2 className="mt-8 text-white" style={{ fontSize: "44px", wordBreak: "keep-all" }}>
                  {markdownify(banner.content)}
                </h2>
                <h2 className="mt-2 text-white" style={{ fontSize: "44px", wordBreak: "keep-all" }}>
                  {markdownify(banner.subContent)}
                </h2>
              </div>
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mr-4 mt-24"
                  href={
                    process.env.NEXT_PUBLIC_DOCPATH
                      ? `${process.env.NEXT_PUBLIC_DOCPATH}${banner.button.link}`
                      : `${banner.button.link}`
                  }
                  rel={banner.button.rel}
                  target="_blank"
                >
                  {banner.button.label}
                </Link>
              )}
              {banner.recruit.enable && (
                <Link
                  className="btn btn-outline-primary mt-4"
                  href={
                    process.env.NEXT_PUBLIC_IMAGEPATH
                      ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${banner.recruit.link}`
                      : `${banner.recruit.link}`
                  }
                  rel={banner.recruit.rel}
                  target="_blank"
                >
                  {banner.recruit.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>{markdownify(feature.title)}</h2>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {feature.items.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
                key={`feature-${i}`}
              >
                <div className="mt-4">
                  {markdownify(item.name, "h5", "h6")}
                  <h2 className="mt-3">{item.content}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
      <section
        id={"works"}
        key={`work`}
        className={`section`}
        style={{
          backgroundImage: process.env.NEXT_PUBLIC_IMAGEPATH
            ? `url(
            ${process.env.NEXT_PUBLIC_IMAGEPATH}${works.image}
          )`
            : `url(${works.image})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className={`service-content`}>
            <h2 className="text-center font-bold leading-[40px] text-white">
              {works?.title}
            </h2>
          </div>

          <div className="mt-12">
            {/* Carousel */}
            <div
              style={{ width: deviceView == 1 ? "30%" : "20%", margin: "auto" }}
            >
              <div className={`service-carousel`}>
                <Swiper
                  loop={true}
                  slidesPerView={1}
                  spaceBetween={10}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                  }}
                >
                  {/* Slides */}
                  {works?.mob_images.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_IMAGEPATH
                            ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${slide}`
                            : `${slide}`
                        }
                        alt="project"
                        width={200}
                        height={400}
                        priority
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 ">
          <div
            style={{
              width: deviceView == 1 ? "80vw" : "100vw",
              margin: "auto",
            }}
          >
            {/* Carousel */}
            <div className={`service-carousel`}>
              <Swiper
                loop={true}
                slidesPerView={deviceView}
                spaceBetween={deviceView == 1 ? 20 : 30}
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              >
                {/* Slides */}
                {works?.pc_images.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGEPATH
                          ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${slide}`
                          : `${slide}`
                      }
                      alt="project"
                      width={500}
                      height={400}
                      priority
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section id="services" className="section ">
        <div className="container">
          <div className="text-center">
            <h2>{markdownify(services.title)}</h2>
          </div>

          <div className="mt-12 gap-8 gap-x-16 md:grid md:grid-cols-2">
            {/* Image */}
            <div className={`items-center service-content mt-5 md:mt-0`}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_IMAGEPATH
                    ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${services.image}`
                    : `${services.image}`
                }
                alt="tech cloud "
                width={700}
                height={400}
                priority
              />
            </div>
            {/* Content */}
            <div className={`service-content mt-5 md:mt-0`}>
              {services?.items.map((item, index) => (
                <div className="mt-6 ml-4 flex" key={index}>
                  <Image
                    className="mr-4"
                    src={process.env.NEXT_PUBLIC_IMAGEPATH ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${services.check}` : `${services.check}`}
                    width={24}
                    height={24}
                    alt="설명 강조"
                    priority
                  />
                  {/* {markdownify(item.name, "h4", "h5")} */}
                    {item.emphasis 
                      ? <h5><em>{item.name}</em></h5>
                      : <h5 className="text-text">{item.name}</h5>
                    }
                </div>
               ))}
            </div>
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
