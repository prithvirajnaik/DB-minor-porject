const SkeletonLoader = ({ type = 'text', count = 1 }) => {
    const shimmer = "animate-pulse bg-slate-200 rounded";

    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
                        <div className={`h-6 w-3/4 ${shimmer}`}></div>
                        <div className={`h-4 w-1/2 ${shimmer}`}></div>
                        <div className="space-y-2 pt-4">
                            <div className={`h-3 w-full ${shimmer}`}></div>
                            <div className={`h-3 w-5/6 ${shimmer}`}></div>
                        </div>
                    </div>
                );
            case 'table':
                return (
                    <div className="flex space-x-4 py-4 border-b border-slate-50 last:border-0">
                        <div className={`h-4 w-1/4 ${shimmer}`}></div>
                        <div className={`h-4 w-1/4 ${shimmer}`}></div>
                        <div className={`h-4 w-1/4 ${shimmer}`}></div>
                        <div className={`h-4 w-1/4 ${shimmer}`}></div>
                    </div>
                );
            case 'text':
            default:
                return <div className={`h-4 w-full ${shimmer}`}></div>;
        }
    };

    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="w-full">
                    {renderSkeleton()}
                </div>
            ))}
        </>
    );
};

export default SkeletonLoader;
