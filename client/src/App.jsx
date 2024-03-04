import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'
import PriveteRouter from './components/PriveteRouter'
import OnlyAdminPriveteRouter from './components/OnlyAdminPriveteRouter'
import CreatePost from './pages/CreatePost'
export default function App() {
  return (
    <BrowserRouter>
    <Header />
        <Routes>
          <Route path='/'  element={<Home />}/>
          <Route path='/About'  element={<About />}/>
          <Route path='/sign-up'  element={<SignUp />}/>
          <Route path='/sign-in'  element={<SignIn />}/>
          <Route element={<PriveteRouter />}>
              <Route path='/dashboard'  element={<Dashboard />}/>
          </Route>
          <Route element={<OnlyAdminPriveteRouter />}>
              <Route path='/create-post'  element={<CreatePost />}/>
          </Route>
          <Route path='/projects'  element={<Projects />}/>
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}
