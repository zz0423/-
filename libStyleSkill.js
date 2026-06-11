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

function generateLibStyle(input, url) {
  const model = parseLiblibModel(url);
  const prompt = input.prompt || "可爱、鲜明、适合品牌传播";
  const count = Number(input.count) || 1;

  return {
    type: "liblib-style-skill",
    status: "prompt_package_generated",
    message: "该链接是 LibLib 模型详情页，已按后台 skill 方式生成可投喂给出图工作流的风格包。",
    model,
    outputCount: count,
    promptPackage: {
      subject: "品牌 IP 角色",
      styleKeywords: prompt,
      positivePrompt: [
        "品牌 IP 角色",
        prompt,
        "brand mascot IP character",
        "3D soft vinyl toy style",
        "rounded body, expressive eyes, polished material",
        "clean composition, commercial brand visual, high quality render",
        model.modelUuid ? `reference LibLib model uuid: ${model.modelUuid}` : ""
      ]
        .filter(Boolean)
        .join(", "),
      negativePrompt:
        "low quality, blurry, bad anatomy, extra limbs, distorted logo, messy text, watermark, oversaturated, noisy background",
      parameters: {
        count,
        aspectRatio: "1:1",
        guidance: "保持品牌主体清晰，角色轮廓圆润，材质偏软胶玩具感，画面适合后续做 IP 资产延展。"
      }
    },
    nextStep:
      "如果要在 LibLib 上真正出图，需要把该 prompt 包复制到 LibLib 页面手动生成，或接入 LibLib 开放平台 API key 后由后台调用生成接口。"
  };
}

module.exports = {
  generateLibStyle
};
