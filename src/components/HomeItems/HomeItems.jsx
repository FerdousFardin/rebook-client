import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
import { AnimatePresence, motion } from "framer-motion";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
function HomeItems({ id }) {
  const {
    isLoading,
    data: items,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["HomeItems"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/products?categoryId=${id}`).then(
        (res) => res.json()
      ),
  });
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span className="bg-white ' + className + '">' + "</span>";
    },
  };
  if (isLoading || isFetching) return <Loader color={"rgba(219, 60, 38, 1)"} />;
  if (error) return;
  if (!isLoading && !isFetching)
    return (
      <>
        <AnimatePresence>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            slidesPerView={3}
            centeredSlides={true}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            freeMode={true}
            pagination={pagination}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            modules={[Autoplay, Pagination, Navigation, FreeMode]}
            className="mySwiper min-h-h-52 p-4 bg-primary mt-5 rounded-md gap-1"
          >
            {items.map((item, idx) => (
              <SwiperSlide className={"p-4"} key={idx}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ delay: 0.25 }}
                  className="w-80 sm:w-52 md:w-60 lg:w-80 lg:h-[27rem] bg-white rounded-lg shadow-lg"
                >
                  <img
                    className="rounded-t-lg w-96 h-64"
                    src={item.img}
                    alt=""
                  />
                  <div className="py-4 pl-3">
                    <h1 className="hover:cursor-pointer mt-2 text-primary-100 text-2xl tracking-tight">
                      {item.name.length < 20
                        ? item.name
                        : item.name.slice(0, 20) + "..."}
                    </h1>
                    <h1 className="hover:cursor-pointer mt-2 font-medium text-xl tracking-tight">
                      Price: ${item.resalePrice}
                    </h1>
                  </div>
                  <SecondaryBtn to={`/item/${item._id}`}>See more</SecondaryBtn>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatePresence>
      </>
    );
}

export default HomeItems;
