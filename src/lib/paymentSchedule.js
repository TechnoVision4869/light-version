export const PAYMENT_MILESTONES = [
  { percent: 20, collected: 20, progress: 0 },
  { percent: 15, collected: 35, progress: 15 },
  { percent: 15, collected: 50, progress: 35 },
  { percent: 20, collected: 70, progress: 55 },
  { percent: 15, collected: 85, progress: 80 },
  { percent: 10, collected: 95, progress: 100 },
  { percent: 5, collected: 100, milestone: 'Upon unit delivery' },
];

export function formatMoney(value) {
  return `${Math.round(value).toLocaleString()} SAR`;
}
