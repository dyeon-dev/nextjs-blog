const ViewsSkeleton = () => {
  return (
    <div className="flex animate-pulse space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-4 h-4 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ViewsSkeleton;
