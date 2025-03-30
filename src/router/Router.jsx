import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';
import { RoutesWith } from './routes';

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Carregando...</div>}>
        <Switch>
          {RoutesWith.map((route, index) => (
            <Route key={index} path={route.path} exact component={route.component} />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
