import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect } from "react";
import { NewPostComponent } from "../../components/NewPostComponent/NewPostComponent";
import { PostComponent } from "../../components/PostComponent/PostComponent";

export default function Post() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const post = [
    {
      title: "Un día complicado",
      entry:
        "Hoy fue un día largo. Me sentí abrumado con tanto trabajo, pero al final logré terminar todo lo que tenía pendiente. Estoy agotado, pero aliviado de haberlo hecho.",
    },
    {
      title: "Reflexión del día",
      entry:
        "Hoy estuve pensando mucho sobre el futuro y cómo quiero que se desarrollen las cosas. Me siento motivado a seguir persiguiendo mis sueños, aunque a veces la incertidumbre me paraliza.",
    },
    {
      title: "Un día tranquilo",
      entry:
        "Hoy fue uno de esos días tranquilos, en los que todo parece ir en su lugar. Me tomé un tiempo para mí, fui al parque a caminar y me sentí en paz. Necesitaba esto.",
    },
    {
      title: "Día lleno de emociones",
      entry:
        "Hoy fue un día lleno de emociones intensas. Tuve una conversación difícil con un amigo, pero al final nos entendimos. Me siento aliviado, pero con la cabeza llena de pensamientos.",
    },
    {
      title: "Lecciones aprendidas",
      entry:
        "Hoy aprendí algo importante: no siempre se puede controlar todo. A veces, lo mejor es aceptar las cosas como vienen y aprender de ellas. A veces el mayor crecimiento viene de los momentos difíciles.",
    },
    {
      title: "Un buen comienzo",
      entry:
        "Hoy comencé el día con una gran sonrisa. Hice algo que llevaba tiempo queriendo hacer, y me sentí increíblemente bien. Estoy decidido a mantener esta energía positiva.",
    },
    {
      title: "Desafíos del día",
      entry:
        "Hoy enfrenté algunos desafíos, pero me mantuve firme. Hubo momentos en los que quise rendirme, pero decidí seguir adelante. Esos pequeños pasos hacia adelante realmente cuentan.",
    },
    {
      title: "Momentos felices",
      entry:
        "Hoy tuve uno de esos días en los que todo parece salir bien. Me reuní con viejos amigos, reímos mucho y me sentí afortunado de tenerlos en mi vida. Esos momentos de felicidad son los que realmente importan.",
    },
    {
      title: "Día de descanso",
      entry:
        "Hoy me tomé el día libre para descansar. Pasé el día leyendo y viendo una serie que me gusta. A veces, el descanso es todo lo que necesitamos para recargar energías.",
    },
    {
      title: "Crecimiento personal",
      entry:
        "Hoy reflexioné sobre mi crecimiento personal. He logrado mucho, pero sé que aún tengo mucho que aprender. Estoy emocionado por el camino que tengo por delante y las oportunidades que se presentan.",
    },
  ];

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <NewPostComponent />
      {Array.isArray(post) &&
        post.map(
          (p, index) => {
            return <PostComponent key={index} title={p.title} entry={p.entry} />;
          },
          [post]
        )}
    </div>
  );
}
