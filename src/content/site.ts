/** Confirmed public content for the site. */
export const site = {
  id: "jintai-ai",
  title: "金泰 AI",
  summary: "面向政企、产业与院校的 AI 场景协同与内容交付服务。",
  name: "金泰 AI",
  nameEn: "JINTAI AI",
  tagline: "AI 场景协同与内容交付",
  description: "面向政企、产业与院校的 AI 场景协同与内容交付服务。",
  contact: {
    label: "业务咨询",
    note: "请留下单位与需求方向，我们在一个工作日内回复。",
    email: "ai.kingtai@gmail.com",
    address: "北京 · 长安街沿线",
  },
} as const;

export const inquiryKinds = ["业务咨询", "预约参观", "生态合作"] as const;

export const cooperationPaths = [
  { id: "government", title: "政企与媒体", summary: "可信算力与内容交付", href: "/solutions/#government" },
  { id: "industry", title: "产业伙伴", summary: "场景验证与规模交付", href: "/solutions/#industry" },
  { id: "education", title: "院校与招商", summary: "空间协同与生态共建", href: "/ai-center/#visit" },
] as const;

export const floorStories = [
  { id: "01", label: "01F", title: "展示与会客", summary: "品牌展示、会客与行业发布。" },
  { id: "02", label: "02F", title: "场景验证", summary: "场景体验、联合验证与路演。" },
  { id: "03", label: "03F", title: "生产与交付", summary: "AI 生产、内容交付与企业服务。" },
  { id: "04", label: "04F", title: "生态协同", summary: "生态办公、院校协同与共建空间。" },
] as const;

export const trustPoints = [
  { id: "service", title: "专业服务", summary: "围绕实际业务需求组织服务与交付。" },
  { id: "collaboration", title: "协同推进", summary: "支持多方参与的场景沟通与联合验证。" },
  { id: "delivery", title: "内容交付", summary: "提供面向项目的内容生产与交付支持。" },
] as const;

export const solutionGroups = [
  { id: "government", title: "政企与媒体", summary: "围绕可信算力与内容交付开展协作。" },
  { id: "industry", title: "产业伙伴", summary: "通过场景验证推动项目交付。" },
  { id: "education", title: "院校与招商", summary: "开展空间协同与生态共建。" },
] as const;

export const partnerRoles = [
  { id: "government", title: "政企与媒体", summary: "共同探索可信服务与内容协作。" },
  { id: "industry", title: "产业伙伴", summary: "共同验证场景并推进项目落地。" },
  { id: "education", title: "院校与招商", summary: "共同建设人才与产业生态。" },
] as const;

export const aboutPoints = [
  { id: "visit", title: "开放参观", summary: "可预约了解空间、服务与合作方向。" },
  { id: "cooperation", title: "生态合作", summary: "欢迎围绕场景、内容与人才开展合作。" },
  { id: "inquiry", title: "业务咨询", summary: "可提交需求方向并获得后续沟通。" },
] as const;

export const nav = [
  { href: "#compute", label: "服务方向" },
  { href: "#delivery", label: "内容交付" },
  { href: "#center", label: "AI 产业中心" },
  { href: "#why", label: "合作基础" },
  { href: "#pricing", label: "合作方式" },
  { href: "#contact", label: "联系我们" },
] as const;

export const heroFacts = trustPoints.map((point) => ({
  value: "",
  unit: "",
  label: point.title,
  note: point.summary,
}));

export const businesses = solutionGroups.map((group, index) => ({
  id: ["compute", "delivery", "center"][index],
  index: `0${index + 1}`,
  title: group.title,
  lead: group.summary,
  body: group.summary,
  items: cooperationPaths
    .filter((path) => path.id === group.id)
    .map((path) => ({
      title: path.title,
      spec: "合作方向",
      desc: path.summary,
      audience: "欢迎沟通合作需求",
    })),
}));

export const advantages = trustPoints.map((point, index) => ({
  no: `0${index + 1}`,
  title: point.title,
  desc: point.summary,
}));

export const audiences = partnerRoles.map((role) => ({
  title: role.title,
  desc: role.summary,
}));

export const faqs = [
  { q: "如何发起合作？", a: "可通过业务咨询、预约参观或生态合作三个入口联系我们。" },
  { q: "可以预约参观吗？", a: "可以。请提交预约参观需求，我们将与您确认时间。" },
  { q: "支持哪些合作方向？", a: "可围绕可信算力、内容交付、场景验证和生态共建开展沟通。" },
] as const;

/** Legacy display shape retained until the page components consume cooperationPaths directly. */
export const pricing = {
  lead: "根据合作方向开展沟通",
  note: "提交需求后，我们将结合具体场景安排后续交流。",
  plans: cooperationPaths.map((path) => ({
    id: path.id,
    name: path.title,
    spec: "合作方向",
    basis: "按项目沟通",
    includes: [path.summary],
    billing: ["根据实际场景沟通"],
  })),
  addons: inquiryKinds.map((name) => ({ name, basis: "提交需求后沟通" })),
} as const;

export const inquiry = {
  title: "合作咨询",
  note: "填写后由本机邮件客户端发出，也可直接发送邮件至本页所列邮箱。",
  needs: inquiryKinds,
  scales: ["了解合作方向", "已有项目计划", "计划预约参观"],
  timelines: ["近期", "计划中", "暂作了解"],
} as const;
