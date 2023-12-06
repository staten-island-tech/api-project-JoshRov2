import '../css/style.css'
const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/Manufacturer Type`;
async function getData(URL){
  try {
    const response = await fetch(URL);
   /*  if(response.status != 200){
      throw new Error(response.statusText);
    }
    console.log(response);   */  
    const data = await response.json();
    console.log(data)
    document.querySelector("h1").textContent = data.textContent;
  } catch (error) {
    // document.querySelector("h1").textContent = error;
  }
};
getData(URL);