import { useState, useEffect, useRef } from 'react';
import RegionCard from '../components/RegionCard';
import MLVideoSection from '../components/MLVideoSection';
import { fetchAllRegions } from '../services/regionService';
import { FaFilter, FaSort, FaArrowDown, FaSync } from 'react-icons/fa';

function HomePage() {
  const [regions, setRegions] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const contentRef = useRef(null);

  const sortOptions = [
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'weight-high', label: 'Weight: High to Low' },
    { id: 'weight-low', label: 'Weight: Low to High' },
    { id: 'nuts-high', label: 'Free Nuts %: High to Low' },
    { id: 'nuts-low', label: 'Free Nuts %: Low to High' },
  ];

  const filterOptions = [
    { id: 'single-filter', label: 'Single Filter' },
    { id: 'double-filter', label: 'Double Filter' },
    { id: 'mixed-filter', label: 'Mixed Filter' },
    { id: 'high-weight', label: 'High Weight (>2kg)' },
    { id: 'medium-weight', label: 'Medium Weight (1-2kg)' },
    { id: 'low-weight', label: 'Low Weight (<1kg)' },
  ];

  // Apply sorting
  const handleSort = (sortId) => {
    setSortBy(sortId);
    setShowSortModal(false);
  };

  // Apply filtering
  const handleFilter = (filterIds) => {
    setFilters(filterIds);
    setShowFilterModal(false);
  };

  // Fetch regions function
  const fetchRegionsData = async () => {
    setLoading(true);
    try {
      const { data, error } = await fetchAllRegions();
      if (error) throw error;
      setRegions(data || []);
      setFilteredRegions(data || []);
    } catch (err) {
      console.error('Error fetching regions:', err);
      setError(err.message || 'Failed to fetch regions');
    } finally {
      setLoading(false);
      setRefreshing(false);
      setPullDistance(0);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchRegionsData();
  }, []);
  
  // Handle manual refresh only with button
  const handleManualRefresh = () => {
    if (!refreshing && !loading) {
      setRefreshing(true);
      fetchRegionsData();
    }
  };

  // Apply sorting and filtering effects
  useEffect(() => {
    if (!regions.length) return;
    
    let result = [...regions];

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'price-high':
            return (
              Math.max(
                Number(b.singlefilter_price || 0),
                Number(b.doublefilter_price || 0),
                Number(b.mixedfilter_price || 0)
              ) -
              Math.max(
                Number(a.singlefilter_price || 0),
                Number(a.doublefilter_price || 0),
                Number(a.mixedfilter_price || 0)
              )
            );
          case 'price-low':
            return (
              Math.max(
                Number(a.singlefilter_price || 0),
                Number(a.doublefilter_price || 0),
                Number(a.mixedfilter_price || 0)
              ) -
              Math.max(
                Number(b.singlefilter_price || 0),
                Number(b.doublefilter_price || 0),
                Number(b.mixedfilter_price || 0)
              )
            );
          case 'weight-high':
            return (
              Math.max(
                Number(b.avg_weight_per_singlefilter || 0),
                Number(b.avg_weight_per_doublefilter || 0),
                Number(b.avg_weight_per_mixedfilter || 0)
              ) -
              Math.max(
                Number(a.avg_weight_per_singlefilter || 0),
                Number(a.avg_weight_per_doublefilter || 0),
                Number(a.avg_weight_per_mixedfilter || 0)
              )
            );
          case 'weight-low':
            return (
              Math.max(
                Number(a.avg_weight_per_singlefilter || 0),
                Number(a.avg_weight_per_doublefilter || 0),
                Number(a.avg_weight_per_mixedfilter || 0)
              ) -
              Math.max(
                Number(b.avg_weight_per_singlefilter || 0),
                Number(b.avg_weight_per_doublefilter || 0),
                Number(b.avg_weight_per_mixedfilter || 0)
              )
            );
          case 'nuts-high':
            return Number(b.free_nut || 0) - Number(a.free_nut || 0);
          case 'nuts-low':
            return Number(a.free_nut || 0) - Number(b.free_nut || 0);
          default:
            return 0;
        }
      });
    }

    // Apply filtering
    if (filters.length > 0) {
      result = result.filter((region) => {
        return filters.every((filter) => {
          const maxWeight = Math.max(
            Number(region.avg_weight_per_singlefilter || 0),
            Number(region.avg_weight_per_doublefilter || 0),
            Number(region.avg_weight_per_mixedfilter || 0)
          );

          switch (filter) {
            case 'single-filter':
              return Number(region.singlefilter_price) > 0;
            case 'double-filter':
              return Number(region.doublefilter_price) > 0;
            case 'mixed-filter':
              return Number(region.mixedfilter_price) > 0;
            case 'high-weight':
              return maxWeight > 2;
            case 'medium-weight':
              return maxWeight >= 1 && maxWeight <= 2;
            case 'low-weight':
              return maxWeight < 1;
            default:
              return true;
          }
        });
      });
    }

    setFilteredRegions(result);
  }, [sortBy, filters]);

  return (
    <div className="relative min-h-screen" ref={contentRef}>
      
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-yellow-500 opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      {/* ML Video Section - Placed at the top */}
      <MLVideoSection />
      
      <div className="container mx-auto px-4 py-6 relative z-10">
      {/* Search Bar */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search regions..."
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-sm"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm === '') {
                  setFilteredRegions(regions);
                } else {
                  const filtered = regions.filter(region => 
                    region.name.toLowerCase().includes(searchTerm)
                  );
                  setFilteredRegions(filtered);
                }
              }}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex justify-center sm:justify-end mb-8 gap-4">
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex-1 sm:flex-initial flex items-center justify-center bg-white px-4 py-3 sm:py-2.5 rounded-lg text-sm shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 hover:scale-105 active:scale-98 transition-all duration-200 relative overflow-hidden group touch-manipulation"
          disabled={loading || regions.length === 0}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <FaFilter className="mr-2 text-primary" />
          <span className="text-gray-700 font-medium relative z-10">Filter</span>
          {filters.length > 0 && (
            <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{filters.length}</span>
          )}
        </button>
        <button
          onClick={() => setShowSortModal(true)}
          className="flex-1 sm:flex-initial flex items-center justify-center bg-white px-4 py-3 sm:py-2.5 rounded-lg text-sm shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 hover:scale-105 active:scale-98 transition-all duration-200 relative overflow-hidden group touch-manipulation"
          disabled={loading || regions.length === 0}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <FaSort className="mr-2 text-primary" />
          <span className="text-gray-700 font-medium relative z-10">Sort</span>
          {sortBy && (
            <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">✓</span>
          )}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="animate-ping absolute inset-0 rounded-full h-12 w-12 bg-primary opacity-20"></div>
            <div className="animate-spin relative rounded-full h-12 w-12 border-2 border-transparent border-t-primary border-b-primary"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredRegions.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-2">No regions found</p>
          <p className="text-gray-400">Try adjusting your filters or check back later</p>
        </div>
      )}
      
      {/* Region Cards */}
      {!loading && !error && filteredRegions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRegions.map((region, index) => (
            <div 
              key={region.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RegionCard region={region} />
            </div>
          ))}
        </div>
      )}

      {/* Sort Modal */}
      {showSortModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md p-6 animate-slide-up shadow-xl mx-4">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">Sort By</h3>
              <button 
                onClick={() => setShowSortModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  className="w-full text-left py-3.5 px-4 rounded-lg flex items-center transition-all duration-200 hover:bg-gray-50"
                  onClick={() => handleSort(option.id)}
                >
                  <div className={`w-6 h-6 rounded-full border-2 ${sortBy === option.id ? 'border-primary' : 'border-gray-300'} mr-3 flex items-center justify-center`}>
                    {sortBy === option.id && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className={`${sortBy === option.id ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>{option.label}</span>
                </button>
              ))}
              
              {sortBy && (
                <button
                  className="w-full mt-4 text-center px-4 py-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium"
                  onClick={() => handleSort('')}
                >
                  Clear Sorting
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md p-6 animate-slide-up shadow-xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">Filter By</h3>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2 mb-5">
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  className="w-full text-left py-3.5 px-4 rounded-lg flex items-center transition-all duration-200 hover:bg-gray-50"
                  onClick={() => {
                    const newFilters = filters.includes(option.id)
                      ? filters.filter(id => id !== option.id)
                      : [...filters, option.id];
                    handleFilter(newFilters);
                  }}
                >
                  <div className={`w-6 h-6 rounded-md border-2 ${filters.includes(option.id) ? 'bg-primary border-primary' : 'border-gray-300'} mr-3 flex items-center justify-center`}>
                    {filters.includes(option.id) && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`${filters.includes(option.id) ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>{option.label}</span>
                </button>
              ))}
            </div>
            {filters.length > 0 && (
              <button 
                onClick={() => {
                  setFilters([]);
                  setShowFilterModal(false);
                }}
                className="w-full py-3 bg-gray-50 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default HomePage;