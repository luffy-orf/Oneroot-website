import { useState, useEffect } from 'react';

function AdminPage() {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  const correctPassword = 'oneroot2024'; // Simple password for demo purposes
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
      loadPhoneNumbers();
    } else {
      setError('Incorrect password');
    }
  };
  
  const loadPhoneNumbers = () => {
    try {
      // Get phone numbers from localStorage
      const localData = localStorage.getItem('oneroot_collected_phone_numbers');
      if (localData) {
        const parsedData = JSON.parse(localData);
        setPhoneNumbers(parsedData);
      }
    } catch (error) {
      console.error('Error loading phone numbers:', error);
    }
  };
  
  const exportToCSV = () => {
    if (phoneNumbers.length === 0) return;
    
    // Create CSV content
    const headers = ['Phone Number', 'Source', 'Notes', 'Device Type', 'Timestamp', 'Page URL'];
    const csvRows = [headers.join(',')];
    
    phoneNumbers.forEach(entry => {
      const row = [
        entry.phone_number,
        entry.source,
        entry.notes,
        entry.device_type,
        entry.timestamp,
        entry.page_url
      ].map(item => `"${item || ''}"`);
      
      csvRows.push(row.join(','));
    });
    
    // Create and download the CSV file
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `oneroot_phone_numbers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Collected Phone Numbers (Local Storage)</h2>
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              disabled={phoneNumbers.length === 0}
            >
              Export to CSV
            </button>
          </div>
          
          {phoneNumbers.length === 0 ? (
            <p className="text-gray-500">No phone numbers found in local storage.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Phone Number</th>
                    <th className="py-2 px-4 border-b text-left">Source</th>
                    <th className="py-2 px-4 border-b text-left">Notes</th>
                    <th className="py-2 px-4 border-b text-left">Device Type</th>
                    <th className="py-2 px-4 border-b text-left">Timestamp</th>
                    <th className="py-2 px-4 border-b text-left">Page URL</th>
                  </tr>
                </thead>
                <tbody>
                  {phoneNumbers.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-b">{entry.phone_number}</td>
                      <td className="py-2 px-4 border-b">{entry.source}</td>
                      <td className="py-2 px-4 border-b">{entry.notes}</td>
                      <td className="py-2 px-4 border-b">{entry.device_type}</td>
                      <td className="py-2 px-4 border-b">{new Date(entry.timestamp).toLocaleString()}</td>
                      <td className="py-2 px-4 border-b">{entry.page_url}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPage;