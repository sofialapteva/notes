import { Route } from 'react-router-dom'
import Menu from "./components/menu";
import AllTags from "./components/AllTags";
import Main from './components/main'
import NewNote from './components/NewNote'
import AuthForm from './components/AuthForm'
import { useSelector } from 'react-redux'

function App() {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn)
  console.log(isLoggedIn)
  if (isLoggedIn) {
    return (
      <div className="grid grid-cols-5" >

        <div>
          <Menu />
        </div>

        <div className='col-span-4 ml-10 lg:ml-3'>
          <Route path='/new' component={NewNote} />
          <Route path='/main' component={Main} />
          <Route exact path='/tags' component={AllTags} />
          <Route path='/restaurants/:id/reviews/new' component={Menu} />
        </div>

      </div>
    );
  }
  return (
    <AuthForm />
  )
}

export default App;
