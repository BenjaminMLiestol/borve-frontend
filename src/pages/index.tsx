import { ErrorComponent } from "@/components/Error";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./-components/-index/Header";
import { Features } from "./-components/-index/Features";
import { About } from "./-components/-index/About";
import { Services } from "./-components/-index/Services";
import { Testimonials } from "./-components/-index/Testimonials";
// import { Team } from "./-components/-index/Team";
import { Contact } from "./-components/-index/Contact";
import { useState, useEffect } from "react";
import JsonData from "@/data/data.json";
import { LandingPageData, initialLandingPageData } from "@/types/models/landingpage";

export const IndexComponent = () => {
	const [landingPageData, setLandingPageData] = useState<LandingPageData>(initialLandingPageData);

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

	return (
		<>
			<Header data={landingPageData.Header} />
			<Features data={landingPageData.Features} />
			<About data={landingPageData.About} />
			<Services data={landingPageData.Services} />
			<Testimonials data={landingPageData.Testimonials} />
			{/* <Team data={landingPageData.Team} /> */}
			<Contact data={landingPageData.Contact}  />
		</>
	)
};

export const Route = createFileRoute("/")({
	component: IndexComponent,
	errorComponent: ErrorComponent,
});
