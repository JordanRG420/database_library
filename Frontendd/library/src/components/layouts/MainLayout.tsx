import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonAvatar,
  IonIcon,
  IonPage,
} from "@ionic/react";
import {
  homeOutline,
  documentTextOutline,
  receiptOutline,
  personOutline,
  bookOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "../CustomHeader/CustomHeader.css";
import CustomHeader from "../CustomHeader/CustomHeader";

interface MainLayoutProps {
  children: React.ReactNode;
  pageName: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageName }) => {
  const history = useHistory();

  const handleNavigation = (path: string) => {
    history.push(path);
    const menu = document.querySelector("ion-menu");
    menu?.close();
  };

  return (
    <>
      {/* Menú Lateral */}
      <IonMenu
        contentId="main-content"
        menuId="main-menu"
        side="start"
        className="custom-menu"
      >
        <IonContent className="menu-content">
          {/* Sección de perfil */}
          <div className="profile-section">
            <IonAvatar className="profile-avatar">
              <IonIcon icon={personOutline} className="profile-icon" />
            </IonAvatar>
            <IonLabel className="profile-name">Usuario</IonLabel>
            <IonLabel className="profile-email">
              usuario@erptributario.com
            </IonLabel>
          </div>

          {/* Items del menú */}
          <IonList className="menu-list">
            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/inicio")}
              >
                <IonIcon
                  slot="start"
                  icon={homeOutline}
                  className="menu-icon"
                />
                <IonLabel>Inicio</IonLabel>
              </IonItem>
            </IonMenuToggle>
            {/* Otros items del menú 
            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/usuarios")}
              >
                <IonIcon
                  slot="start"
                  icon={personOutline}
                  className="menu-icon"
                />
                <IonLabel>Usuarios</IonLabel>
              </IonItem>
            </IonMenuToggle>
            */}

            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/autores")}
              >
                <IonIcon
                  slot="start"
                  icon={personOutline}
                  className="menu-icon"
                />
                <IonLabel>Autores</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/libros")}
              >
                <IonIcon
                  slot="start"
                  icon={bookOutline}
                  className="menu-icon"
                />
                <IonLabel>Libros</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/categorias")}
              >
                <IonIcon
                  slot="start"
                  icon={documentTextOutline}
                  className="menu-icon"
                />
                <IonLabel>Categorias</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/prestamos")}
              >
                <IonIcon
                  slot="start"
                  icon={receiptOutline}
                  className="menu-icon"
                />
                <IonLabel>Prestamos</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/reportes")}
              >
                <IonIcon
                  slot="start"
                  icon={receiptOutline}
                  className="menu-icon"
                />
                <IonLabel>Reportes</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Página principal */}
      <IonPage id="main-content">
        <CustomHeader
          pageName={pageName}
          showMenuButton={true}
          showLogoutButton={true}
        />
        {children}
      </IonPage>
    </>
  );
};

export default MainLayout;
