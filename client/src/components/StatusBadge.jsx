const badgeStyles = {
  Available: 'bg-emerald-100 text-emerald-700',
  Unavailable: 'bg-rose-100 text-rose-700',
};

const StatusBadge = ({ status }) => (
  <span
    className={`rounded-full px-2 py-1 text-xs font-semibold ${
      badgeStyles[status] || 'bg-slate-100 text-slate-600'
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;




