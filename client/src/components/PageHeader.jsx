const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      {description && (
        <p className="text-sm text-slate-500">{description}</p>
      )}
    </div>
    {action}
  </div>
);

export default PageHeader;




