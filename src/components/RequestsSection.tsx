import React from 'react';

interface RequestItemProps {
  companyName: string;
  details: string;
}

const RequestItem: React.FC<RequestItemProps> = ({ companyName, details }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{companyName} is requesting a document from you.</h3>
        <p className="text-sm text-gray-600 mt-1">{details}</p>
      </div>
      <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.25 7.5l-2.25-2.25a.938.938 0 00-1.32 0l-1.816 1.816 3.75 3.75L20.25 8.82a.938.938 0 000-1.32z" />
        </svg>
        <span>Upload now</span>
      </button>
    </div>
  );
};

// Export RequestItem so it can be imported by other components
export { RequestItem };

const RequestsSection: React.FC = () => {
  // Dummy data for now, this can be fetched from an API later
  const requests = [
    {
      companyName: 'Armed Forces Brewing Company',
      details: 'Details of the request here dolor sit amet consectetur. Massa id massa ullamcorper ac duis mattis eu. Id turpis arcu sed mauris bibendum sapien massa.',
    },
    // Add more requests here if needed
  ];

  return (
    <div className="bg-slate-50 p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Requests</h2>
      <div className="space-y-4">
        {requests.map((request, index) => (
          <RequestItem key={index} companyName={request.companyName} details={request.details} />
        ))}
      </div>
    </div>
  );
};

export default RequestsSection; 