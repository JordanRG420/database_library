import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { listarPrestamos, marcarComoDevuelto } from "../../service/prestamo.service";
import { useHistory } from "react-router-dom";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { PrestamoResponse } from "../../models/prestamo.model";

const ReporteForm = () => {
  const [prestamos, setPrestamos] = useState<PrestamoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const cargarPrestamos = async () => {
    try {
      setLoading(true);
      const data = await listarPrestamos();
      setPrestamos(data);
    } catch (error) {
      console.error("Error al obtener préstamos:", error);
      setToastMessage("Error al cargar los préstamos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPrestamos();
  }, []);

  const handleDevolver = async (id: number) => {
    try {
      await marcarComoDevuelto(id);
      setToastMessage("Libro marcado como devuelto.");
      cargarPrestamos(); // recargar la lista
    } catch (error) {
      console.error("Error al devolver el libro:", error);
      setToastMessage("Error al devolver el libro.");
    }
  };

  return (
    <IonPage>
      <CustomHeader pageName="Reportes" />
      <IonContent className="ion-padding">
        {loading ? (
          <IonLoading isOpen={true} message="Cargando préstamos..." />
        ) : (
          <>
            {prestamos.length === 0 ? (
              <IonText color="medium">
                <p>No hay préstamos registrados.</p>
              </IonText>
            ) : (
              <IonList>
                {prestamos.map((prestamo) => (
                  <IonItem key={prestamo.id}>
                    <IonLabel>
                      <h2>{prestamo.libroTitulo}</h2>
                      <p>
                        Usuario: {prestamo.usuarioNombre} <br />
                        Fecha: {prestamo.fechaPrestamo} <br />
                        Estado:{" "}
                        {prestamo.devuelto ? (
                          <IonText color="success">Devuelto</IonText>
                        ) : (
                          <IonText color="danger">Pendiente</IonText>
                        )}
                      </p>
                    </IonLabel>

                    {!prestamo.devuelto && (
                      <IonButton
                        slot="end"
                        color="success"
                        fill="outline"
                        onClick={() => handleDevolver(prestamo.id)}
                      >
                        Devolver
                      </IonButton>
                    )}
                  </IonItem>
                ))}
              </IonList>
            )}
          </>
        )}

        <IonToast
          isOpen={toastMessage !== ""}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default ReporteForm;
