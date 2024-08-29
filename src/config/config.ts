export const BaseUrl = getApiUrl();

function getApiUrl() {
  let apiURL;

  switch (import.meta.env.VITE_END) {
    case "prod":
      apiURL = import.meta.env.VITE_API_PROD;
      break;

    case "dev local":
      apiURL = import.meta.env.VITE_API_LOCAL;
      break;
  }

  return apiURL;
}
