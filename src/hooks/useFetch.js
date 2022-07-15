import { useEffect, useState } from 'react';

const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

// fetch API
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(URL);
      const planets = await response.json();
      setData(planets.results.map(({ residents, ...rest }) => rest)
        .sort((a, b) => a.name.localeCompare(b.name)));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { isLoading, data };
};

export default useFetch;
