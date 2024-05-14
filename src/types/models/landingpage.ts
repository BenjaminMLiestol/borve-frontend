export interface LandingPageData {
  Header: {
    title: string;
    paragraph: string;
  };
  About: About;
  Gallery: {
    title: string;
    largeImage: string;
    smallImage: string;
  }[];
  Services: {
    icon: string;
    name: string;
    text: string;
  }[];
  Testimonials: {
    img: string;
    text: string;
    name: string;
  }[];
  Team: {
    img: string;
    name: string;
    job: string;
  }[];
  Contact: {
    address: string;
    phone: string;
    email: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
  Features: Feature[]
}

export interface Feature {
  icon: string;
  title: string;
  text: string;
}

export interface About {
  paragraph: string;
  Why: Why;
  Why2: Why;
}

export type Why = string[];

export const initialLandingPageData: LandingPageData = {
  Header: {
    title: "",
    paragraph: "",
  },
  About: {
    paragraph: "",
    Why: [],
    Why2: [],
  },
  Gallery: [],
  Services: [],
  Testimonials: [],
  Team: [],
  Contact: {
    address: "",
    phone: "",
    email: "",
    facebook: "",
    twitter: "",
    youtube: "",
  },
  Features: [],
};
