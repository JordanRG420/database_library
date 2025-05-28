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
  IonTextarea,
} from "@ionic/react";
import "./CategoriaForm.css";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import {
  bookmarkOutline,
  documentTextOutline,
  saveOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  createCategoria,
  getCategoriaById,
  updateCategoria,
} from "../../service/categoria.service";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

// Esquema de validación
const validationSchema = Yup.object({
  nombre: Yup.string()
    .required("El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  descripcion: Yup.string().max(255, "Máximo 255 caracteres"),
});

export function CategoriaForm() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [present] = useIonToast();
  const [isLoading, setIsLoading] = useState(!!id);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        const categoriaData = {
          nombre: values.nombre,
          descripcion: values.descripcion || undefined,
        };

        if (id) {
          await updateCategoria(parseInt(id), categoriaData);
          present({
            message: "Categoría actualizada correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        } else {
          await createCategoria(categoriaData);
          present({
            message: "Categoría creada correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        }

        history.push("/inicio");
      } catch (error: any) {
        const message = error.message || "Error al guardar la categoría";
        setErrorMessage(message);
        setErrors({ nombre: message });
        present({
          message,
          duration: 5000,
          position: "top",
          color: "danger",
        });
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (id) {
      const loadCategoriaData = async () => {
        try {
          const categoriaData = await getCategoriaById(parseInt(id));
          formik.setValues({
            nombre: categoriaData.nombre,
            descripcion: categoriaData.descripcion || "",
          });
        } catch (error: any) {
          present({
            message:
              error.message || "Error al cargar los datos de la categoría",
            duration: 5000,
            position: "top",
            color: "danger",
          });
          history.push("/categorias");
        } finally {
          setIsLoading(false);
        }
      };

      loadCategoriaData();
    }
  }, [id]);

  if (isLoading) {
    return <IonLoading isOpen={true} message="Cargando datos..." />;
  }

  return (
    <IonPage>
      <CustomHeader
        pageName={id ? "Editar Categoría" : "Nueva Categoría"}
        showMenuButton={true}
        showLogoutButton={false}
      />

      <IonContent className="ion-padding">
        <form className="categoria-form">
          <h2
            style={{ color: "var(--ion-color-primary)", textAlign: "center" }}
          >
            {id ? "Editar Categoría" : "Nueva Categoría"}
          </h2>

          {/* Nombre */}
          <IonItem className="form-field-group">
            <IonIcon
              icon={bookmarkOutline}
              slot="start"
              className="input-icon"
            />
            <IonLabel position="stacked">Nombre*</IonLabel>
            <IonInput
              className="custom-input"
              value={formik.values.nombre}
              onIonChange={(e) =>
                formik.setFieldValue("nombre", e.detail.value)
              }
              placeholder="Ingrese el nombre de la categoría"
            />
          </IonItem>
          {formik.errors.nombre && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.nombre}</small>
            </IonText>
          )}

          {/* Descripción */}
          <IonItem className="form-field-group">
            <IonIcon
              icon={documentTextOutline}
              slot="start"
              className="input-icon"
            />
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonTextarea
              className="custom-textarea"
              value={formik.values.descripcion}
              onIonChange={(e) =>
                formik.setFieldValue("descripcion", e.detail.value)
              }
              placeholder="Ingrese una descripción"
              rows={4}
            />
          </IonItem>
          {formik.errors.descripcion && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.descripcion}</small>
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
              onClick={() => history.goBack()}
              disabled={isSubmitting}
            >
              <IonIcon icon={arrowBackOutline} slot="start" />
              Cancelar
            </IonButton>

            <IonButton
              className="submit-button"
              expand="block"
              onClick={() => formik.handleSubmit()} // Eliminado el history.push que estaba aquí
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
