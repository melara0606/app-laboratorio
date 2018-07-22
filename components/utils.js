//const URL_BASE = "http://10.0.2.2:80/clinica"; // Android Studio
//const URL_BASE = "http://10.0.3.2:80/clinica"; // GetMption
const URL_BASE = "http://mmfisherst.com/";

/* Function para el login del usuario */
let postLogin = (username, password) => {
 return fetch(`${URL_BASE}/movil/login`, {
  method: 'POST',
  body: JSON.stringify({
   username,
   password
  })
 })
 .then(response => response.json() )
}

let itemSolicitud = (id) => {
 return fetch(`${URL_BASE}/movil/solicitudes/items`, {
  method: 'POST',
  body: JSON.stringify({
   id,
  })
 })
 .then(response => response.json() )
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

export { URL_BASE, postLogin, itemSolicitud, convertMoneda }