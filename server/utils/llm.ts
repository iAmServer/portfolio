import Anthropic from "@anthropic-ai/sdk";

export const PROVIDERS: Record<Provider, ProviderInfo> = {
  anthropic: {
    label: "Anthropic",
    keyName: "anthropicApiKey",
    defaultModel: "claude-opus-5-5",
  },
  groq: {
    label: "Groq",
    keyName: "groqApiKey",
    defaultModel: "openai/gpt-oss-120b",
    baseUrl: "https://api.groq.com/openai/v1",
  },
  gemini: {
    label: "Google Gemini",
    keyName: "geminiApiKey",
    defaultModel: "gemini-2.5-flash",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
  },
  openrouter: {
    label: "OpenRouter",
    keyName: "openrouterApiKey",
    defaultModel: "meta-llama/llama-3.3-70b-instruct:free",
    baseUrl: "https://openrouter.ai/api/v1",
  },
};

export class LlmError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export function resolveProvider() {
  const config = useRuntimeConfig();
  const name = String(config.aiProvider || "anthropic").toLowerCase();
  if (!(name in PROVIDERS)) {
    console.error(
      `[ask] Unknown NUXT_AI_PROVIDER "${name}"; use one of ${Object.keys(
        PROVIDERS,
      ).join(", ")}`,
    );
    return undefined;
  }
  const provider = name as Provider;
  const info = PROVIDERS[provider];
  const apiKey = String(config[info.keyName] || "");
  if (!apiKey) return undefined;
  const baseUrl = String(config.aiBaseUrl || "") || info.baseUrl;
  return {
    provider,
    info: { ...info, baseUrl },
    apiKey,
    model: String(config.askModel || info.defaultModel),
  };
}

function parseJson(text: string): AnswerJson {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end > start)
      return JSON.parse(text.slice(start, end + 1));
    throw new Error("No JSON object in model output");
  }
}

let anthropic: { key: string; client: Anthropic } | undefined;

async function generateWithAnthropic(
  apiKey: string,
  model: string,
  input: GenerateInput,
): Promise<GenerateResult> {
  if (anthropic?.key !== apiKey) {
    anthropic = {
      key: apiKey,
      client: new Anthropic({ apiKey, maxRetries: 2, timeout: 60_000 }),
    };
  }

  let message: Anthropic.Beta.BetaMessage;
  try {
    message = await anthropic.client.beta.messages.create({
      model,
      max_tokens: 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: {
        effort: "low",
        format: { type: "json_schema", schema: input.schema },
      },
      system: input.system,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: input.documents,
              // Retrieved top-k sets vary per question and aren't worth a cache write.
              ...(input.cacheDocuments && {
                cache_control: { type: "ephemeral" as const },
              }),
            },
            { type: "text", text: input.prompt },
          ],
        },
      ],
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      throw new LlmError(429, "The terminal is busy. Try again shortly.");
    }
    if (error instanceof Anthropic.APIError) {
      console.error(
        `[ask] Anthropic API error ${error.status}: ${error.message}`,
      );
    } else {
      console.error("[ask] Anthropic request failed", error);
    }
    throw new LlmError(502, "Couldn't reach the model. Try again.");
  }

  if (message.stop_reason === "refusal") return { refused: true };

  const text = message.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  return { refused: false, json: parseJson(text) };
}

interface ChatCompletion {
  choices?: { message?: { content?: string | null } }[];
}

async function generateWithOpenAICompatible(
  info: ProviderInfo,
  apiKey: string,
  model: string,
  input: GenerateInput,
): Promise<GenerateResult> {
  const system =
    input.system +
    `\n\nRespond with only a JSON object matching this schema, no other text:\n${JSON.stringify(
      input.schema,
    )}`;

  let res: ChatCompletion;
  try {
    res = await $fetch<ChatCompletion>(`${info.baseUrl}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      timeout: 60_000,
      retry: 1,
      retryStatusCodes: [500, 502, 503, 504],
      body: {
        model,
        temperature: 0.2,
        max_tokens: 1000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: `${input.documents}\n\n${input.prompt}` },
        ],
      },
    });
  } catch (error) {
    const status = (error as { statusCode?: number }).statusCode;
    console.error(
      `[ask] ${info.label} API error ${status ?? ""}`,
      (error as { data?: unknown }).data ?? error,
    );
    if (status === 429)
      throw new LlmError(429, "The terminal is busy. Try again shortly.");
    throw new LlmError(502, "Couldn't reach the model. Try again.");
  }

  const text = res.choices?.[0]?.message?.content ?? "";
  return { refused: false, json: parseJson(text) };
}

export function generateAnswer(input: GenerateInput) {
  const resolved = resolveProvider();
  if (!resolved)
    throw new LlmError(503, "The ask terminal isn't configured yet.");
  const { info, apiKey, model, provider } = resolved;
  return provider === "anthropic"
    ? generateWithAnthropic(apiKey, model, input)
    : generateWithOpenAICompatible(info, apiKey, model, input);
}
