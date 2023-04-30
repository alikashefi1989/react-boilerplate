// module
import { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
// custom
import Layout from "./layout/layout";
import appRoutes from "./routes";
import useAuth from "./hooks/auth-hook";
import PoratlComponent from "./hooks/portal-hook";

const App: React.FC = () => {
  useAuth();

  return (
    <>
      <PoratlComponent
        poratlComponentStyle={{
          'display': 'inline-flex',
          'justify-content': 'center',
          'align-items': 'center',
          'margin': 'auto',
          'width': '50px',
          'height': '50px',
          'background-color': 'blue',
          'color': 'red',
          'border-radius': '25px',
          'position': 'fixed',
          'bottom': '20px',
          'right': '20px',
        }}
        poratlComponentId="1"
        children={<div>fgergf</div>}
      />
      <Layout>
        <Routes>
          {
            appRoutes.map((route: { path: string; auth: boolean; cmp: () => ReactNode }) => {
              return <Route
                key={route.path}
                path={route.path}
                element={route.cmp()}
              />
            })
          }
        </Routes>
      </Layout>
    </>
  )
};

export default App;