import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import "assets/css/MyCustom.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import SignIn from "./views/auth/signIn";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <HashRouter>
          <Switch>
            <Route path={`/singIn`} component={SignIn} />
            <Route path={`/`} component={AdminLayout} />
            <Route path={`/rtl`} component={RTLLayout} />
          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
