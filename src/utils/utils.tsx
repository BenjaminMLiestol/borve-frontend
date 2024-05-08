export function formatDateTime(datetime: string): string {
	const parsedDateTime = new Date(datetime);
	const formattedDateTime = parsedDateTime.toISOString().slice(0, 19).replace("T", " ");
	return formattedDateTime;
}
