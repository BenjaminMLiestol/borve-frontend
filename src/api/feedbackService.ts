import { client } from "@/api/client";
import { ErrorFeedback } from "@/types/models/models";

export const postFeedback = (data: ErrorFeedback) => client.post("feedback/", data);

export const getFeedbackList = async () => {
	const response = await client.get<ErrorFeedback[]>("feedback/list");
	return response.data;
};
