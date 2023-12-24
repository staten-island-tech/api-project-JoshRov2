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
// import '../css/style.css'

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

function printHTML(data) {
  appEl.textContent = "";
  data.forEach((manufacturer) => {  
    let nameTest = manufacturer.Mfr_Name;
    if (manufacturer.Mfr_CommonName !== null){
      nameTest = manufacturer.Mfr_CommonName
    }
    nameTest = nameTest.toLowerCase().split(" ").join('%20')
    const vehicleTypes = manufacturer.VehicleTypes.map((vehicleType) => vehicleType.Name);
    const HTML = `
    <div data-manufacturer=${nameTest}>
  <h2>${manufacturer.Mfr_Name} / ${manufacturer.Mfr_CommonName}</h2>
  <h3>${vehicleTypes.join(', ')}</h3>
  <button class="detailsButton">View Details</button>
  <button class="modelsButton">View Models</button>
    </div>
    `
    appEl.insertAdjacentHTML("beforeend", HTML);   
    
    const makesURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${nameTest}?format=json`;
    console.log(makesURL);
     /* modelsButton.addEventListener("click", () =>{
      appEl.textContent = "";
      const makeHTML = `
       <h2>${makesURL.Make_Name}</h2>
       <h3>${makesURL.Results}</h3>
       `
    appEl.insertAdjacentHTML("beforeend", makeHTML);
    });  */
  })};
  appEl.addEventListener("click", async(event) => {
    if(event.target.matches(".modelsButton")){
      console.log('clicked', event.target)
      const manufacturer = (event.target.closest("div").dataset.manufacturer)
      const makesURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${manufacturer}?format=json`;
      const response = await fetch(makesURL)
      const data = await response.json();
      console.log(data)
    }
  })
const countrySort = document.getElementById('countryButton');
const countryInput = document.getElementById('countryPrompt');
countrySort.addEventListener("click",() =>{
  const country = countryInput.value.trim();
  if(!country){
    return false;
  }
  const countryManufacturers = filterData(manufacturers, (manufacturer) => manufacturer.Country === country.toUpperCase());
  printHTML(countryManufacturers);
})
const manufacturers = await getData(manufacturerURL);
