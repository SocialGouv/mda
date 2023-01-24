// eslint-disable-next-line @typescript-eslint/consistent-type-imports, @typescript-eslint/no-explicit-any
const fetch = (globalThis as any).fetch as typeof import("node-fetch").default;

interface FetchWebhookReturn {
  message?: string;
  statusCode: number;
}

export const fetchWebhook = async (type: keyof Strapi.Schemas, segment: string): Promise<FetchWebhookReturn> => {
  const url = new URL("/api/strapi/webhook", process.env.WEB_URL);

  try {
    const res = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.WEBHOOK_REVALIDATE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        segment,
      }),
      timeout: 10000,
    });
    if (res.ok) {
      return {
        statusCode: res.status,
      };
    }
    return {
      statusCode: res.status,
      message: await res.text(),
    };
  } catch (err) {
    return { statusCode: 500, message: (err as Error).message };
  }
};
