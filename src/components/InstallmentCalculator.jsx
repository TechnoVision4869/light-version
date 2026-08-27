// Not currently wired into the app (see PaymentPlanSchedule.jsx, which replaced it as the
// shown overlay) — kept because the real payment structure the client wants is still unclear;
// this generic down-payment/term/rate amortization calculator may still be needed alongside
// or instead of the milestone-based plan.
import { useMemo, useState } from 'react';

const PAID_ROWS_COUNT = 3;

function formatMoney(value) {
  return `${Math.round(value).toLocaleString()} SAR`;
}

export default function InstallmentCalculator({ unit, onClose }) {
  const price = unit?.price || 0;

  const [activeTab, setActiveTab] = useState('schedule');
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [years, setYears] = useState(10);
  const [ratePercent, setRatePercent] = useState(0);

  const { downPaymentAmount, monthly, totalPayable, totalMarkup, schedule } = useMemo(() => {
    const downPaymentAmount = price * (downPaymentPercent / 100);
    const principal = price - downPaymentAmount;
    const months = years * 12;
    const monthlyRate = ratePercent / 100 / 12;

    const monthly = monthlyRate > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      : principal / months;

    const totalPayable = downPaymentAmount + monthly * months;

    const schedule = [
      { label: 'Down Payment', amount: downPaymentAmount },
      ...Array.from({ length: months }, (_, i) => ({
        label: `Installment ${i + 1}`,
        amount: monthly,
      })),
    ].map((row, index) => ({
      ...row,
      status: index < PAID_ROWS_COUNT ? 'paid' : 'due',
    }));

    return {
      downPaymentAmount,
      monthly,
      totalPayable,
      totalMarkup: totalPayable - price,
      schedule,
    };
  }, [price, downPaymentPercent, years, ratePercent]);

  return (
    <div className="w-[380px] rounded-xl bg-[#2e2e2e] text-white p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Installment Calculator</h2>
        <button onClick={onClose} className="text-white/70 hover:text-white text-xl leading-none" aria-label="Close">
          &times;
        </button>
      </div>

      <div className="text-sm text-white/70">
        {unit?.displayName || unit?.name} &middot; {formatMoney(price)}
      </div>

      <div className="flex gap-2 justify-center border-b border-white/10">
        <button
          className={`pb-2 px-3 text-sm font-medium border-b-2 transition ${activeTab === 'schedule' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </button>
        <button
          className={`pb-2 px-3 text-sm font-medium border-b-2 transition ${activeTab === 'calculator' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          onClick={() => setActiveTab('calculator')}
        >
          Calculator
        </button>
      </div>

      <div className="h-[380px] flex flex-col">
        {activeTab === 'calculator' && (
          <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1 scrollbar-custom">
            <div className="flex flex-col gap-3 text-sm">
              <label className="flex flex-col gap-1">
                <span className="flex justify-between">
                  <span>Down Payment</span>
                  <span>{downPaymentPercent}% ({formatMoney(downPaymentAmount)})</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={90}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="flex justify-between">
                  <span>Term</span>
                  <span>{years} years</span>
                </span>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="flex justify-between">
                  <span>Annual Rate</span>
                  <span>{ratePercent}%</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={0.5}
                  value={ratePercent}
                  onChange={(e) => setRatePercent(Number(e.target.value))}
                />
              </label>
            </div>

            <hr className="h-divider" />

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-white/70">Monthly Installment</span>
                <span className="font-bold">{formatMoney(monthly)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Payable</span>
                <span className="font-bold">{formatMoney(totalPayable)}</span>
              </div>
              {ratePercent > 0 && (
                <div className="flex justify-between">
                  <span className="text-white/70">Total Markup</span>
                  <span className="font-bold">{formatMoney(totalMarkup)}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-white/50">Estimate only — confirm final terms with sales.</p>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="flex flex-col gap-1 h-full overflow-y-auto pr-1 scrollbar-custom">
            {schedule.map((row, index) => (
              <div key={index} className="flex justify-between items-center text-sm py-2.5 px-1 border-b border-white/5 last:border-0">
                <span className="text-white/80">{row.label}</span>
                <div className="flex items-center gap-6">
                  <span className="font-medium min-w-[100px] text-right">{formatMoney(row.amount)}</span>
                  <span className={`text-xs font-medium w-10 text-right ${row.status === 'paid' ? 'text-green-400' : 'text-white/40'}`}>
                    {row.status === 'paid' ? 'Paid' : 'Due'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
