/* import '../css/style.css'
const ManufacturerURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json`;
async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const countryFilter = data.Results.filter((Manufacturer) => Manufacturer.Country === 'GERMANY');
    printHTML(countryFilter);
    console.log(data)
    console.log(countryFilter);
  } catch (error) {
  }
};
getData(ManufacturerURL);
 const datatext = document.getElementById('app');
 function printHTML(data) {
  data.forEach(Manufacturer => {  
  const VehicleTypes = Manufacturer.VehicleTypes.map((vehicleType)=>
    vehicleType.Name
  )
    const HTML = `
  <h1>${Manufacturer.Mfr_Name} / ${Manufacturer.Mfr_CommonName}</h1>
  <h2>${VehicleTypes.join(", ")}</h2>
  `
  console.log(VehicleTypes);
    datatext.insertAdjacentHTML("beforeend", HTML);
  });
}
function printHTML(data) {
  data.forEach(Manufacturer => {  
  const VehicleTypes = Model.Model_Name.map((vehicleType)=>
    vehicleType.Model_Name
  )
    const HTML = `
  <h1>${Manufacturer.Model_Name}/</h1>
  `
  console.log(VehicleTypes);
    maketext.insertAdjacentHTML("beforeend", HTML);
  })
};
const MakesURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/bmw?format=json`;
async function carData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const seriesFilter = data.Results.filter((Model) => Model.Model_Name.includes("50i"));
    console.log(data);
    console.log(seriesFilter);    
    printHTML(seriesFilter);

  } catch (error) {
  }
};
carData(MakesURL);
const maketext = document.getElementById('app');
 */
import '../css/style.css'

const manufacturerURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json`;
const appEl = document.getElementById('app');

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data.Results;
  } catch (error) {
    console.error(error);
  }
};

function filterData(results, cb) {
  const filteredData = results.filter(cb)
  return filteredData;
};

function printHTML(data, countryName) {
  appEl.textContent = "";
  const headerHTML = `
  <div class="notification">
  <h2>Manufacturers based in ${countryName}</h2>
  <h2>This search parameter will display companies and/or subsidaries that may contain more than one manufacturer. As a result, not every car maker is available here, but specific manufacturers can be found in the model input.</h2>
  </div>
  `
  appEl.insertAdjacentHTML("beforeend", headerHTML)
  data.forEach((manufacturer) => {  
    let nameTest = manufacturer.Mfr_Name;    
    const vehicleTypes = manufacturer.VehicleTypes.map((vehicleType) => vehicleType.Name);
    if (manufacturer.Mfr_CommonName !== null){
      nameTest = manufacturer.Mfr_CommonName
    }
    nameTest = nameTest.toLowerCase().split(" ").join('%20')
    const HTML = `
    <div class="manufacturer-card" data-manufacturer=${nameTest}>
  <h2>${manufacturer.Mfr_Name || ''} / ${manufacturer.Mfr_CommonName || ''}</h2>
  ${vehicleTypes.length ? `<h3>${vehicleTypes.join(', ')}</h3>` : ""}
  <button class="detailsButton">View Details</button>
  <button class="modelsButton">View Models</button>
    </div>
    `
    appEl.insertAdjacentHTML("beforeend", HTML);   
    
    const makesURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${nameTest}?format=json`;
    console.log(makesURL);
    const detailsURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetManufacturerDetails/${nameTest}?format=json`;
    console.log(detailsURL);
     /* modelsButton.addEventListener("click", () =>{
      appEl.textContent = "";
      const makeHTML = `
       <h2>${makesURL.Make_Name}</h2>
       <h3>${makesURL.Results}</h3>
       `
    appEl.insertAdjacentHTML("beforeend", makeHTML);
    });  */
  })};

  function displayModelsHTML(Results) {
    appEl.textContent = "";
    if (Results && Results.length > 0) {
      Results.forEach((car) => {
        const HTML = `
        <div class="model-cards">
        <h2>${car.Make_Name}</h2>
        <h3>${car.Model_Name}</h3>
        </div>
        `;
        appEl.insertAdjacentHTML("beforeend", HTML);
      });
      }else{
        const errorHTML = `
        <div class="error-card">
        <img src="public/images/checkengine.jpg" id="enginelight" alt="A check engine light.">
        <h2>We've run into an issue...</h2>
        <h3>You have selected a multi-manufacturer company and/or a subsidary name (ex: JAGUAR LAND ROVER NA, LLC). To find the models you are looking for, try the model search input (ex: Jaguar).</h3>
        </div>
        `
        appEl.insertAdjacentHTML("beforeend", errorHTML)
      }
    }

  function displayDetailsHTML(Results) {
    appEl.textContent = "";
    Results.forEach(({Mfr_Name, Mfr_CommonName, Country, City, StateProvince, Address, ContactEmail, PrincipalFirstName, PrincipalPosition}) => {
  const manufacturerHTML = `
  <div class="manu-card">
  <h3>${Mfr_Name || 'Unavailable'}</h3>
  <h4>${Mfr_CommonName || 'Unavailable'}</h4>
  <p>Country: ${Country || 'Unavailable'}</p>
  <p>City: ${City || 'Unavailable'}</p>
  <p>State/Province: ${StateProvince || 'Unavailable'}
  <p>Address: ${Address || 'Unavailable'}</p>
  <p>Contact Email: ${ContactEmail || 'Unavailable'}</p>
  <p>Primary Operator: ${PrincipalFirstName || 'Unavailable'}</p>
  <p>Operator Position: ${PrincipalPosition || 'Unavailable'}</p>
  </div>`
  /* const manufacturerHTML = `
  <div class="manu-card">
  <h3>${car.Mfr_Name}</h3>
  ${car.Mfr_CommonName ? `<h4>${car.Mfr_CommonName}</h4>` : ''}
  <p>Country: ${car.Country}</p>
  <p>City: ${car.City}</p>
  <p>State/Province: ${car.StateProvince}
  <p>Address: ${car.Address}</p>
  </div>` */
  appEl.insertAdjacentHTML('beforeend', manufacturerHTML);
  });
  }


  appEl.addEventListener("click", async(event) => {
    if(event.target.matches(".modelsButton")){
      console.log('clicked', event.target)
      const manufacturer = (event.target.closest("div").dataset.manufacturer)
      const makesURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${manufacturer}?format=json`;
      const response = await fetch(makesURL)
      const data = await response.json();
      console.log(data);
      displayModelsHTML(data.Results);
    }
    if(event.target.matches(".detailsButton")){
      const manufacturer = (event.target.closest("div").dataset.manufacturer)
      const detailsURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetManufacturerDetails/${manufacturer}?format=json`;
      const response = await fetch(detailsURL)
      const data = await response.json();
      console.log(data);
      displayDetailsHTML(data.Results);
    }
  });
  
const countrySort = document.getElementById('countryButton');
const countryInput = document.getElementById('countryPrompt');
const manuText = document.getElementById('manuButton');
const manuInput = document.getElementById('manuPrompt');
countrySort.addEventListener("click",() =>{
  const country = countryInput.value.trim();
  if(!country){
    return false;
  }
  const countryManufacturers = filterData(manufacturers, (manufacturer) => manufacturer.Country === country.toUpperCase());
  printHTML(countryManufacturers, country);
});
const manufacturers = await getData(manufacturerURL);

manuText.addEventListener("click", async () => {
  const manufacturerInput = manuInput.value.trim();
  if(!manufacturerInput) {
    return false;
  }
  const manufacturerSearchURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${manufacturerInput}?format=json`;
  try {
    const response = await fetch(manufacturerSearchURL);
    const data = await response.json();
    if (data.Results) {
      displayModelsHTML(data.Results)
    }else{
      console.log('No models found for this manufacturer.')
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});