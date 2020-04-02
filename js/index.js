let nombreInput = document.querySelector('#id-nombre');
let clienteTypeInput = document.querySelector('#id-client-type');
let salarioInput = document.querySelector('#id-salario');
let creditoValueInput = document.querySelector('#id-credito-value');
let solicitarButton = document.querySelector('#solicitar-button');
let mensaje = document.querySelector('#mensaje');

async function fetchData(data) {
    const response = await axios.post('https://hanascpspringp2001874258trial.hanatrial.ondemand.com/CreditLimit/limite', data,{
      headers: {
	  'Access-Control-Allow-Origin': '*',
    'Content-Type':'application/json',
    'Accept':'application/json'
	}
});

    return response;
}


solicitarButton.addEventListener("click",()=>{
  let nombre = nombreInput.value;
  let salario = parseInt(salarioInput.value);
  let creditoSolicitado = parseInt(creditoValueInput.value);
  let tipoCliente = clienteTypeInput.options[clienteTypeInput.selectedIndex].text;
  let data = [{"__type__": "Customer",
               "CreditRating": tipoCliente,
               "AvgOrderValue": salario}];
  if(nombre ==""){
    nombreInput.classList.add("is-danger");
  }else{
    nombreInput.classList.remove("is-danger");
  }
  if(creditoSolicitado<=0){
    creditoValueInput.classList.add("is-danger");
  }else{
    creditoValueInput.classList.remove("is-danger");
  }
  if(salario<0){
    salarioInput.classList.add("is-danger");
  }else{
    salarioInput.classList.remove("is-danger");
  }
  if(tipoCliente=="--"){
    clienteTypeInput.classList.add("is-danger");
  }
  if(tipoCliente !== "--" && creditoSolicitado>0 && salario>=0 && nombre !==""){
    fetchData(JSON.stringify(data)).then(data =>{
      let limite = data.data[0]["Limit"];
      if(limite>=creditoSolicitado){
        mensaje.innerHTML = `<div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-primary">
                <p class="title">Aprobado</p>
                <p class="subtitle">Sr@ ${nombre}. Su Credito por $${creditoSolicitado}  fue aprobado</p>
              </article>
            </div>`
            solicitarButton.classList.add('is-hidden');
      }else{
        mensaje.innerHTML = `<div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-danger">
                <p class="title">Rechazado</p>
                <p class="subtitle">Sr@ ${nombre}. Su limite de credito es $${limite} </p>
              </article>
            </div>`
            solicitarButton.classList.add('is-hidden');
      }
  })
}else{
   mensaje.innerHTML = `<p class="help is-danger">****** Valide los Campos Ingresados *******</p>`;
}
})
