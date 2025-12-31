const Stats = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 font-medium">Total Sales</h3>
          <p className="text-3xl font-bold mt-2">$24,580</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 font-medium">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 font-medium">Active Users</h3>
          <p className="text-3xl font-bold mt-2">568</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
