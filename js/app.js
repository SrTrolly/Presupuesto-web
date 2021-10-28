const ingresos=[
    new Ingreso("Sueldo",2000.00),
    new Ingreso("Venta pc ",3500)
];

const egresos=[
    new Egreso("Arriendo departamento",900),
    new Egreso("ropa",400),
    new Egreso("Switch",300)
];

let cargarApp=()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}
let totalIngresos=()=>{
    let totalIngresos=0;
    for(let ingreso of ingresos){
        totalIngresos+=ingreso.valor;
    }
    return totalIngresos;
}

let totalEgresos=()=>{
    let totalEgresos=0;
    for(let egreso of egresos){
        totalEgresos+=egreso.valor;
    }
    return totalEgresos;
}
let cargarCabecero =()=>{
    let presupuesto=totalIngresos()-totalEgresos();
    let porcentajeEgreso=totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML=formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML=formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML=formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML=formatoMoneda(totalEgresos());
}

const formatoMoneda=(valor)=>{
    return valor.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2});
}

const formatoPorcentaje=(valor)=>{
    return valor.toLocaleString("en-US",{style:"percent",minimumFractionDigits:2});
}

const cargarIngresos=()=>{
    let ingresosHTML="";
    for(let ingreso of ingresos){
        ingresosHTML+= crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML=ingresosHTML;
   
}

const crearIngresoHTML=(ingreso)=>{
    let ingresoHTML=`
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                 onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso=(id)=>{
    let indiceEliminar=ingresos.findIndex(ingreso=> ingreso.id===id);
    ingresos.splice(indiceEliminar,1);//este segundo parametro es la indicacion de numeros de elementos a eliminar
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos=()=>{
    let egresosHTML="";
    for(let egreso of egresos){
        egresosHTML+=crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML=egresosHTML;
}

const crearEgresoHTML=(egreso)=>{
    let egresoHTML=`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

let eliminarEgreso=(id)=>{
    let indiceEliminar=egresos.findIndex(egreso=>egreso.id==id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato=()=>{
    let forma=document.forms["forma"];
    let tipo=forma["tipo"];
    let descripcion=forma["descripcion"];
    let valor=forma["valor"];
    if(descripcion.value!=="" && valor.value!==""){
        if(tipo.value=== "ingreso"){
            ingresos.push(new Ingreso(descripcion.value,+valor.value));
            cargarCabecero();
            cargarIngresos();
        } else if(tipo.value==="egreso"){
            egresos.push(new Egreso(descripcion.value,+valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}

