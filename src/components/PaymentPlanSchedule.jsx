const PAID_ROWS_COUNT = 3;

const PAYMENT_MILESTONES = [
  { percent: 20, collected: 20, progress: 0 },
  { percent: 15, collected: 35, progress: 15 },
  { percent: 15, collected: 50, progress: 35 },
  { percent: 20, collected: 70, progress: 55 },
  { percent: 15, collected: 85, progress: 80 },
  { percent: 10, collected: 95, progress: 100 },
  { percent: 5, collected: 100, milestone: 'Upon unit delivery' },
];

function formatMoney(value) {
  return `${Math.round(value).toLocaleString()} SAR`;
}

export default function PaymentPlanSchedule({ unit, onClose }) {
  const price = unit?.price || 0;

  const schedule = PAYMENT_MILESTONES.map((milestone, index) => ({
    ...milestone,
    amount: price * (milestone.percent / 100),
    status: index < PAID_ROWS_COUNT ? 'paid' : 'due',
  }));

  return (
    <div className="w-[740px] max-w-[calc(100vw-2rem)] max-h-[85vh] rounded-xl bg-[#2e2e2e] text-white p-7 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">Payment Plan</h2>
          <p className="text-sm text-white/60 mt-1">Unit value is paid in {schedule.length} payments as outlined below.</p>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white text-xl leading-none" aria-label="Close">
          &times;
        </button>
      </div>

      <div className="text-sm text-white/70">
        {unit?.displayName || unit?.name} &middot; {formatMoney(price)}
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-custom">
        {schedule.map((row, index) => (
          <div
            key={index}
            className="rounded-xl bg-[#3a3a3a] border border-white/10 px-5 py-4 flex items-center gap-4"
          >
            <div className="flex items-center justify-between gap-2 min-w-[140px]">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-white/80">Payment {index + 1}</span>
                <span className="text-xs text-white/60">{formatMoney(row.amount)}</span>
              </div>
              <span className="text-2xl font-bold text-[#d4af6a]">{row.percent}%</span>
            </div>

            <div className="w-px self-stretch bg-white/10" />

            <div className="flex flex-1 justify-around gap-3">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-[10px] uppercase tracking-wide text-white/40 leading-tight">Collected<br />(cumulative)</span>
                <span className="text-sm font-medium text-white/85">{row.collected}%</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-[10px] uppercase tracking-wide text-white/40 leading-tight">Construction Progress<br />(cumulative)</span>
                <span className="text-sm font-medium text-white/85">{row.milestone ?? `${row.progress}%`}</span>
              </div>
            </div>

            <div className="w-px self-stretch bg-white/10" />

            <span className={`shrink-0 text-[10px] font-semibold tracking-wide uppercase px-2 py-1 rounded-full whitespace-nowrap ${row.status === 'paid' ? 'bg-green-400/15 text-green-400' : 'bg-white/10 text-white/40'}`}>
              {row.status === 'paid' ? 'Paid' : 'Due'}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-white/60">For reference only — confirm the final payment plan with sales.</p>
    </div>
  );
}
