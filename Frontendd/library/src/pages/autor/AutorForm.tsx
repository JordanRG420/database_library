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
} from "@ionic/react";
import "./AutorForm.css";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import {
  personOutline,
  globeOutline,
  saveOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  createAutor,
  getAutorById,
  updateAutor,
} from "../../service/autor.service";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

// Esquema de validación
const validationSchema = Yup.object({
  nombre: Yup.string()
    .required("El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  nacionalidad: Yup.string().max(100, "Máximo 100 caracteres"),
});

export function AutorForm() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [present] = useIonToast();
  const [isLoading, setIsLoading] = useState(!!id);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      nacionalidad: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        if (id) {
          // Modo edición
          await updateAutor(parseInt(id), values);
          present({
            message: "Autor actualizado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        } else {
          // Modo creación
          await createAutor(values);
          present({
            message: "Autor creado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        }

        history.push("/autores");
      } catch (error: any) {
        const message = error.message || "Error al guardar el autor";
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
    if (id) {
      const loadAutorData = async () => {
        try {
          const autorData = await getAutorById(parseInt(id));
          formik.setValues({
            nombre: autorData.nombre,
            nacionalidad: autorData.nacionalidad || "",
          });
        } catch (error: any) {
          present({
            message: error.message || "Error al cargar los datos del autor",
            duration: 5000,
            position: "top",
            color: "danger",
          });
          history.push("/autores");
        } finally {
          setIsLoading(false);
        }
      };

      loadAutorData();
    }
  }, [id]);

  if (isLoading) {
    return <IonLoading isOpen={true} message="Cargando datos..." />;
  }

  return (
    <IonPage>
      <CustomHeader
        pageName={id ? "Editar Autor" : "Nuevo Autor"}
        showMenuButton={true}
        showLogoutButton={false}
      />

      <IonContent className="ion-padding">
        <form className="autor-form">
          <h2
            style={{ color: "var(--ion-color-primary)", textAlign: "center" }}
          >
            {id ? "Editar Autor" : "Nuevo Autor"}
          </h2>

          {/* Nombre */}
          <IonItem className="form-field-group">
            <IonIcon icon={personOutline} slot="start" className="input-icon" />
            <IonLabel position="stacked">Nombre*</IonLabel>
            <IonInput
              className="custom-input"
              value={formik.values.nombre}
              onIonChange={(e) =>
                formik.setFieldValue("nombre", e.detail.value)
              }
              placeholder="Ingrese el nombre del autor"
            />
          </IonItem>
          {formik.errors.nombre && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.nombre}</small>
            </IonText>
          )}

          {/* Nacionalidad */}
          <IonItem className="form-field-group">
            <IonIcon icon={globeOutline} slot="start" className="input-icon" />
            <IonLabel position="stacked">Nacionalidad</IonLabel>
            <IonInput
              className="custom-input"
              value={formik.values.nacionalidad}
              onIonChange={(e) =>
                formik.setFieldValue("nacionalidad", e.detail.value)
              }
              placeholder="Ingrese la nacionalidad"
            />
          </IonItem>
          {formik.errors.nacionalidad && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.nacionalidad}</small>
            </IonText>
          )}

          {/* Mensaje de error general */}
          {errorMessage && (
            <div className="error-message">
              <IonText color="danger">{errorMessage}</IonText>
            </div>
          )}

          {/* Botones de acción */}
          <div className="form-actions">
            <IonButton
              className="cancel-button"
              expand="block"
              fill="outline"
              onClick={async () => {
                await formik.handleSubmit();
                history.push("/inicio");
              }}
              disabled={isSubmitting}
            >
              <IonIcon icon={arrowBackOutline} slot="start" />
              Cancelar
            </IonButton>

            <IonButton
              className="submit-button"
              expand="block"
              onClick={async () => {
                await formik.handleSubmit();
                history.push("/inicio");
              }}
              disabled={isSubmitting}
            >
              <IonIcon icon={saveOutline} slot="start" />
              {isSubmitting ? "Guardando..." : "Guardar"}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}
