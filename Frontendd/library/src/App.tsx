import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import MainLayout from "./components/layouts/MainLayout";
import { AutorForm } from "./pages/autor/AutorForm";
import { CategoriaForm } from "./pages/categoria/CategoriaForm";
import { LibroForm } from "./pages/libro/LibroForm";
import { PrestamoForm } from "./pages/prestamo/PrestamosForm";
import { UsuarioForm } from "./pages/usuario/UsuarioForm";
import { Login } from "./pages/login/Login";
import HomeScreen from "./pages/HomeScreen/HomeScreen";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/inicio">
          <MainLayout pageName="Inicio">
            <HomeScreen />
          </MainLayout>
        </Route>

        <Route exact path="/autores">
          <MainLayout pageName="Autores">
            <AutorForm />
          </MainLayout>
        </Route>

        <Route exact path="/categorias">
          <MainLayout pageName="Categorias">
            <CategoriaForm />
          </MainLayout>
        </Route>

        <Route exact path="/libros">
          <MainLayout pageName="Libros">
            <LibroForm />
          </MainLayout>
        </Route>

        <Route exact path="/prestamos">
          <MainLayout pageName="Prestamos">
            <PrestamoForm />
          </MainLayout>
        </Route>

        <Route exact path="/usuarios">
          <MainLayout pageName="Usuarios">
            <UsuarioForm />
          </MainLayout>
        </Route>

        <Route exact path="/login">
          <MainLayout pageName="Login">
            <Login />
          </MainLayout>
        </Route>

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
