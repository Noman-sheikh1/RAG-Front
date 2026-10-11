import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Body from './componenets/Body.jsx';
import About from './componenets/About.jsx';
import Home from './componenets/home.jsx';
import RagChatbot from './componenets/RagChatbot.jsx';
import ContactUs from './componenets/ContactUs.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />

        {/* Public RAG chatbot */}
        <Route path="/chatbot" element={<RagChatbot />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter basename="/">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
