import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from './pages/Login';
import Timeline from './pages/Timeline';
import New from './pages/New';

//Função que fica por volta de todas as navegações
const Routes = createAppContainer(
  //Navegação não tem efeito visual e é impossivel voltar
  createSwitchNavigator({
    Login,
    App: createSwitchNavigator({
      Timeline,
      New,
    }),
  }),
);

export default Routes;