// Limpiamos la colección por si ya existía
db.articulos.drop(); // [cite: 19]

// Insertamos los documentos
db.articulos.insertOne({ // [cite: 20]
    codigo: "A123",      // [cite: 21]
    precio: 29.99,       // [cite: 23]
    cantidad: 100,       // [cite: 25]
    descripcion: "Mouse",// [cite: 27]
    rubro: "Electrónica" // [cite: 29]
});

db.articulos.insertOne({ // [cite: 41]
    codigo: "B456",      // [cite: 42]
    precio: 45.75,       // [cite: 43]
    cantidad: 50,        // [cite: 40]
    descripcion: "Auriculares inalámbricos", // [cite: 44, 45]
    rubro: "Electrónica" // [cite: 46]
});

db.articulos.insertOne({ // [cite: 48]
    codigo: "C789",      // [cite: 49]
    precio: 120.00,      // [cite: 50]
    cantidad: 30,        // [cite: 51]
    descripcion: "Smartwatch", // [cite: 52]
    rubro: "Tecnología"  // [cite: 53]
});

db.articulos.insertOne({ // [cite: 148]
    codigo: "D012",      // [cite: 150]
    precio: 75.50,       // [cite: 154]
    cantidad: 20,        // [cite: 158]
    descripcion: "Teclado", 
    rubro: "Electrónica" 
});







