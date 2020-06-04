import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from "./firebase/PrivateRoute";
import CadastroPage from "./pages/CadastroPage";
import EditPage from "./pages/EditPage";
import EditPasswordPage from "./pages/EditPasswordPage";
import EditNamePage from "./pages/EditNamePage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/dashboard" component={UserDashboard} />
          <PrivateRoute exact path="/account" component={Account} />
          <PrivateRoute exact path="/cadex" component={CadastroPage} />
          <PrivateRoute exact path="/dashboard/edit/:idpage" component={EditPage} />
          <PrivateRoute exact path="/account/editpass" component={EditPasswordPage} />
          <PrivateRoute exact path="/account/editname" component={EditNamePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
