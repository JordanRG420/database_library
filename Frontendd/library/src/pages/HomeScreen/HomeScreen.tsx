import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  bookOutline,
  personOutline,
  libraryOutline,
  calendarOutline,
  listOutline,
  addOutline,
} from "ionicons/icons";
import "./HomeScreen.css";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

interface CardData {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  route: string;
}

const HomeScreen: React.FC = () => {
  const history = useHistory();

  const cards: CardData[] = [
    {
      id: "1",
      title: "Usuarios",
      description: "Gestión de usuarios",
      icon: personOutline,
      color: "dark",
      route: "/usuarios",
    },
    {
      id: "2",
      title: "Autores",
      description: "Gestión de autores",
      icon: personOutline,
      color: "dark",
      route: "/autores",
    },
    {
      id: "3",
      title: "Libros",
      description: "Gestión de libros",
      icon: bookOutline,
      color: "medium",
      route: "/libros",
    },
    {
      id: "4",
      title: "Categorías",
      description: "Gestión de categorías",
      icon: listOutline,
      color: "medium",
      route: "/categorias",
    },
    {
      id: "5",
      title: "Préstamos",
      description: "Registro de préstamos",
      icon: libraryOutline,
      color: "dark",
      route: "/prestamos",
    },
    {
      id: "6",
      title: "Reportes",
      description: "Reportes y estadísticas",
      icon: calendarOutline,
      color: "medium",
      route: "/reportes",
    },
  ];

  const navigateTo = (route: string) => {
    history.push(route);
  };

  return (
    <IonPage>
      <CustomHeader
        pageName="Sistema de Biblioteca"
        showMenuButton={true}
        showLogoutButton={true}
      />

      <IonContent fullscreen className="ion-padding">
        {/* Tarjeta de bienvenida */}
        <IonCard
          className="welcome-card"
          style={{ backgroundColor: "#654922", color: "#654922" }}
        >
          <IonCardHeader>
            <IonCardTitle className="welcome-title">
              Bienvenido al Sistema de Biblioteca
            </IonCardTitle>
            <IonCardSubtitle className="welcome-subtitle">
              Gestión integral de recursos bibliográficos
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        {/* Grid de tarjetas */}
        <IonGrid>
          <IonRow>
            {cards.map((card) => (
              <IonCol size="12" sizeMd="6" sizeLg="4" key={card.id}>
                <IonCard
                  button
                  onClick={() => navigateTo(card.route)}
                  color={card.color}
                  className="feature-card"
                >
                  <div className="card-icon-container">
                    <IonIcon icon={card.icon} size="large" />
                  </div>
                  <IonCardHeader>
                    <IonCardTitle>{card.title}</IonCardTitle>
                    <IonCardSubtitle>{card.description}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Acciones rápidas */}
        <div className="quick-actions">
          <IonButton
            expand="block"
            onClick={() => navigateTo("/prestamos")}
          >
            <IonIcon icon={addOutline} slot="start" />
            Nuevo Préstamo
          </IonButton>
          <IonButton
            expand="block"
            fill="outline"
            onClick={() => navigateTo("/libros")}
          >
            <IonIcon icon={addOutline} slot="start" />
            Nuevo Libro
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomeScreen;
