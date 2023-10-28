import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [images, setImages] = useState([])
  const [query, setQuery] = useState('spiderman')
  const [count, setCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAPI(true);
  }, []);

  const fetchAPI = async (action) => {
    setIsLoading(true);


    if (action === true) {
      const response = await axios.get('https://api.unsplash.com/search/photos?page=1&query=' + query + '&client_id=cZ-ON-lBWk7c3j1Z3DK29lv5qBf3-8KO7nWwe0uDXss')
      const data = await response.data
      setImages(data.results)

    }
    else {
      setCount(count + 1)
      let a = count + 1
      const response = await axios.get('https://api.unsplash.com/search/photos?page=' + a + '&query=' + query + '&client_id=cZ-ON-lBWk7c3j1Z3DK29lv5qBf3-8KO7nWwe0uDXss')
      const data = await response.data
      setImages([...images, ...data.results])
    }

    setIsLoading(false);
  }


  const a = images.map((image) =>
    <img className="haha" src={image.urls.small} />
  )

  return (
    <div className="App">
      <div className="d-flex mx-auto p-3" role="search">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="form-control me-2 w-25" type="search" placeholder="Search" aria-label="Search" />
        <button onClick={() => fetchAPI(true)} className="btn btn-outline-success " type="submit">Search</button>
      </div>
      {isLoading && <div class="loader">Loading...</div>
      }
      <InfiniteScroll
        dataLength={images.length}
        next={() => fetchAPI(false)}
        hasMore={true}
        loader={<div class="loader">Loading...</div>}

      >
        <div className="photos">
          {a}
        </div>

      </InfiniteScroll>
    </div>
  );
}

export default App;
