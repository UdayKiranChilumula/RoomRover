import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { Home } from "./pages/home/Home"
import { List } from "./pages/list/List"
import { Hotel } from "./pages/hotels/Hotel"
import { Login } from "./pages/login/Login"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotel" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
