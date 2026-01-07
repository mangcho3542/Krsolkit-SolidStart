export interface CopyPayload {
	data: string | Blob;
	type: "text/plain" | "text/html" | "image/png" | "image/jpeg" | "image/webp";
}

export async function copy(
	payload: string | CopyPayload | CopyPayload[]
): Promise<boolean> {
	if (typeof navigator === "undefined") return false;

	try {
		if (typeof payload === "string") {
			await navigator.clipboard.writeText(payload);
		} else if (Array.isArray(payload)) {
			const res = new ClipboardItem(
				payload.reduce<Record<CopyPayload["type"], Blob>>((acc, cur) => {
					acc[cur.type] =
						typeof cur.data === "string"
							? new Blob([cur.data], { type: cur.type })
							: cur.data;

					return acc;
				}, {} as Record<CopyPayload["type"], Blob>)
			);

			await navigator.clipboard.write([res]);
		} else {
			await navigator.clipboard.write([
				new ClipboardItem({
					[payload.type]:
						typeof payload.data === "string"
							? new Blob([payload.data], { type: payload.type })
							: payload.data,
				}),
			]);
		}

		return true;
	} catch (err) {
		console.error("copy utils 함수에서 오류남.\n", err);
		return false;
	}
}
