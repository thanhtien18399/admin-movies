
import '../App.css';
import { Layout } from 'antd';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { lazy, Suspense, useEffect } from 'react';
import MenuNav from "../common/components/Menu";
import Header_r from '../common/components/Header';
import { AuthRoute } from './guard';
import { useDispatch } from 'react-redux';
import { fetchProfileAction } from '../featurns/authentication/utils/action';
const { Sider, Content, Footer, Header } = Layout;
const Movies = lazy(() => import("../featurns/admin/pages/home"));
const Create = lazy(() => import("../featurns/admin/pages/createMovie"));
const Signin =lazy(()=>import("../featurns/authentication/pages/SignIn"))
const Signup =lazy(()=>import("../featurns/authentication/pages/SignUp"))
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchProfileAction())
  })
  return (
    <BrowserRouter>
      <Layout>
        <Sider style={{ width: "auto" }}><MenuNav /></Sider>
        <Layout>
          <Header style={{ height: "auto", background: "none" }}><Header_r /></Header>
          <Content>
            <Suspense fallback={<div>loading...</div>}>
              <Switch>
                <Route path="/" component={Movies} exact />
                <Route path="/create" component={Create} />
                <AuthRoute
                  path="/signin"
                  component={Signin}
                  redirectPath="/" />
                <AuthRoute
                  path="/signup"
                  component={Signup}
                  redirectPath="/" />
                <Redirect to="/" />
              </Switch>
            </Suspense>

          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
