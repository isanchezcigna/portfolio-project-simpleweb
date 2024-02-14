let dataCart = [];
let dataUser = [
    { id: 1, name: 'Agustin Sanchez', mail: 'agu.sanchez@duocuc.cl', pass: '1234', rol: 1, status: 1},
    { id: 2, name: 'Ignacio Sanchez', mail: 'ign.sanchez@duocuc.cl', pass: '1234', rol: 1, status: 1},
    { id: 3, name: 'Kevin Trujillo', mail: 'kevi.trujillo@duocuc.cl', pass: '1234', rol: 1, status: 1}
];

let dataInfo = [
    { id: 1, name: 'Taza Adopta', price: 9990, size: 'XL', category: 'Perros', score: 5, img_path: 'img/producto-1.png' },
    { id: 2, name: 'Polera Adopta', price: 3990, size: 'XL', category: 'Gatos', score: 5, img_path: 'img/producto-1.png' },
    { id: 3, name: 'Zapatilla Adopta', price: 4490, size: 'XL', category: 'Perros', score: 5, img_path: 'img/producto-1.png' },
    { id: 4, name: 'Camisa Adopta', price: 18990, size: 'XL', category: 'Perros', score: 5, img_path: 'img/producto-1.png' },
    { id: 5, name: 'Gorra Adopta', price: 29990, size: 'XL', category: 'Gatos', score: 5, img_path: 'img/producto-1.png' },
    { id: 6, name: 'Calzoncillos Adopta', price: 49990, size: 'XL', category: 'Perros', score: 5, img_path: 'img/producto-1.png' }
];

let dataCoupon = [
    { id: 1, name: 'DUOCUC', code: 'DUOCUC', discount: 20, status: 1}
]

let dataShip = [
    { id: 1, name: 'Envío estandard', hours: 72, price: 4990, status: 1},
    { id: 2, name: 'Envío express', hours: 24, price: 9990, status: 1},
    
]

let dataCouponApplied = []

let dataComunas = [
    "Alhué",
    "Buin",
    "Calera de Tango",
    "Cerrillos",
    "Cerro Navia",
    "Colina",
    "Conchalí",
    "Curacaví",
    "El Bosque",
    "El Monte",
    "Estación Central",
    "Huechuraba",
    "Independencia",
    "Isla de Maipo",
    "La Cisterna",
    "La Florida",
    "La Granja",
    "La Pintana",
    "La Reina",
    "Lampa",
    "Las Condes",
    "Lo Barnechea",
    "Lo Espejo",
    "Lo Prado",
    "Macul",
    "Maipú",
    "María Pinto",
    "Melipilla",
    "Ñuñoa",
    "Padre Hurtado",
    "Paine",
    "Pedro Aguirre Cerda",
    "Peñaflor",
    "Peñalolén",
    "Pirque",
    "Providencia",
    "Pudahuel",
    "Puente Alto",
    "Quilicura",
    "Quinta Normal",
    "Recoleta",
    "Renca",
    "San Bernardo",
    "San Joaquín",
    "San José de Maipo",
    "San Miguel",
    "San Pedro",
    "San Ramón",
    "Santiago",
    "Talagante",
    "Tiltil",
    "Vitacura"]