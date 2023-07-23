// Función para dividir el texto en fragmentos más cortos
function splitTextIntoChunks(text, chunkSize) {
    const chunks = [];
    let i = 0;
    while (i < text.length) {
      chunks.push(text.slice(i, i + chunkSize));
      i += chunkSize;
    }
    return chunks;
  }
  
  // Función para generar la respuesta utilizando la API de GPT-4
  async function generateResponse() {
    // Obtiene la consulta del usuario
    const userInput = document.getElementById("input-text").value;
  
    // Realiza la solicitud a la API de GPT-4 y obtiene la respuesta
    const response = await makeApiRequest(userInput);
  
    // Dividir la respuesta en fragmentos más cortos (por ejemplo, de 500 caracteres cada uno)
    const responseChunks = splitTextIntoChunks(response, 500);
  
    // Mostrar los fragmentos en el área de salida
    const outputElement = document.getElementById("output");
    outputElement.innerHTML = ""; // Limpiar el contenido previo
  
    responseChunks.forEach((chunk) => {
      const chunkElement = document.createElement("div");
      chunkElement.textContent = chunk;
      outputElement.appendChild(chunkElement);
    });
  }
  
  // Función para realizar la solicitud a la API de GPT-4
  async function makeApiRequest(query) {
    const apiUrl = "https://api.example.com/gpt-4"; // Reemplaza con la URL de la API de GPT-4
    const apiKey = "TU_CLAVE_DE_API_AQUI"; // Reemplaza con tu clave de API de GPT-4
    const requestBody = {
      query: query,
      apiKey: apiKey
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error("Error en la solicitud a la API");
      }
  
      const data = await response.json();
      return data.generated_response;
    } catch (error) {
      console.error("Error en la solicitud a la API:", error);
      return "Error en la solicitud a la API";
    }
  }
  
  // Event Listener para el botón "Generar Respuesta"
  const generateButton = document.getElementById("generate-button");
  generateButton.addEventListener("click", generateResponse);
  