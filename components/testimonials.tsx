"use client";

import { User } from "@nextui-org/user";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ReactStars from "react-stars";

import { testimonials as data } from "@/config/site";

export default function TestimonialsCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 5000 })],
  );

  return (
    <div ref={emblaRef} className="embla overflow-hidden">
      <div className="embla__container flex">
        {data.map((testimonial, index) => (
          <div
            key={index}
            className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33%]"
          >
            <div className="bg-neutral-800 p-4 md:p-6 lg:mx-4 rounded-lg">
              <User
                avatarProps={{
                  src: testimonial.avatar_url + "?u=" + testimonial.username,
                }}
                description={testimonial.username}
                name={testimonial.name}
              />
              <ReactStars
                color2={"#ffd700"}
                count={5}
                edit={false}
                size={24}
                value={testimonial.rating}
              />
              <p>{testimonial.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
