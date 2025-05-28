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
  IonToggle,
} from "@ionic/react";
import "./UsuarioForm.css";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import {
  personOutline,
  lockClosedOutline,
  saveOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
} from "../../service/usuario.service";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

// Esquema de validación
const validationSchema = Yup.object({
  username: Yup.string()
    .required("El nombre de usuario es requerido")
    .min(4, "Mínimo 4 caracteres")
    .max(50, "Máximo 50 caracteres"),
  password: Yup.string()
    .when("isEditing", (isEditing, schema) =>
      isEditing ? schema : schema.required("La contraseña es requerida")
    )
    .min(6, "Mínimo 6 caracteres")
    .max(100, "Máximo 100 caracteres"),
});

export function UsuarioForm() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [present] = useIonToast();
  const [isLoading, setIsLoading] = useState(!!id);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      isEditing: !!id,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        const usuarioData = {
          username: values.username,
          password: values.password,
        };

        if (id) {
          // Modo edición
          await actualizarUsuario(parseInt(id), usuarioData);
          present({
            message: "Usuario actualizado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        } else {
          // Modo creación
          await crearUsuario(usuarioData);
          present({
            message: "Usuario creado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        }

        history.push("/usuarios");
      } catch (error: any) {
        const message = error.message || "Error al guardar el usuario";
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
      const loadUsuarioData = async () => {
        try {
          const usuarioData = await obtenerUsuario(parseInt(id));
          formik.setValues({
            username: usuarioData.username,
            password: "",
            isEditing: true,
          });
        } catch (error: any) {
          present({
            message: error.message || "Error al cargar los datos del usuario",
            duration: 5000,
            position: "top",
            color: "danger",
          });
          history.push("/inicio");
        } finally {
          setIsLoading(false);
        }
      };

      loadUsuarioData();
    }
  }, [id]);

  if (isLoading) {
    return <IonLoading isOpen={true} message="Cargando datos..." />;
  }

  return (
    <IonPage>
      <CustomHeader
        pageName={id ? "Editar Usuario" : "Nuevo Usuario"}
        showMenuButton={false}
        showLogoutButton={false}
      />

      <IonContent className="ion-padding">
        <form className="usuario-form">
          <h2
            style={{ color: "var(--ion-color-primary)", textAlign: "center" }}
          >
            {id ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>

          {/* Nombre de usuario */}
          <IonItem className="form-field-group">
            <IonIcon icon={personOutline} slot="start" className="input-icon" />
            <IonLabel position="stacked">Nombre de usuario*</IonLabel>
            <IonInput
              className="custom-input"
              value={formik.values.username}
              onIonChange={(e) =>
                formik.setFieldValue("username", e.detail.value)
              }
              placeholder="Ingrese el nombre de usuario"
            />
          </IonItem>
          {formik.errors.username && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.username}</small>
            </IonText>
          )}

          {/* Contraseña */}
          <IonItem className="form-field-group">
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="input-icon"
            />
            <IonLabel position="stacked">
              {id ? "Nueva contraseña" : "Contraseña*"}
            </IonLabel>
            <IonInput
              className="custom-input"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onIonChange={(e) =>
                formik.setFieldValue("password", e.detail.value)
              }
              placeholder={
                id ? "Dejar en blanco para no cambiar" : "Ingrese la contraseña"
              }
            />
            <IonToggle
              slot="end"
              checked={showPassword}
              onIonChange={(e) => setShowPassword(e.detail.checked)}
            />
          </IonItem>
          {formik.errors.password && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.password}</small>
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
              onClick={async () => {
                await formik.handleSubmit();
                history.push("/login");
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
