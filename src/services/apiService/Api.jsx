export const getTokenFromApi = () => {
  console.log("entra en API");

  fetch("https://retoolapi.dev/GpZj85/data/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data["Column 1"]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
