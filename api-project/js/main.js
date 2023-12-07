import '../css/style.css'
const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json`;
async function getData(URL){
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data.Results);
    document.querySelector("h1").textContent = data.Mfr;
    
  } catch (error) {
  }
};
getData(URL);