import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import SignUp from './src/pages/SignUp';
import Loading from './src/pages/Loading';
import AddDetails from './src/pages/AddDetails';
import ShowDetails from './src/pages/ShowDetails';
import ShowMap from './src/pages/ShowMap';


const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title:"Login Screen",
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#00BCD4'
      },
      headerTitleStyle: {
        flex: 1
      },        // this will do your task
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title:"SignUp Screen",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#00BCD4'
      },
      headerTitleStyle: {
        flex: 1
      },        // this will do your task
    }
  },
  AddDetails: {
    screen: AddDetails,
    navigationOptions: {
      header: null        // this will do your task
    }
  },
  ShowMap: {
    screen: ShowMap,
    navigationOptions: {
      header: null        // this will do your task
    }
  },
  ShowDetails: {
    screen: ShowDetails,
    navigationOptions: {
      header: null        // this will do your task
    }
  },
  Loading: {
    screen: Loading,
    navigationOptions: {
      header: null        // this will do your task
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title:"Home Screen",
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#00BCD4'
      },
      headerTitleStyle: {
        flex: 1
      },        // this will do your task
    }
  },
},
  {
    initialRouteName: 'Loading'
  });

const App = createAppContainer(AppNavigator);

export default App;