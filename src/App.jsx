import { useContext } from 'react';
import MediaCard from './components/MediaCard';
import { GlobalContext, GlobalContextProvider } from './context/APIContext';
import AppHeader from './components/AppHeader';

function AppContent() {
  const { handleSearch, movies, series, filterTitle, setFilterTitle } = useContext(GlobalContext);

  const combinedResult = [...movies, ...series];

  return (
    <>
    <AppHeader />
      <div className="container-lg bg-dark">
        <div className="row">
          {combinedResult.map(item => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

// App wrappata dal provider
function App() {
  return (
    <GlobalContextProvider>
      <AppContent />
    </GlobalContextProvider>
  );
}

export default App;
