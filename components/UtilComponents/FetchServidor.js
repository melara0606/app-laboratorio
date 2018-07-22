//const URL_BASE = "http://10.0.2.2:80/clinica"; // Android Studio
const URL_BASE = "http://10.0.3.2:80/clinica"; // GetMption
//const URL_BASE = "http://mmfisherst.com/";

// Funciones para el login de los usuarios
let loginUsuarioServidor = (username,password) => {
  return fetch(`${URL_BASE}/movil/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(response => response.json() )
}

// Peticiones para las solicitudes
let getObjectDataSolicitud = () => {
  let { credentials } = global
  credentials = JSON.parse(credentials)

  return fetch(`${ URL_BASE }/movil/solicitudes`, {
    method: 'POST',
    body: JSON.stringify({
      id: credentials.id
    })
  }).then(response => response.json())
}

let getObjectDataSolicitudItem = (id) => {
  return fetch(`${URL_BASE}/movil/solicitudes/items`, {
   method: 'POST',
   body: JSON.stringify({ id })
  })
  .then(response => response.json() )
}

// Peticiones para las solicitudes adomicilio
let getObjectDataSolicitudAdomicilio = () => {
  let { credentials } = global
  credentials = JSON.parse(credentials)

  return fetch(`${ URL_BASE }/movil/solicitud-adomicilio`, {
    method: 'POST',
    body: JSON.stringify({
      id: credentials.id
    })
  }).then(response => response.json())
}

// Peticiones para las solicitudes adomicilio
let getObjectDataSolicitudAdomicilioItem = (id) => {
  return fetch(`${ URL_BASE }/movil/solicitud-adomicilio`, {
    method: 'POST',
    body: JSON.stringify({
      id
    })
  }).then(response => response.json())
}

let convertMoneda = (amount, decimals) => {
  amount += '';
  amount = parseFloat(amount.replace(/[^0-9\.]/g, ''));
  decimals = decimals || 0;
  
  if (isNaN(amount) || amount === 0) 
      return parseFloat(0).toFixed(decimals);
  amount = '' + amount.toFixed(decimals);
 
  var amount_parts = amount.split('.'),
      regexp = /(\d+)(\d{3})/;
 
  while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
 
  return amount_parts.join('.');
}

// Peticiones para las citas
let getObjectDataCitas = () =>{
  let credentials  = JSON.parse(global.credentials)
  return fetch(`${URL_BASE}/movil/citas`, {
    method: 'POST',
    body: JSON.stringify({
      id: credentials.id
    })
  }).then(response => response.json())
    .then(json => json.data )
}

let getObjectCitaItem = (id) => {
  return fetch(`${URL_BASE}/movil/citas/informacion`, {
    method: 'POST',
    body: JSON.stringify({
      id
    })
  }).then(response => response.json())
    .then(json => json.data )
}

let updateCitaStatus = (id) => {
  return fetch(`${URL_BASE}/movil/solicitud-adomicilio/informacion`, {
    method: 'POST',
    body: JSON.stringify({
      id
    })
  }).then(response => response.json())
}

export { 
  convertMoneda,
  updateCitaStatus,
  getObjectCitaItem,
  getObjectDataCitas,
  loginUsuarioServidor,   
  getObjectDataSolicitud, 
  getObjectDataSolicitudItem, 
  getObjectDataSolicitudAdomicilio,
  getObjectDataSolicitudAdomicilioItem
}
