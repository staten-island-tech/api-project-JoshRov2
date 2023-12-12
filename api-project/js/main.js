import '../css/style.css'
const ManufacturerURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json`;
async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const countryFilter = data.Results.filter((Manufacturer) => Manufacturer.Country === 'UNITED KINGDOM (UK)');
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
const MakesURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/bmw?format=json`;
async function carData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const seriesFilter = data.Results.filter((Manufacturer) => Manufacturer.Model_Name.includes("50i"));
    console.log(data);
    console.log(seriesFilter);
  } catch (error) {
  }
};
carData(MakesURL);
const maketext = document.getElementById('app');
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
    cartext.insertAdjacentHTML("beforeend", HTML);
  });
}