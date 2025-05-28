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
  IonDatetime,
} from "@ionic/react";
import "./LibroForm.css";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import {
  bookOutline,
  personOutline,
  bookmarkOutline,
  calendarOutline,
  saveOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  crearLibro,
  obtenerLibro,
  actualizarLibro,
} from "../../service/libro.service";
import { listarAutores } from "../../service/autor.service";
import { listarCategorias } from "../../service/categoria.service";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

// Esquema de validación
const validationSchema = Yup.object({
  titulo: Yup.string()
    .required("El título es requerido")
    .max(200, "Máximo 200 caracteres"),
  autorId: Yup.number()
    .required("El autor es requerido")
    .min(1, "Seleccione un autor válido"),
  categoriaId: Yup.number()
    .required("La categoría es requerida")
    .min(1, "Seleccione una categoría válida"),
  fechaPublicacion: Yup.string().nullable(),
});

export function LibroForm() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [present] = useIonToast();
  const [isLoading, setIsLoading] = useState(!!id);
  const [autores, setAutores] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);

  const formik = useFormik({
    initialValues: {
      titulo: "",
      autorId: 0,
      categoriaId: 0,
      fechaPublicacion: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        const libroData = {
          titulo: values.titulo,
          autorId: values.autorId,
          categoriaId: values.categoriaId,
          fechaPublicacion: values.fechaPublicacion || undefined,
        };

        if (id) {
          // Modo edición
          await actualizarLibro(parseInt(id), libroData);
          present({
            message: "Libro actualizado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        } else {
          // Modo creación
          await crearLibro(libroData);
          present({
            message: "Libro creado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        }

        history.push("/inicio"); // Cambiado de "/libros" a "/inicio"
      } catch (error: any) {
        const message = error.message || "Error al guardar el libro";
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
        const [autoresData, categoriasData] = await Promise.all([
          listarAutores(),
          listarCategorias(),
        ]);

        setAutores(autoresData);
        setCategorias(categoriasData);

        if (id) {
          const libroData = await obtenerLibro(parseInt(id));
          formik.setValues({
            titulo: libroData.titulo,
            autorId: libroData.autorId,
            categoriaId: libroData.categoriaId,
            fechaPublicacion: libroData.fechaPublicacion || "",
          });
        }
      } catch (error: any) {
        present({
          message: error.message || "Error al cargar los datos iniciales",
          duration: 5000,
          position: "top",
          color: "danger",
        });
        history.push("/inicio");
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
        pageName={id ? "Editar Libro" : "Nuevo Libro"}
        showMenuButton={true}
        showLogoutButton={false}
      />

      <IonContent className="ion-padding">
        <form className="libro-form">
          <h2
            style={{ color: "var(--ion-color-primary)", textAlign: "center" }}
          >
            {id ? "Editar Libro" : "Nuevo Libro"}
          </h2>

          {/* Título */}
          <IonItem className="form-field-group">
            <IonIcon icon={bookOutline} slot="start" className="input-icon" />
            <IonLabel position="stacked">Título*</IonLabel>
            <IonInput
              className="custom-input"
              value={formik.values.titulo}
              onIonChange={(e) =>
                formik.setFieldValue("titulo", e.detail.value)
              }
              placeholder="Ingrese el título del libro"
            />
          </IonItem>
          {formik.errors.titulo && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.titulo}</small>
            </IonText>
          )}

          {/* Autor */}
          <IonItem className="form-field-group">
            <IonIcon icon={personOutline} slot="start" className="input-icon" />
            <IonLabel position="stacked">Autor*</IonLabel>
            <IonSelect
              value={formik.values.autorId}
              onIonChange={(e) =>
                formik.setFieldValue("autorId", e.detail.value)
              }
              placeholder="Seleccione un autor"
              className="custom-select"
            >
              {autores.map((autor) => (
                <IonSelectOption key={autor.id} value={autor.id}>
                  {autor.nombre}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {formik.errors.autorId && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.autorId}</small>
            </IonText>
          )}

          {/* Categoría */}
          <IonItem className="form-field-group">
            <IonIcon
              icon={bookmarkOutline}
              slot="start"
              className="input-icon"
            />
            <IonLabel position="stacked">Categoría*</IonLabel>
            <IonSelect
              value={formik.values.categoriaId}
              onIonChange={(e) =>
                formik.setFieldValue("categoriaId", e.detail.value)
              }
              placeholder="Seleccione una categoría"
              className="custom-select"
            >
              {categorias.map((categoria) => (
                <IonSelectOption key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {formik.errors.categoriaId && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.categoriaId}</small>
            </IonText>
          )}

          {/* Fecha de Publicación */}
          <IonItem className="form-field-group">
            <IonIcon
              icon={calendarOutline}
              slot="start"
              className="input-icon"
            />
            <IonLabel position="stacked">Fecha de Publicación</IonLabel>
            <IonDatetime
              presentation="date"
              value={formik.values.fechaPublicacion}
              onIonChange={(e) =>
                formik.setFieldValue("fechaPublicacion", e.detail.value)
              }
              className="custom-datetime"
            />
          </IonItem>

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
