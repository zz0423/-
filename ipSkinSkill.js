function pickSkinType(prompt) {
  const text = prompt || "";

  if (/联名|合作|品牌|城市|游戏|活动|限定|产品/.test(text)) {
    return {
      type: "联名换肤",
      creativeSpace: "40%-60%",
      framing: "把合作方信息转译成配饰、道具、包装或背景，保持兜兜为主角。"
    };
  }

  if (/春节|新年|中秋|元宵|儿童节|夏天|冬天|节日|季节|圣诞|万圣/.test(text)) {
    return {
      type: "节日/季节换肤",
      creativeSpace: "40%-60%",
      framing: "用节日色彩、轻量服饰、地面道具和背景氛围完成皮肤变化。"
    };
  }

  if (/海报|主视觉|KV|banner|社媒|电商/.test(text)) {
    return {
      type: "海报应用换肤",
      creativeSpace: "40%-60%",
      framing: "围绕兜兜建立主视觉层级，预留标题、商品、CTA 或二维码安全区。"
    };
  }

  return {
    type: "日常活动换肤",
    creativeSpace: "20%-40%",
    framing: "通过少量配饰、局部纹样、轻道具和干净背景完成低风险换肤。"
  };
}

function buildPalette(prompt) {
  if (/春节|新年|红|喜庆/.test(prompt)) {
    return "抖音商城红、暖金、奶白、深红阴影";
  }

  if (/夏|海|清爽|蓝/.test(prompt)) {
    return "抖音商城红、清透蓝、奶白、浅沙色";
  }

  if (/科技|未来|数码|蓝/.test(prompt)) {
    return "抖音商城红、电光蓝、银白、深灰";
  }

  return "抖音商城红、奶白、柔和暖灰、主题点缀色";
}

function generateIpSkin(input) {
  const prompt = input.prompt || "可爱、轻量活动皮肤、适合品牌传播";
  const count = Number(input.count) || 4;
  const skin = pickSkinType(prompt);
  const palette = buildPalette(prompt);
  const positivePrompt = [
    "Use the selected Doudou source image as the base image, not loose inspiration",
    `Theme keywords: ${prompt}`,
    `Skin type: ${skin.type}`,
    `Creative-space target: ${skin.creativeSpace}`,
    "Preserve Doudou's exact face, proportions, shopping-bag silhouette, eyes, handle, feet, Douyin Mall front logo/text, and black side tag",
    "Only add local skin elements outside locked areas",
    skin.framing,
    `Palette: ${palette}`,
    "commercial IP illustration, polished clean edges, poster-ready, 1:1"
  ].join(". ");

  return {
    type: "doudou-ip-skin-skill",
    status: "skin_prompt_generated",
    count,
    plan: {
      title: `${skin.type}方案`,
      creativeSpace: skin.creativeSpace,
      palette,
      direction: skin.framing,
      lockedAreas: [
        "正面抖音商城 logo / 字样",
        "兜兜身体比例和购物袋轮廓",
        "眼睛、提手、脚部、侧边黑色音符标签"
      ],
      editableAreas: [
        "背景与地面道具",
        "提手附近小挂件",
        "不遮挡 logo 的边缘装饰",
        "远离脸和脚的小面积贴纸或纹样"
      ],
      positivePrompt,
      negativePrompt:
        "changed face, changed proportions, deformed body, missing feet, altered logo text, unreadable logo, hidden side tag, 100% redesign, different character, cluttered props"
    }
  };
}

module.exports = {
  generateIpSkin
};
