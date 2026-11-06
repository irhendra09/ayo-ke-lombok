// Klien API ke backend FastAPI. Request dikirim ke path relatif /api/v1/*
// dan di-proxy oleh Next.js (lihat next.config.mjs).
//
// Kontrak yang diasumsikan (sesuaikan jika backend Anda berbeda):
//   POST /api/v1/chat
//     body : { tenant_id, customer_id, message }
//     resp : { answer: string }   (juga diterima: reply / response)
//   POST /api/v1/documents   (multipart/form-data)
//     fields: tenant_id, title, file
//     resp : JSON bebas (opsional: { message, chunks })

export const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "lombok-demo";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function readError(res: Response) {
  try {
    const data = await res.json();
    const detail = data?.detail ?? data?.message ?? data?.error;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg as string;
  } catch {
    // body bukan JSON
  }
  return `Permintaan gagal (HTTP ${res.status})`;
}

export async function sendChat(params: {
  tenantId: string;
  customerId: string;
  message: string;
  signal?: AbortSignal;
}): Promise<string> {
  const res = await fetch("/api/v1/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tenant_id: params.tenantId,
      customer_id: params.customerId,
      message: params.message,
    }),
    signal: params.signal,
  });
  if (!res.ok) throw new ApiError(await readError(res), res.status);
  const data = await res.json();
  const answer = data?.answer ?? data?.reply ?? data?.response;
  if (typeof answer !== "string" || !answer.trim()) {
    throw new ApiError("Respons AI kosong atau formatnya tidak dikenali.", 502);
  }
  return answer;
}

export async function uploadDocument(params: {
  tenantId: string;
  title: string;
  file: File;
}): Promise<{ message?: string; chunks?: number }> {
  const form = new FormData();
  form.append("tenant_id", params.tenantId);
  form.append("title", params.title);
  form.append("file", params.file);

  const res = await fetch("/api/v1/documents", { method: "POST", body: form });
  if (!res.ok) throw new ApiError(await readError(res), res.status);
  try {
    return await res.json();
  } catch {
    return {};
  }
}
