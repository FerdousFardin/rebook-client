import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import PrimaryBtn from "../../components/Buttons/PrimaryBtn";
import { motion } from "framer-motion";
import { Autoplay, Navigation, EffectFade } from "swiper";
import "./Banner.module.css";
import { bannnerItems } from "../../data/BannerItems";

export function Banner() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      speed={500}
      loop={true}
      touchRatio={1.5}
      effect={"fade"}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Navigation, EffectFade]}
      className="mySwiper h-[calc(100vh-6rem)]"
    >
      {bannnerItems.map((el, idx) => (
        <SwiperSlide key={idx}>
          {({ isActive, isNext }) => (
            <motion.section
              initial={{
                opacity: 0,
                scale: 2,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              id="home"
              style={{
                backgroundImage: `url(${el.img})`,
              }}
              className="relative bg-cover bg-center bg-no-repeat"
            >
              <div className="absolute inset-0  sm:bg-transparent bg-gradient-to-r from-white/40 to-white/25"></div>

              <motion.div className="relative mx-28 max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="max-w-3xlxl text-center sm:text-left">
                  <motion.h1
                    initial={{ x: 100, opacity: 0 }}
                    animate={{
                      x: isActive ? 0 : 100,
                      opacity: isActive ? 1 : 0,
                      transitionDuration: 0.5,
                    }}
                    className="text-3xl lg:text-5xl md:text-4xl sm:text-2xl"
                  >
                    {el.quote.split(",")[0]}
                    <span className="block text-primary-100">
                      {el.quote.split(",")[1]}.
                    </span>
                  </motion.h1>

                  <p className="mt-4 max-w-lg lg:text-2xl md:text-xl text-lg  sm:leading-relaxed text-gray-900">
                    Buy and sell your used books at the best price
                  </p>

                  <motion.div
                    initial={{ y: 300, opacity: 0 }}
                    animate={{
                      y: isActive ? 0 : 300,
                      opacity: isActive ? 1 : 0,
                    }}
                    className="mt-8 flex gap-2 text-center"
                  >
                    <PrimaryBtn
                      className={"sm:w-max bg-primary h-12 w-full"}
                      to={`/#categories`}
                    >
                      Explore Now
                    </PrimaryBtn>
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
{
  /*
   

      <motion.div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        
  */
}
