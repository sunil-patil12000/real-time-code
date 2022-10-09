
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editor from './pages/Editor';
import {Toaster} from 'react-hot-toast'


function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          
          reverseOrder={false}
        />

      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Editor/:RoomID" element={<Editor />}></Route>
        </Routes>


      </BrowserRouter>


    </>
  );
}

export default App;
