// Estructura de datos para almacenar presupuesto
const presupuesto = {
    ingresos: [],
    gastos: [],
    categorias: ['Comida', 'Transporte', 'Entretenimiento', 'Servicios', 'Otros']
};

// Estructura de datos para metas de ahorro
const misAhorros = {
    metas: [],
    ingresos: [],
    gastos: [],
    categoriasMetas: ['🏠 Vivienda', '🚗 Vehículo', '✈️ Viajes', '📚 Estudios', '🎁 Regalos'],
    categoriasGastos: ['🍽️ Alimentación', '🚌 Transporte', '🏠 Vivienda', '📱 Servicios', '🎮 Entretenimiento']
};

// Mensajes motivacionales y del sistema
const MENSAJES = {
    bienvenida: 
        "=== ¡Bienvenido a Tu Asistente de Ahorro! ===\n" +
        "💰 ¡Juntos alcanzaremos tus metas financieras! 💰\n",
    
    menuPrincipal:
        "=== ¿Qué te gustaría hacer hoy? ===\n" +
        "1. 🎯 Establecer nueva meta de ahorro\n" +
        "2. 💰 Registrar ingreso\n" +
        "3. 📝 Registrar gasto\n" +
        "4. 📊 Ver progreso de ahorro\n" +
        "5. ❌ Salir\n",
    
    nuevaMeta: "🎯 ¿Cuánto quieres ahorrar para tu meta?",
    descripcionMeta: "📝 Describe tu meta de ahorro:",
    seleccionCategoria: "🔍 Elige una categoría para tu meta:",
    
    ingresoMonto: "💰 ¿Cuánto dinero recibiste?",
    ingresoDescripcion: "📝 Describe el origen de este ingreso:",
    
    gastoMonto: "📤 ¿Cuánto gastaste?",
    gastoDescripcion: "📝 Describe en qué lo gastaste:",
    
    exito: "✅ ¡Operación realizada con éxito!",
    error: "❌ ¡Ups! Algo salió mal. Intenta de nuevo.",
    
    despedida: "👋 ¡Gracias por usar tu asistente de ahorro!\n" +
               "¡Recuerda: Cada peso ahorrado es un paso más hacia tu meta! 🌟"
};

// Función para establecer nueva meta de ahorro
function establecerMeta() {
    const monto = parseFloat(prompt(MENSAJES.nuevaMeta));
    if (isNaN(monto)) {
        alert(MENSAJES.error);
        return;
    }

    let mensajeCategoria = "🎯 Elige el tipo de meta:\n";
    misAhorros.categoriasMetas.forEach((cat, index) => {
        mensajeCategoria += `${index + 1}. ${cat}\n`;
    });

    const categoriaIndex = parseInt(prompt(mensajeCategoria)) - 1;
    const descripcion = prompt(MENSAJES.descripcionMeta);

    misAhorros.metas.push({
        monto,
        categoria: misAhorros.categoriasMetas[categoriaIndex],
        descripcion,
        ahorrado: 0,
        fecha: new Date()
    });

    alert("🎉 ¡Nueva meta establecida! ¡Tú puedes lograrlo!");
}

// Función para agregar ingreso
function agregarIngreso() {
    const monto = parseFloat(prompt(MENSAJES.ingresoMonto));
    if (isNaN(monto)) {
        alert(MENSAJES.errorNumero);
        return;
    }
    const descripcion = prompt(MENSAJES.ingresoDescripcion);
    presupuesto.ingresos.push({ monto, descripcion, fecha: new Date() });
    alert(MENSAJES.ingresoExito);
}

// Función para registrar ingreso
function registrarIngreso() {
    const monto = parseFloat(prompt(MENSAJES.ingresoMonto));
    if (isNaN(monto)) {
        alert(MENSAJES.error);
        return;
    }
    const descripcion = prompt(MENSAJES.ingresoDescripcion);
    misAhorros.ingresos.push({ monto, descripcion, fecha: new Date() });
    alert("💰 ¡Ingreso registrado! ¡Buen trabajo!");
}

// Función para agregar gasto
function agregarGasto() {
    const monto = parseFloat(prompt(MENSAJES.gastoMonto));
    if (isNaN(monto)) {
        alert(MENSAJES.errorNumero);
        return;
    }

    let mensajeCategoria = "📋 Categorías disponibles:\n";
    presupuesto.categorias.forEach((cat, index) => {
        mensajeCategoria += `${index + 1}. ${cat}\n`;
    });

    const categoriaIndex = parseInt(prompt(mensajeCategoria)) - 1;
    if (categoriaIndex < 0 || categoriaIndex >= presupuesto.categorias.length) {
        alert(MENSAJES.errorCategoria);
        return;
    }

    const descripcion = prompt(MENSAJES.gastoDescripcion);
    presupuesto.gastos.push({
        monto,
        categoria: presupuesto.categorias[categoriaIndex],
        descripcion,
        fecha: new Date()
    });
    alert(MENSAJES.gastoExito);
}

// Función para registrar gasto
function registrarGasto() {
    const monto = parseFloat(prompt(MENSAJES.gastoMonto));
    if (isNaN(monto)) {
        alert(MENSAJES.error);
        return;
    }

    let mensajeCategoria = "📝 Tipo de gasto:\n";
    misAhorros.categoriasGastos.forEach((cat, index) => {
        mensajeCategoria += `${index + 1}. ${cat}\n`;
    });

    const categoriaIndex = parseInt(prompt(mensajeCategoria)) - 1;
    const descripcion = prompt(MENSAJES.gastoDescripcion);
    
    misAhorros.gastos.push({
        monto,
        categoria: misAhorros.categoriasGastos[categoriaIndex],
        descripcion,
        fecha: new Date()
    });

    alert("📝 Gasto registrado. ¡Recuerda mantener el control de tus gastos!");
}

// Función para mostrar balance
function mostrarBalance() {
    const totalIngresos = presupuesto.ingresos.reduce((sum, ing) => sum + ing.monto, 0);
    const totalGastos = presupuesto.gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
    const balance = totalIngresos - totalGastos;

    let mensaje = "📊 === RESUMEN FINANCIERO ===\n\n";
    mensaje += `💰 Total Ingresos: $${totalIngresos.toFixed(2)}\n`;
    mensaje += `📝 Total Gastos: $${totalGastos.toFixed(2)}\n`;
    mensaje += `\n💵 Balance actual: $${balance.toFixed(2)}\n`;
    
    console.log(mensaje);
    alert(mensaje);
}

// Función para mostrar progreso
function mostrarProgreso() {
    const totalIngresos = misAhorros.ingresos.reduce((sum, ing) => sum + ing.monto, 0);
    const totalGastos = misAhorros.gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
    const ahorroActual = totalIngresos - totalGastos;

    let mensaje = "=== 📊 Tu Progreso de Ahorro ===\n\n";
    mensaje += `💰 Total Ingresos: $${totalIngresos.toFixed(2)}\n`;
    mensaje += `📝 Total Gastos: $${totalGastos.toFixed(2)}\n`;
    mensaje += `🎯 Ahorro Actual: $${ahorroActual.toFixed(2)}\n\n`;
    
    if (misAhorros.metas.length > 0) {
        mensaje += "🎯 Progreso de tus metas:\n";
        misAhorros.metas.forEach(meta => {
            const progreso = (ahorroActual / meta.monto * 100).toFixed(1);
            mensaje += `${meta.categoria}: ${progreso}% de $${meta.monto}\n`;
        });
    }

    alert(mensaje);
}

// Función principal
function iniciarPrograma() {
    alert(MENSAJES.bienvenida);
    
    while (true) {
        const opcion = prompt(MENSAJES.menuPrincipal);

        switch (opcion) {
            case '1':
                establecerMeta();
                break;
            case '2':
                agregarIngreso();
                break;
            case '3':
                agregarGasto();
                break;
            case '4':
                mostrarBalance();
                break;
            case '5':
                mostrarProgreso();
                break;
            case '6':
                alert(MENSAJES.despedida);
                return;
            default:
                alert(MENSAJES.opcionInvalida);
        }
    }
}

// Iniciar el programa
iniciarPrograma();