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

const manufacturerURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json`;
const appEl = document.getElementById('app');

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
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
    const vehicleTypes = manufacturer.VehicleTypes.map((vehicleType) => vehicleType.Name);
    const HTML = `
  <h1>${manufacturer.Mfr_Name} / ${manufacturer.Mfr_CommonName}</h1>
  <h2>${vehicleTypes.join(', ')}</h2>
    `
    const makesURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${manufacturer.Mfr_CommonName.toLowerCase()}?format=json`;
    appEl.insertAdjacentHTML("beforeend", HTML);
    console.log(makesURL);
  });
};
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
const carModels = await getData(makesURL);
const modelSeries = filterData(carModels, (model) => model.Model_Name.includes('50i'));
