
import '../App.css';
import { Layout } from 'antd';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { lazy, Suspense, useEffect } from 'react';
import MenuNav from "../common/components/Menu";
import Header_r from '../common/components/Header';
import { AuthRoute, PrivateRoute } from './guard';
import { useDispatch } from 'react-redux';
import { fetchProfileAction } from '../featurns/authentication/utils/action';
import FooterMovie from '../common/components/Footer';
const { Sider, Content, Footer, Header } = Layout;
const Movies = lazy(() => import("../featurns/admin/pages/home"));
const Create = lazy(() => import("../featurns/admin/pages/createMovie"));
const ShowTimes = lazy(() => import("../featurns/admin/pages/showTimes"));
const Signin =lazy(()=>import("../featurns/authentication/pages/SignIn"))
const Signup =lazy(()=>import("../featurns/authentication/pages/SignUp"))
const user =lazy(()=>import("../featurns/admin/pages/managementUser"))
const userAdd =lazy(()=>import("../featurns/admin/pages/userAddUpdate"))
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchProfileAction())
  })
  return (
    <BrowserRouter>
      <Layout>
        <Sider style={{ width: "auto",paddingTop:"10px" }}><MenuNav /></Sider>
        <Layout style={{margin:"10px"}}>
          <Header style={{ height: "auto", background: "#339999" ,marginBottom:"10px"}}><Header_r /></Header>
          <Content >
            <Suspense fallback={<div>loading...</div>}>
              <Switch>
                <PrivateRoute path="/" component={Movies} redirectComp="/signin"  exact />
                <PrivateRoute path="/addnew" component={Create} redirectComp="/signin" />
                <PrivateRoute path="/edit/:id" component={Create} redirectComp="/signin" />
                <PrivateRoute path="/showtime/:id" component={ShowTimes} redirectComp="/signin"  />
                <PrivateRoute path="/users" component={user} redirectPath="/signin" />
                <PrivateRoute path="/user/addUser" component={userAdd} redirectComp="/signin" />
                <PrivateRoute path="/user/editUser" component={userAdd} redirectComp="/signin" />
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
          <Footer>
            <FooterMovie></FooterMovie>
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
