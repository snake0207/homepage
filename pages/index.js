import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { Autoplay, EffectCards, EffectCoverflow, EffectCube } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper.min.css";
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-coverflow';
import { getListPage } from "../lib/contentParser";
import { useEffect, useRef, useState } from "react";

const useDevice = () => {
  const { width, height } = useWindowDimensions();

  console.log('useWindowDimensions : ', width, height);

  if (width >= 1280) return {slidesPerView: 3, spaceBetween: 30};
  else if (width < 1280 && width >= 768)  return {slidesPerView: 2, spaceBetween: 20};
  else  return {slidesPerView: 1, spaceBetween: 10};
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      console.log('window : ', window.innerWidth);
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
  const { banner, feature, works, services, patent } = frontmatter;
  const { title } = config.site;
  const [swiperSize, setSwiperSize] = useState({ width: 0, height: 0 });
  const swiperRef = useRef(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [slideEffect, setSlideEffect] = useState({ 
    effect: 'card',
    module: EffectCards,
    data: []});

  useEffect(() => {
    const handleResize = () => {
      // console.log('window : ', window.innerWidth);
      if (window.innerWidth >= 768) {
        setSlidesPerView('auto')
        setSlideEffect({effect: 'cards', module: EffectCards, data: works?.pc_images});
      }
      else {
        setSlidesPerView(1)
        setSlideEffect({effect: 'cards', module: EffectCards, data: [...works?.mob_images]});
      }

      // Swiper 크기 설정
      if (swiperRef.current) {
        setSwiperSize({
          width: swiperRef.current.clientWidth * 0.5,
          height: swiperRef.current.clientHeight * 0.6
        })
      }
    };

    handleResize(); // 초기 렌더링 시 실행
    window.addEventListener("resize", handleResize);

    // 클린업 함수로 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  console.log('slideEffect : ', slideEffect);

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
                <h2 className="mt-8 text-white" style={{ fontSize: slidesPerView === 1 ? "28px" : "44px", wordBreak: "keep-all" }}>
                  {markdownify(banner.content)}
                </h2>
                <h2 className="mt-2 text-white" style={{ fontSize: slidesPerView === 1 ? "28px" : "44px", wordBreak: "keep-all" }}>
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
        </div>

        <div ref={swiperRef} className="mt-12">
            { slideEffect.data.length > 0 && (
            <Swiper
              loop={true}
              slidesPerView={'auto'}
              centeredSlides={true}
              modules={[Autoplay, slideEffect.module]}
              effect={slideEffect.effect}
              cardsEffect={{
                slideShadows: false,
                rotate: true,
              }}
              autoplay={{
                delay: 3000,
              }}
            >
              { 
                slideEffect.data.map((slide, index) => (
                <SwiperSlide key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
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
            )
            }
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
              <img
                src={
                  process.env.NEXT_PUBLIC_IMAGEPATH
                    ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${services.image}`
                    : `${services.image}`
                }
                alt="tech cloud "
                width={700}
                height={400}
              />
            </div>
            {/* Content */}
            <div className={`service-content mt-5 md:mt-0`}>
              {services?.items.map((item, index) => (
                <div className="mt-6 ml-4 flex" key={index}>
                  <img
                    className="mr-4"
                    src={process.env.NEXT_PUBLIC_IMAGEPATH ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${services.check}` : `${services.check}`}
                    width={24}
                    height={24}
                    alt="설명 강조"
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

      {/* Patent */}
      <section id="patent" className="section bg-theme-light"
        style={{
          backgroundImage: process.env.NEXT_PUBLIC_IMAGEPATH
            ? `url(
            ${process.env.NEXT_PUBLIC_IMAGEPATH}${patent.image}
          )`
            : `url(${patent.image})`,
          backgroundSize: "cover",
        }}      
      >
        <div className="container">
          <div>
            <h2 className="text-center font-bold text-white">
              {markdownify(patent.title)}
            </h2>
          </div>
          <div className="mt-12" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: "wrap"}}>
            {patent.items.map((item, i) => (
              <div
                // className="mt-8 feature-card rounded-xl bg-white p-5 pb-8"
                className="mt-8 rounded-xl bg-white p-5 pb-8"
                key={`feature-${i}`}
              >
                <div>
                <img
                    src={process.env.NEXT_PUBLIC_IMAGEPATH ? `${process.env.NEXT_PUBLIC_IMAGEPATH}${item}` : `${item}`}
                    width={300}
                    height={600}
                    alt="보유 특허"
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
