import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
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
              // initial={{
              //   opacity: 0,
              //   x: "100%",
              //   // y: "50%",
              // }}
              // animate={
              //   {
              //     // opacity: isActive ? 1 : 0,
              //     // x: isActive ? 0 : "-100%",
              //     // transitionDuration: isActive ? 0.5 : 0,
              //     // // y: isActive ? 0 : "100%",
              //   }
              // }
              id="home"
              style={{
                backgroundImage: `url(${el.img})`,
              }}
              className="relative bg-cover bg-center bg-no-repeat"
            >
              <div className="absolute inset-0 bg-white/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-primary/50 sm:to-white/25"></div>

              <motion.div
                className="relative mx-28 max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                // initial="offscreen"
                // whileInView="onscreen"
                // viewport={{ once: true, amount: 0.8 }}
              >
                <div className="max-w-3xlxl text-center sm:text-left">
                  <motion.h1
                    initial={{ x: 100, opacity: 0 }}
                    animate={{
                      x: isActive ? 0 : 100,
                      opacity: isActive ? 1 : 0,
                      transitionDuration: 0.5,
                    }}
                    className="text-5xl sm:text-5xl"
                  >
                    {el.quote.split(",")[0]}
                    <span className="block text-primary">
                      {el.quote.split(",")[1]}.
                    </span>
                  </motion.h1>

                  <p className="mt-4 max-w-lg sm:text-2xl text-2xl sm:leading-relaxed text-gray-900">
                    Buy and sell your used books at the best price
                  </p>

                  <motion.div
                    initial={{ y: 300, opacity: 0, transitionDuration: 0.3 }}
                    animate={{
                      y: isActive ? 0 : 300,
                      opacity: isActive ? 1 : 0,
                    }}
                    className="mt-8 flex gap-2 text-center"
                  >
                    <PrimaryBtn
                      className={"sm:w-max bg-primary-100 h-12 w-full"}
                      to={`/#categories`}
                    >
                      Explore Now <ShoppingCartIcon className="w-3 h-3" />
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
