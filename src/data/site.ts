import { href } from '../lib/path';

export const site = {
  name: '谢兆明',
  nameEn: 'Xie Zhaoming',
  role: '创意总监',
  roleEn: 'Creative Director',
  positioning: '以影像与视觉系统，把一场战役从概念做到可被触碰的接触点。',
  description:
    '谢兆明，创意总监。以影像与视觉系统，把一场战役从概念做到可被触碰的接触点。作品包括开心麻花《疯狂理发店》、兴业银行「兴动全球」与短剧《暗渡》。',
} as const;

export const cases = [
  {
    slug: 'crazy-barbershop',
    index: '01',
    title: '疯狂理发店',
    client: '开心麻花',
    kind: '舞台剧',
    line: '把喜剧角色收成可以单独传播的海报。棋盘地面、铜框、被放大的道具，仍是同一家店。',
    href: href('/work/crazy-barbershop/'),
  },
  {
    slug: 'xingdong-global',
    index: '02',
    title: '兴动全球',
    client: '兴业银行',
    kind: '兴业生活',
    line: '境外返现被做成一个可以走进去的世界，而不是一张利\u2060率\u2060表。',
    href: href('/work/xingdong-global/'),
  },
  {
    slug: 'andu',
    index: '03',
    title: '暗渡',
    client: '短剧',
    kind: '海报',
    line: '一张主视觉承担传播。人物、档期和时代质地压在同一块画面里。',
    href: href('/work/andu/'),
  },
] as const;

export type CaseSlug = (typeof cases)[number]['slug'];

export function nextCase(slug: CaseSlug) {
  const index = cases.findIndex((item) => item.slug === slug);
  return cases[(index + 1) % cases.length];
}
