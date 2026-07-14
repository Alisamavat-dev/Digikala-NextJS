import Carousel from "@/ui/carousel";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="w-full my-3 custom-navigation">
      <div className="w-full">
        <Carousel
          navigation
          slidesPerView={1}
          className="rounded-lg overflow-hidden"
        >
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/608ace6a51a08bd587cacc3595ca478f4b6b0fb1_1781107061.jpg?x-oss-process=image/quality,q_95/format,webp"
              alt="بنر 1"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/efcee0d8f4e7c91866cc543b0ba827747909c0a5_1781084112.gif?x-oss-process=image?x-oss-process=image/format,webp"
              alt="بنر 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/7f734cd22a6f45506de062c2f8070e8fa4abc156_1781442210.jpg?x-oss-process=image/quality,q_95/format,webp"
              alt="بنر 3"
              fill
              className="object-cover"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}