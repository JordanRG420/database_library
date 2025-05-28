import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  useIonToast,
  IonLoading,
  IonImg,
  IonRow,
  IonCol,
  IonGrid,
  IonIcon,
} from "@ionic/react";
import "./Login.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { personOutline, lockClosedOutline } from "ionicons/icons";
import * as Yup from "yup";
import { login } from "../../service/auth.service";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { useState } from "react";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("El nombre de usuario es requerido")
    .min(4, "Mínimo 4 caracteres"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "Mínimo 6 caracteres"),
});

export function Login() {
  const history = useHistory();
  const [present] = useIonToast();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await login(values);

        if (response.autenticado) {
          // Guardar datos de autenticación
          localStorage.setItem("authToken", "dummy-token"); // Reemplazar con token real
          localStorage.setItem(
            "userData",
            JSON.stringify({
              id: response.usuarioId,
              username: response.username,
            })
          );

          present({
            message: response.mensaje,
            duration: 3000,
            position: "top",
            color: "success",
          });

          history.push("/autores");
        } else {
          present({
            message: response.mensaje,
            duration: 3000,
            position: "top",
            color: "danger",
          });
        }
      } catch (error: any) {
        present({
          message: error.message || "Error al iniciar sesión",
          duration: 3000,
          position: "top",
          color: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <IonPage>
      <CustomHeader
        pageName={"Login"}
        showMenuButton={false}
        showLogoutButton={false}
      />
      <IonContent className="ion-padding ">
        <form className="auth-form">
          <form onSubmit={formik.handleSubmit}>
            {/* Campo de usuario */}
            <IonItem className="login-item">
              <IonLabel position="floating">
                <IonIcon icon={personOutline} slot="start" />
                Nombre de usuario
              </IonLabel>
              <IonInput
                name="username"
                type="text"
                value={formik.values.username}
                onIonChange={(e) =>
                  formik.setFieldValue("username", e.detail.value!)
                }
                onBlur={formik.handleBlur}
              />
            </IonItem>
            {formik.touched.username && formik.errors.username && (
              <IonText color="danger" className="error-message">
                <small>{formik.errors.username}</small>
              </IonText>
            )}

            {/* Campo de contraseña */}
            <IonItem className="login-item">
              <IonLabel position="floating">
                <IonIcon icon={lockClosedOutline} slot="start" />
                Contraseña
              </IonLabel>
              <IonInput
                name="password"
                type="password"
                value={formik.values.password}
                onIonChange={(e) =>
                  formik.setFieldValue("password", e.detail.value!)
                }
                onBlur={formik.handleBlur}
              />
            </IonItem>
            {formik.touched.password && formik.errors.password && (
              <IonText color="danger" className="error-message">
                <small>{formik.errors.password}</small>
              </IonText>
            )}

            {/* Botón de submit */}
            <IonButton
              expand="block"
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </IonButton>
          </form>
        </form>

        <IonLoading isOpen={isLoading} message="Iniciando sesión..." />
      </IonContent>
    </IonPage>
  );
}
