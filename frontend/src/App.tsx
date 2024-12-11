import ToolBar from './components/ToolBar/ToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Reviews from './features/reviews/container/Reviews.tsx';

const App = () => {

  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Reviews />} />
            <Route path='*' element={<h6>Not Found</h6>} />
          </Routes>
        </div>
      </main>
    </>
  )
};

export default App
