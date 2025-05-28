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
  IonIcon,
  IonToggle,
} from "@ionic/react";
import "./Login.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { personOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from "ionicons/icons";
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
  const [showPassword, setShowPassword] = useState(false);

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
          localStorage.setItem("authToken", "dummy-token");
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

          history.push("/inicio");
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
      <IonContent className="ion-padding">
        <form className="usuario-form" onSubmit={formik.handleSubmit}>
          <h2 style={{ color: "var(--ion-color-primary)", textAlign: "center" }}>
            Iniciar Sesión
          </h2>

          {/* Usuario */}
          <IonItem className="form-field-group">
            <IonIcon icon={personOutline} slot="start" className="input-icon" />
            <IonLabel position="stacked">Nombre de usuario*</IonLabel>
            <IonInput
              className="custom-input"
              name="username"
              value={formik.values.username}
              onIonChange={(e) =>
                formik.setFieldValue("username", e.detail.value!)
              }
              onBlur={formik.handleBlur}
              placeholder="Ingrese su nombre de usuario"
            />
          </IonItem>
          {formik.touched.username && formik.errors.username && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.username}</small>
            </IonText>
          )}

          {/* Contraseña */}
          <IonItem className="form-field-group">
            <IonIcon icon={lockClosedOutline} slot="start" className="input-icon" />
            <IonLabel position="stacked">Contraseña*</IonLabel>
            <IonInput
              className="custom-input"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onIonChange={(e) =>
                formik.setFieldValue("password", e.detail.value!)
              }
              onBlur={formik.handleBlur}
              placeholder="Ingrese su contraseña"
            />
            <IonIcon
              icon={showPassword ? eyeOffOutline : eyeOutline}
              slot="end"
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </IonItem>
          {formik.touched.password && formik.errors.password && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.password}</small>
            </IonText>
          )}

          {/* Botón de inicio */}
          <IonButton
            expand="block"
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </IonButton>
        </form>

        <IonLoading isOpen={isLoading} message="Iniciando sesión..." />
      </IonContent>
    </IonPage>
  );
}
