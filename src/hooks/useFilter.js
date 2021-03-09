import { useState } from 'react';

function useFilter(defaultFilter = 'all') {
  const [state, setState] = useState([
    {
      id: 'all',
      label: 'All',
      active: defaultFilter === 'all' || defaultFilter !== 'inprogress' || defaultFilter !== 'completed'
    },
    {
      id: 'inprogress',
      label: 'In Progress',
      active: defaultFilter === 'inprogress'
    },
    {
      id: 'completed',
      label: 'Completed',
      active: defaultFilter === 'completed'
    }
  ]);

  function setFilter(id) {
    const updatedFilters = state.map((singlefilter) => {
      if (singlefilter.id === id) {
        return {
          ...singlefilter,
          active: true
        };
      }

      return {
        ...singlefilter,
        active: false
      };
    });

    setState([...updatedFilters]);
  }

  return {
    filters: state,
    setFilter
  };
}

export default useFilter;
