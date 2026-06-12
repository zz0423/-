const fs = require("fs");
const path = require("path");

// 完整版兜兜 IP 换肤设计 Skill（基于 doudou-ip-skin-designer）
// 关键点：用源图做 image edit 而不是纯文生图，从根上避免兜兜变形

const SOURCE_DIR = path.join(__dirname, "assets", "skin-sources");
const INDEX_FILE = path.join(SOURCE_DIR, "index.json");

let cachedIndex = null;

function loadAssetIndex() {
  if (cachedIndex) {
    return cachedIndex;
  }
  try {
    const raw = fs.readFileSync(INDEX_FILE, "utf8");
    cachedIndex = JSON.parse(raw);
  } catch (error) {
    cachedIndex = [];
  }
  return cachedIndex;
}

function readSourceImageAsDataUrl(filename) {
  const filePath = path.join(SOURCE_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

function readSourceImageAsBase64(filename) {
  const filePath = path.join(SOURCE_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath).toString("base64");
}

// ========== 任务类型识别（来自 skin-change-scale） ==========

function pickTaskType(prompt) {
  const text = prompt || "";

  if (/联名|合作|品牌|城市|游戏|活动|限定|产品|冠名|赞助|发布/.test(text)) {
    return {
      type: "联名换肤",
      activityLevel: "S+",
      creativeSpace: "40%-60%",
      framing: "把合作方信息转译成配饰、道具、包装或背景，保持兜兜为主角；禁止添加兜兜原型中不存在的手臂、嘴。"
    };
  }

  if (/春节|新年|中秋|元宵|儿童节|夏天|冬天|节日|季节|圣诞|万圣|端午|中秋|七夕|圣诞|圣诞/.test(text)) {
    return {
      type: "节日/季节换肤",
      activityLevel: "S级",
      creativeSpace: "40%-60%",
      framing: "用节日色彩、轻量服饰、地面道具和背景氛围完成皮肤变化；主题色仅作为配饰、点缀或道具呈现，不重涂兜兜身体。"
    };
  }

  if (/海报|主视觉|KV|banner|社媒|电商|长图|头图|封面/.test(text)) {
    return {
      type: "海报应用换肤",
      activityLevel: "S级",
      creativeSpace: "40%-60%",
      framing: "围绕兜兜建立主视觉层级，预留标题、商品、CTA 或二维码安全区；构图须为 1:1、3:1 或 1:3，留出白边或安全区。"
    };
  }

  if (/奖杯|勋章|纪念|专属|编号|限定版|收藏/.test(text)) {
    return {
      type: "奖杯/勋章换肤",
      activityLevel: "S+",
      creativeSpace: "20%-40%",
      framing: "通过勋章、绶带、铭牌等小型配饰呈现，主体比例与 logo 不变；保持高识别度。"
    };
  }

  return {
    type: "日常活动换肤",
    activityLevel: "常规",
    creativeSpace: "20%-40%",
    framing: "通过少量配饰、局部纹样、轻道具和干净背景完成低风险换肤；动作靠身体倾斜、道具位置、运动线条表达，不增加四肢或鞋。"
  };
}

// ========== 调色板（来自 brand-guidelines） ==========

function buildPalette(prompt) {
  if (/春节|新年|红|喜庆|鞭炮/.test(prompt)) {
    return "抖音商城红、暖金、奶白、深红阴影";
  }
  if (/夏|海|清爽|蓝|沙滩/.test(prompt)) {
    return "抖音商城红、清透蓝、奶白、浅沙色";
  }
  if (/科技|未来|数码|蓝|赛博/.test(prompt)) {
    return "抖音商城红、电光蓝、银白、深灰";
  }
  if (/儿童|可爱|粉|少女|卡通/.test(prompt)) {
    return "抖音商城红、奶白、柔和暖灰、粉色点缀";
  }
  if (/运动|活力|橙|跑步|健身/.test(prompt)) {
    return "抖音商城红、活力橙、奶白、深红阴影";
  }
  return "抖音商城红、奶白、柔和暖灰、主题点缀色";
}

// ========== 自动选图（基于关键词匹配） ==========

function pickBestSource(prompt) {
  const index = loadAssetIndex();
  if (!index.length) {
    return null;
  }
  const text = (prompt || "").trim();

  // 海报类任务 → 优先 14/15（构图留白多）
  if (/海报|KV|主视觉|banner|头图|封面/.test(text)) {
    const match = index.find((item) => item.file.includes("-14-") || item.file.includes("-15-"));
    if (match) return match;
  }

  // 全身动作类（运动、跑步、跳跃）→ 11/12/13
  if (/运动|跑|跳|踢|动态|健身/.test(text)) {
    const match = index.find((item) => item.file.includes("-11-") || item.file.includes("-12-") || item.file.includes("-13-"));
    if (match) return match;
  }

  // 联名合作类（站姿稳定）→ 16-20（pose 类）
  if (/联名|合作|品牌|城市|活动|限定/.test(text)) {
    const match = index.find((item) => /-(1[6-9]|20)-/.test(item.file));
    if (match) return match;
  }

  // 3/4 视角（节日/季节）→ 06-08
  if (/节日|季节|春节|新年|夏|冬/.test(text)) {
    const match = index.find((item) => item.file.includes("-06-") || item.file.includes("-07-") || item.file.includes("-08-"));
    if (match) return match;
  }

  // 默认正面 01
  return index[0];
}

// ========== 核心 Prompt 构建（遵循 brand-guidelines 30+ 规则） ==========

function buildPositivePrompt({ prompt, source, skin }) {
  return [
    "TASK: Image edit on the provided Doudou source image. The source image is GROUND TRUTH — do NOT regenerate or reinterpret the character.",
    "ACTION: Add a thematic skin (props, accessories, background, small textures) around/on the existing character. The character's body, face, eyes, handle, feet, logo, side tag must remain PIXEL-IDENTICAL to the source.",
    "Use the selected Doudou source image as the locked visual reference; do not redesign the character body, face, eyes, handle, feet, logo, or side tag.",
    "Preserve Doudou's exact face proportions, eye centers, eye spacing, eye height, eye protrusion depth, shopping-bag silhouette, handle position, feet position, and woven fabric side tag.",
    "Preserve the Douyin Mall front watermark/logo/text exactly as in the source image. Do not redraw, translate, stylize, blur, replace, or alter it.",
    "Doudou has NO hands, NO arms, NO mouth, NO lips, NO teeth, NO tongue. Never add them. Never create a holding or speaking pose.",
    `Source asset: ${source.file} (${source.width}x${source.height}).`,
    `Theme keywords from user: ${prompt || "无特定主题，保持品牌原貌"}.`,
    `Skin type: ${skin.type}. Activity level: ${skin.activityLevel}. Creative-space target: ${skin.creativeSpace}.`,
    skin.framing,
    `Palette: ${buildPalette(prompt)}.`,
    "Material: matte frosted soft PVC, subtle subsurface scattering on edges, glossy dimensional eyes, premium 3D commercial render, studio global illumination, high material contrast, 1:1 aspect ratio, white or transparent background, polished clean edges, commercial IP illustration."
  ].join(" ");
}

function buildNegativePrompt() {
  return [
    "added arms, added hands, added fingers, added palms",
    "added mouth, lips, teeth, tongue, smile lines, speaking expression",
    "changed face, changed proportions, deformed body, missing feet, altered eyes",
    "altered logo text, unreadable logo, hidden side tag, removed handle",
    "100% redesign, different character, loose interpretation",
    "orange overall body, dull red, brown-red, purple-red, hot pink, pastel pink",
    "metallic, glassy, clay, plastic-looking, anime, realistic human, realistic animal",
    "long legs, knees, shoes, stretched feet, detached feet, extra feet",
    "floating hat, hat covering logo or eyes, generic human hat placement",
    "floating prop, prop far from body, prop covering logo/eyes/feet/side tag",
    "low quality, blurry, bad anatomy, extra limbs, duplicated face, watermark, oversaturated, noisy background, text artifacts, collage, grid, four-panel, contact sheet"
  ].join(", ");
}

// ========== 锁定与可编辑区域（来自 brand-guidelines） ==========

function buildIdentityLock() {
  return {
    characterShape: "可爱的兜兜购物袋 IP 形象，圆润身材、有提手、有脚、有侧边音符标签",
    forbidden: [
      "禁止添加手、臂、手指、嘴、唇、牙、舌、笑容",
      "禁止改变眼睛中心位置、间距、高度、突出度",
      "禁止改变身体比例、姿势、提手、脚、侧边标签位置",
      "禁止重绘、模糊、替换抖音商城 logo/字样",
      "禁止将身体涂成橙色、暗红、棕红、紫红、亮粉、糖果粉等偏离源图的颜色"
    ],
    preserved: [
      "正面抖音商城 logo / 字样（保持清晰可识别）",
      "兜兜身体比例和购物袋轮廓",
      "眼睛、提手、脚部、侧边音符标签的精确位置和形态",
      "源图式荧光珊瑚红/品红色身体，仅左上/前左上保留桃橙色渐变",
      "深酒红色圆角脚、磨砂柔质 PVC 材质"
    ],
    editableAreas: [
      "配饰（帽子、围巾、徽章、挂件）",
      "小面积纹样、贴纸、装饰条带",
      "背景与地面道具",
      "不打 logo 的边缘装饰",
      "远离脸和脚的小道具"
    ]
  };
}

// ========== 主入口 ==========

function listAvailableSources() {
  return loadAssetIndex();
}

function getSourceDataUrl(filename) {
  return readSourceImageAsDataUrl(filename);
}

function getSourceBase64(filename) {
  return readSourceImageAsBase64(filename);
}

function generateIpSkin(input) {
  const prompt = input.prompt || "可爱、轻量活动皮肤、适合品牌传播";
  const requestedSource = input.sourceFile;
  const skin = pickTaskType(prompt);
  const index = loadAssetIndex();

  // 用户指定了源图就用指定的，否则自动选
  const source = (requestedSource && index.find((s) => s.file === requestedSource))
    || pickBestSource(prompt)
    || index[0];

  if (!source) {
    return {
      type: "doudou-ip-skin-designer",
      status: "no_source_available",
      message: "源图库为空，请先在 assets/skin-sources/ 放置兜兜标准图。",
      plan: null
    };
  }

  const positivePrompt = buildPositivePrompt({ prompt, source, skin });
  const negativePrompt = buildNegativePrompt();
  const identityLock = buildIdentityLock();

  return {
    type: "doudou-ip-skin-designer",
    status: "plan_generated",
    source: {
      file: source.file,
      width: source.width,
      height: source.height,
      dataUrl: readSourceImageAsDataUrl(source.file)
    },
    plan: {
      title: `${skin.type}方案`,
      activityLevel: skin.activityLevel,
      creativeSpace: skin.creativeSpace,
      palette: buildPalette(prompt),
      direction: skin.framing,
      identityLock,
      lockedAreas: identityLock.preserved,
      forbidden: identityLock.forbidden,
      editableAreas: identityLock.editableAreas,
      positivePrompt,
      negativePrompt,
      workflow: "使用 gpt-image-2 的 image edit 端点，把源图作为 image 输入，只在指定可编辑区域添加皮肤元素，禁止改变锁定区域。",
      notes: [
        "1 张图调用一次，4 张图需调 4 次，每次换不同动作/表情/道具。",
        "禁止用纯文生图兜底，源图是必传。",
        "如果一次失败涉及五官/logo/嘴/手/比例，停止重试并切换到 mask-guided 局部重绘。"
      ]
    }
  };
}

module.exports = {
  generateIpSkin,
  listAvailableSources,
  getSourceDataUrl,
  getSourceBase64
};
