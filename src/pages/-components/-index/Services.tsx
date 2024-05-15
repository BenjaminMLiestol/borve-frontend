/* eslint-disable @typescript-eslint/no-explicit-any */

import { Service } from "@/types/models/landingpage";

export const Services = (props: any) => {
  return (
    <div id="services" className="py-24 mx-auto max-w-[1170px] text-center px-5 sm:px-0">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d: Service, i: number) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};