function parseLiblibModel(url) {
  const parsed = new URL(url);
  const parts = parsed.pathname.split("/").filter(Boolean);
  const modelUuid = parts[0] === "modelinfo" ? parts[1] : "";

  return {
    modelUuid,
    versionUuid: parsed.searchParams.get("versionUuid") || "",
    sourceUrl: url
  };
}

function generateLoraPackage(input, url) {
  const model = parseLiblibModel(url);
  const prompt = input.prompt || "可爱、鲜明、适合品牌传播";
  const count = Number(input.count) || 4;

  return {
    type: "liblib-lora-skill",
    status: "lora_prompt_package_generated",
    message: "该链接是 LibLib LoRA 模型详情页，已生成可用于接入兜兜 LoRA 的请求参数包。",
    model,
    outputCount: count,
    loraPackage: {
      name: "兜兜 LoRA",
      tool: "在线 LibLibAI WebUI 文生图",
      baseModel: "F.1基础模型_fp16.sft",
      modelUuid: model.modelUuid,
      versionUuid: model.versionUuid,
      weight: 0.8,
      styleKeywords: prompt,
      positivePrompt: [
        "兜兜品牌 IP 角色",
        prompt,
        "brand mascot, 3D soft vinyl toy, rounded body",
        "large expressive eyes, red shopping bag character",
        "commercial IP design, clean background, high quality render"
      ].join(", "),
      negativePrompt:
        "low quality, blurry, bad anatomy, extra limbs, duplicated face, distorted logo, messy text, watermark, noisy background",
      parameters: {
        count,
        aspectRatio: "1:1",
        steps: 60,
        height: 1536,
        guidance: "优先保持兜兜角色外形稳定；使用在线 LibLibAI WebUI 文生图，基础模型选择 F.1基础模型_fp16.sft，LoRA 权重 0.8。"
      }
    },
    nextStep:
      "接入 LibLib 生成 API 后，将 modelUuid、versionUuid、weight 和 prompt 写入文生图/图生图请求体即可真正出图。"
  };
}

module.exports = {
  generateLoraPackage
};
