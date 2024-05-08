import { ErrorComponent } from "@/components/Error";
import { createFileRoute } from "@tanstack/react-router";

export const IndexComponent = () => {
	return <p>hello</p>;
};

export const Route = createFileRoute("/")({
	component: IndexComponent,
	errorComponent: ErrorComponent,
});
