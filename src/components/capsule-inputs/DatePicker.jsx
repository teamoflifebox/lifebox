import { useState } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const DatePicker = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selected ? new Date(selected) : new Date());
  const [currentView, setCurrentView] = useState('days'); // 'days', 'months', 'years'
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Format the displayed date in the input
  const formatDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week (0-6) for first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Navigate to prev/next month
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };
  
  // Navigate to prev/next year
  const changeYear = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + increment);
    setCurrentDate(newDate);
  };
  
  // Handle date selection
  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    onChange(newDate.toISOString());
    setIsOpen(false);
  };
  
  // Handle month selection
  const handleMonthSelect = (month) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
    setCurrentView('days');
  };
  
  // Handle year selection
  const handleYearSelect = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setCurrentView('months');
  };
  
  // Render days view
  const renderDaysView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selected && new Date(selected).toDateString() === date.toDateString();
      const isPast = date < new Date().setHours(0, 0, 0, 0);
      
      days.push(
        <button
          key={day}
          type="button"
          disabled={isPast}
          onClick={() => handleDateSelect(day)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
            isSelected 
              ? 'bg-purple-600 text-white' 
              : isToday 
                ? 'bg-purple-100 text-purple-800' 
                : isPast 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'hover:bg-purple-50 text-gray-700'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };
  
  // Render months view
  const renderMonthsView = () => {
    return monthNames.map((month, index) => {
      const isCurrentMonth = currentDate.getMonth() === index;
      
      return (
        <button
          key={month}
          type="button"
          onClick={() => handleMonthSelect(index)}
          className={`w-24 h-12 rounded-md flex items-center justify-center ${
            isCurrentMonth 
              ? 'bg-purple-600 text-white' 
              : 'hover:bg-purple-50 text-gray-700'
          }`}
        >
          {month}
        </button>
      );
    });
  };
  
  // Render years view
  const renderYearsView = () => {
    const currentYear = currentDate.getFullYear();
    const startYear = currentYear - 5;
    const years = [];
    
    for (let year = startYear; year <= currentYear + 6; year++) {
      const isCurrentYear = currentYear === year;
      
      years.push(
        <button
          key={year}
          type="button"
          onClick={() => handleYearSelect(year)}
          className={`w-16 h-12 rounded-md flex items-center justify-center ${
            isCurrentYear 
              ? 'bg-purple-600 text-white' 
              : 'hover:bg-purple-50 text-gray-700'
          }`}
        >
          {year}
        </button>
      );
    }
    
    return years;
  };
  
  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          readOnly
          value={selected ? formatDate(new Date(selected)) : ''}
          onClick={() => setIsOpen(true)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
          placeholder="Select unlock date"
        />
        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            {currentView === 'days' && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentView('months')}
                  className="text-gray-700 hover:text-purple-600 px-2 py-1 rounded"
                >
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </button>
                <div className="flex space-x-1">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </>
            )}
            
            {currentView === 'months' && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentView('years')}
                  className="text-gray-700 hover:text-purple-600 px-2 py-1 rounded"
                >
                  {currentDate.getFullYear()}
                </button>
                <div className="flex space-x-1">
                  <button
                    type="button"
                    onClick={() => changeYear(-1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeYear(1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </>
            )}
            
            {currentView === 'years' && (
              <div className="flex justify-between w-full">
                <button
                  type="button"
                  onClick={() => changeYear(-12)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <span className="text-gray-700">
                  {currentDate.getFullYear() - 5} - {currentDate.getFullYear() + 6}
                </span>
                <button
                  type="button"
                  onClick={() => changeYear(12)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
          
          {currentView === 'days' && (
            <>
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="w-10 h-6 flex items-center justify-center text-xs text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {renderDaysView()}
              </div>
            </>
          )}
          
          {currentView === 'months' && (
            <div className="grid grid-cols-3 gap-2">
              {renderMonthsView()}
            </div>
          )}
          
          {currentView === 'years' && (
            <div className="grid grid-cols-3 gap-2">
              {renderYearsView()}
            </div>
          )}
          
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => {
                  const oneYearLater = new Date();
                  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
                  onChange(oneYearLater.toISOString());
                  setIsOpen(false);
                }}
                className="text-sm text-purple-600 hover:text-purple-800 px-3 py-1 rounded hover:bg-purple-50"
              >
                1 Year
              </button>
              
              <button
                type="button"
                onClick={() => {
                  const fiveYearsLater = new Date();
                  fiveYearsLater.setFullYear(fiveYearsLater.getFullYear() + 5);
                  onChange(fiveYearsLater.toISOString());
                  setIsOpen(false);
                }}
                className="text-sm text-purple-600 hover:text-purple-800 px-3 py-1 rounded hover:bg-purple-50"
              >
                5 Years
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;