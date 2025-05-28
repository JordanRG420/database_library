import {
  IonInput,
  IonButton,
  IonPage,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  useIonToast,
  IonText,
  IonLoading,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import "./PrestamosForm.css";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import {
  bookOutline,
  personOutline,
  calendarOutline,
  saveOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  crearPrestamo,
  obtenerPrestamo,
  actualizarPrestamo,
  devolverLibro,
} from "../../service/prestamo.service";
import { listarLibrosDisponibles } from "../../service/libro.service";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { listarUsuarios } from "../../service/usuario.service";

const validationSchema = Yup.object({
  libroId: Yup.number()
    .required("El libro es requerido")
    .min(1, "Seleccione un libro válido"),
  usuarioId: Yup.number()
    .required("El usuario es requerido")
    .min(1, "Seleccione un usuario válido"),
});

export function PrestamoForm() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [present] = useIonToast();
  const [isLoading, setIsLoading] = useState(!!id);
  const [libros, setLibros] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [esDevolucion, setEsDevolucion] = useState(false);

  const formik = useFormik({
    initialValues: {
      libroId: 0,
      usuarioId: 0,
      observaciones: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        if (esDevolucion) {
          await devolverLibro(parseInt(id));
          present({
            message: "Devolución registrada correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        } else if (id) {
          await actualizarPrestamo(parseInt(id), {
            libroId: values.libroId,
            usuarioId: values.usuarioId,
          });
          present({
            message: "Préstamo actualizado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        } else {
          await crearPrestamo({
            libroId: values.libroId,
            usuarioId: values.usuarioId,
          });
          present({
            message: "Préstamo creado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        }

        history.push("/prestamos");
      } catch (error: any) {
        const message = error.message || "Error al procesar el préstamo";
        setErrorMessage(message);
        present({
          message,
          duration: 5000,
          position: "top",
          color: "danger",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);

        const librosData = await listarLibrosDisponibles();
        setLibros(librosData);

        try {
          const usuariosData = await listarUsuarios();
          const usuariosFormateados = usuariosData.map((usuario) => ({
            id: usuario.id,
            nombre: usuario.username,
          }));
          setUsuarios(usuariosFormateados);
        } catch (error) {
          console.error("Error cargando usuarios:", error);
          present({
            message: "Error al cargar la lista de usuarios",
            duration: 3000,
            color: "danger",
          });
          setUsuarios([]);
        }

        if (id) {
          const prestamoData = await obtenerPrestamo(parseInt(id));
          formik.setValues({
            libroId: prestamoData.libroId,
            usuarioId: prestamoData.usuarioId,
            observaciones: "",
          });

          if (!prestamoData.devuelto) {
            setEsDevolucion(true);
          }
        }
      } catch (error: any) {
        present({
          message: error.message || "Error al cargar los datos iniciales",
          duration: 5000,
          position: "top",
          color: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [id]);

  if (isLoading) {
    return <IonLoading isOpen={true} message="Cargando datos..." />;
  }

  return (
    <IonPage>
      <CustomHeader
        pageName={
          esDevolucion
            ? "Registrar Devolución"
            : id
            ? "Editar Préstamo"
            : "Nuevo Préstamo"
        }
        showMenuButton={false}
        showLogoutButton={false}
      />

      <IonContent className="ion-padding">
        <form className="prestamo-form">
          <h2 style={{ color: "var(--ion-color-primary)", textAlign: "center" }}>
            {esDevolucion
              ? "Registrar Devolución"
              : id
              ? "Editar Préstamo"
              : "Nuevo Préstamo"}
          </h2>

          {/* Libro */}
          <IonItem className="form-field-group">
            <IonIcon icon={bookOutline} slot="start" className="input-icon" />
            <IonLabel position="stacked">Libro*</IonLabel>
            <IonSelect
              value={formik.values.libroId}
              onIonChange={(e) =>
                formik.setFieldValue("libroId", e.detail.value)
              }
              placeholder="Seleccione un libro"
              className="custom-select"
              disabled={esDevolucion}
            >
              {libros.map((libro) => (
                <IonSelectOption key={libro.id} value={libro.id}>
                  {libro.titulo}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {formik.errors.libroId && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.libroId}</small>
            </IonText>
          )}

          {/* Usuario */}
          <IonItem className="form-field-group">
            <IonIcon icon={personOutline} slot="start" className="input-icon" />
            <IonLabel position="stacked">Usuario*</IonLabel>
            <IonSelect
              value={formik.values.usuarioId}
              onIonChange={(e) =>
                formik.setFieldValue("usuarioId", e.detail.value)
              }
              placeholder="Seleccione un usuario"
              className="custom-select"
              disabled={esDevolucion}
            >
              {usuarios.map((usuario) => (
                <IonSelectOption key={usuario.id} value={usuario.id}>
                  {usuario.nombre}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {formik.errors.usuarioId && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.usuarioId}</small>
            </IonText>
          )}

          {/* Observaciones */}
          {esDevolucion && (
            <IonItem className="form-field-group">
              <IonIcon
                icon={calendarOutline}
                slot="start"
                className="input-icon"
              />
              <IonLabel position="stacked">Observaciones</IonLabel>
              <IonTextarea
                className="custom-textarea"
                value={formik.values.observaciones}
                onIonChange={(e) =>
                  formik.setFieldValue("observaciones", e.detail.value)
                }
                placeholder="Ingrese observaciones sobre la devolución"
                rows={3}
              />
            </IonItem>
          )}

          {errorMessage && (
            <div className="error-message">
              <IonText color="danger">{errorMessage}</IonText>
            </div>
          )}

          <div className="form-actions">
            <IonButton
              className="cancel-button"
              expand="block"
              fill="outline"
              onClick={() => history.goBack()}
              disabled={isSubmitting}
            >
              <IonIcon icon={arrowBackOutline} slot="start" />
              Cancelar
            </IonButton>

            <IonButton
              className="submit-button"
              expand="block"
              onClick={() => formik.handleSubmit()}
              disabled={isSubmitting}
            >
              <IonIcon icon={saveOutline} slot="start" />
              {isSubmitting
                ? esDevolucion
                  ? "Registrando..."
                  : "Guardando..."
                : esDevolucion
                ? "Registrar Devolución"
                : "Guardar"}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}
