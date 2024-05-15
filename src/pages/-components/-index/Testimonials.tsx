/* eslint-disable @typescript-eslint/no-explicit-any */

import { Testimonial } from "@/types/models/landingpage";

export const Testimonials = (props: any) => {
  return (
    <div id="testimonials" className="py-24 mx-auto max-w-[1170px] px-5 sm:px-0">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d: Testimonial, i: number) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="testimonial">
                    <div className="testimonial-image">
                      {" "}
                      <img src={d.img} alt="" />{" "}
                    </div>
                    <div className="testimonial-content">
                      <p>"{d.text}"</p>
                      <div className="testimonial-meta"> - {d.name} </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};