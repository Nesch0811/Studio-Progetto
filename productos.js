document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        productsGrid: document.getElementById('products-grid'),
        noResults: document.getElementById('no-results'),
        searchInput: document.getElementById('search'),
        filterCheckboxes: document.querySelectorAll('.filter-checkbox'),
        toggleCartButton: document.getElementById('toggle-cart'),
        cartSidebar: document.getElementById('cart-sidebar'),
        closeCartButton: document.getElementById('close-cart'),
        cartItemsContainer: document.getElementById('cart-items'),
        cartTotal: document.getElementById('cart-total'),
        cartCount: document.getElementById('cart-count'),
        checkoutButton: document.getElementById('checkout'),
        productModal: document.getElementById('product-modal'),
        closeModalButton: document.getElementById('close-modal'),
        modalContent: document.getElementById('modal-content'),
        darkModeToggle: document.querySelector('.dark-mode-toggle'),
    darkModeIcon: document.querySelector('.dark-mode-toggle i')
    };
    console.log('DOM loaded, elements:', elements);

    const products = [
        { name: "Árbol amarillo 6 cm", price: 2.50, category: "Varios", img: "ImgProductos/AA ARBOL AMARILLO 6CM.webp" },
        { name: "Árbol blanco 6 cm", price: 2.50, category: "Varios", img: "ImgProductos/AA ARBOL BLANCO 6CM.webp" },
        { name: "Árbol fucsia 6 cm", price: 2.50, category: "Varios", img: "ImgProductos/AA ARBOL FUCSIA 6CM.webp" },
        { name: "Árbol morado 6 cm", price: 2.50, category: "Varios", img: "ImgProductos/AA ARBOL MORADO 6CM MR106.webp" },
        { name: "Árbol rojo 6 cm", price: 2.50, category: "Varios", img: "ImgProductos/AA ARBOL ROJO 6CM MR101.webp" },
        { name: "Árbol rosado 6 cm", price: 2.50, category: "Varios", img: "ImgProductos/AA ARBOL ROSADO 6CM MR104.webp" },
        { name: "Árbol verde 6 cm", price: 2.50, category: "Varios", img: "ImgProductos/AA ARBOL VERDE 6CM MR109.webp" },
        { name: "Árbol pino 3 cm", price: 1.50, category: "Varios", img: "ImgProductos/AA ARBOL PINO 3CM MR111-3812.webp" },
        { name: "Árbol pino 5 cm", price: 2.00, category: "Varios", img: "ImgProductos/AA ARBOL PINO 5CM MR111-5818.webp" },
        { name: "Escala blanca 1:20", price: 3.20, category: "Útiles Universitarios", img: "ImgProductos/escala BLANCA 120.webp" },
        { name: "Escala blanca 1:100", price: 0.50, category: "Útiles Universitarios", img: "ImgProductos/escala BLANCA MR891 1100.webp" },
        { name: "Escala blanca 1:200", price: 0.30, category: "Útiles Universitarios", img: "ImgProductos/escala BLANCA MR891 1200.webp" },
        { name: "Escala blanca 1:25 sentado y parado", price: 2.00, category: "Útiles Universitarios", img: "ImgProductos/escala BLANCA MR891 125 SENTADO Y PARADO.webp" },
        { name: "Escala blanca 1:50", price: 0.70, category: "Útiles Universitarios", img: "ImgProductos/escala BLANCA MR891 150.webp" },
        { name: "Escala blanca 1:75", price: 0.40, category: "Útiles Universitarios", img: "ImgProductos/escala BLANCA MR891 175.webp" },
        { name: "Escala negra 1:25", price: 2.80, category: "Útiles Universitarios", img: "ImgProductos/escala Negro 125.webp" },
        { name: "Escala negra 1:50", price: 1.20, category: "Útiles Universitarios", img: "ImgProductos/escala Negro 150.webp" },
        { name: "Block Watercolor A3 190 g", price: 24.00, category: "Arte y Manualidades", img: "ImgProductos/BLOCK WATERCOLOR VL-5502-A3 190GR.webp" },
        { name: "Block Canson C à Grain A3 180 g", price: 24.00, category: "Arte y Manualidades", img: "ImgProductos/BLOCK CANSON CAGRAIN 20H A3 180GSM.webp" },
        { name: "Escobilla inglesa chica", price: 6.00, category: "Varios", img: "ImgProductos/ESCOBILLA ING CHICO VALU.webp" },
        { name: "Foam blanco americano 5 mm 70×100", price: 20.00, category: "Arte y Manualidades", img: "ImgProductos/FOAM 5MM BLANCO AMERICANO 70x100.webp" },
        { name: "Foam negro 5 mm", price: 30.00, category: "Arte y Manualidades", img: "ImgProductos/Foam Negro 5MM.webp" },
        { name: "Papel mantequilla blanco 70×100 50 g/m²", price: 1.50, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/PAPEL MANTEQUILLA 70X100 50-GSM BLANCO(x 250).webp" },
        { name: "Papel vegetal A1 112 g/m²", price: 2.00, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/PAPEL VEGETAL A1 112GSM.webp" },
        { name: "Papel vegetal A2 112 g/m²", price: 1.50, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/PAPEL VEGETAL A2 112GSM.webp" },
        { name: "Papel vegetal A3 112 g/m²", price: 1.00, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/PAPEL VEGETAL A3 112GSM.webp" },
        { name: "Regla metálica 20 cm", price: 2.00, category: "Reglas y Escuadras", img: "ImgProductos/REGLA METAL 20 CM.webp" },
        { name: "Regla metálica 30 cm", price: 3.00, category: "Reglas y Escuadras", img: "ImgProductos/Regla Metal 30CM.webp" },
        { name: "Regla metálica 50 cm", price: 4.50, category: "Reglas y Escuadras", img: "ImgProductos/REGLA METAL 50 CM.webp" },
        { name: "Regla metálica 60 cm", price: 6.00, category: "Reglas y Escuadras", img: "ImgProductos/REGLA METAL 60 CM.webp" },
        { name: "Compás con alargadera articulada", price: 30.00, category: "Regla T, compás, transportador", img: "ImgProductos/COMPAS VL CALARGADERA ARTICULADA Y6204A.webp" },
        { name: "Cúter grueso con repuesto", price: 6.00, category: "Cutter y base de corte", img: "ImgProductos/CUTTER GRUESO CREPUESTO VL-BSL-023.webp" },
        { name: "UHU 35 ml", price: 7.20, category: "Pegamentos y Adhesivos", img: "ImgProductos/UHU35ML.webp" },
        { name: "UHU 60 ml", price: 9.90, category: "Pegamentos y Adhesivos", img: "ImgProductos/UHU 60ML.webp" },
        { name: "UHU 125 ml", price: 16.00, category: "Pegamentos y Adhesivos", img: "ImgProductos/UHU125ML.webp" },
        { name: "Plantilla borrador", price: 2.00, category: "Varios", img: "ImgProductos/PLANTILLA BORRADOR BD23VL80VL-CTP.webp" },
        { name: "Cartón maqueta blanco 1 mm", price: 8.00, category: "Arte y Manualidades", img: "ImgProductos/Carton Maqueta Blanco 1 MM.webp" },
        { name: "Cartón maqueta blanco 1.5 mm", price: 12.00, category: "Arte y Manualidades", img: "ImgProductos/Carton Maqueta Blanco 1.5 MM.webp" },
        { name: "Cartón maqueta blanco 2 mm", price: 14.80, category: "Arte y Manualidades", img: "ImgProductos/Carton Maqueta Blanco 2 MM.webp" },
        { name: "Cartón maqueta blanco 3 mm", price: 22.30, category: "Arte y Manualidades", img: "ImgProductos/Carton Maqueta Blanco 3 MM.webp" },
        { name: "Cartón maqueta liner 1 mm", price: 10.50, category: "Arte y Manualidades", img: "ImgProductos/Carton Maqueta Liner 1MM.webp" },
        { name: "Cartón maqueta liner 1.5 mm", price: 15.00, category: "Arte y Manualidades", img: "ImgProductos/Carton Maqueta Liner 1.5MM.webp" },
        { name: "Cartón maqueta liner 2 mm", price: 19.00, category: "Arte y Manualidades", img: "ImgProductos/Carton Maqueta Liner 2MM.webp" },
        { name: "Cartón maqueta liner 3 mm", price: 28.00, category: "Arte y Manualidades", img: "ImgProductos/Carton Maqueta Liner 3MM.webp" },
        { name: "Cartón microcorrugado importado 70×100", price: 6.60, category: "Arte y Manualidades", img: "ImgProductos/Carton Microcorrugado Importado 70x100.webp" },
        { name: "Cartón doble corrugado importado 70×100", price: 10.40, category: "Arte y Manualidades", img: "ImgProductos/Carton Doble Corrugado Importado 70x 100.webp" },
        { name: "Cartón corrugado importado 80×170", price: 11.70, category: "Arte y Manualidades", img: "ImgProductos/Carton Corrugado Importado 80x170.webp" },
        { name: "Carton microcorrugado importado 80x170", price: 10.00, category: "Arte y Manualidades", img: "ImgProductos/Carton Microcorrugado Importado 80x170.webp" },
        { name: "Carton doble corrugado importado 80x170", price: 15.30, category: "Arte y Manualidades", img: "ImgProductos/Carton Doble Corrugado Importado 80x170.webp" },
        { name: "Base de corte A4 verde", price: 14.00, category: "Cutter y base de corte", img: "ImgProductos/base de corte a4 verde.webp" },
        { name: "Base de corte A3 verde", price: 25.00, category: "Cutter y base de corte", img: "ImgProductos/base de corte a3 verdes.webp" },
        { name: "Base de corte A1 verde", price: 80.00, category: "Cutter y base de corte", img: "ImgProductos/base de corte a1 verde.webp" },
        { name: "Regla T con número y bisel 60 cm", price: 17.50, category: "Regla T, compás, transportador", img: "ImgProductos/Regla T Con Numero y con Bisel 60CM.webp" },
        { name: "Regla T con número y bisel 70 cm", price: 18.50, category: "Regla T, compás, transportador", img: "ImgProductos/Regla T Con Numero y con Bisel 70CM.webp" },
        { name: "Regla T con número y bisel 80 cm", price: 20.00, category: "Regla T, compás, transportador", img: "ImgProductos/Regla T Con Numero y con Bisel 80CM.webp" },
        { name: "Regla T con número y bisel 90 cm", price: 22.00, category: "Regla T, compás, transportador", img: "ImgProductos/Regla T Con Numero y con Bisel 90CM.webp" },
        { name: "Escuadra con número 15 cm", price: 8.50, category: "Reglas y Escuadras", img: "ImgProductos/Escuadra Con Numero 15CM.webp" },
        { name: "Escuadra sin número 15 cm", price: 8.50, category: "Reglas y Escuadras", img: "ImgProductos/Escuadra Sin Numero 15CM.webp" },
        { name: "Escuadra con número 20 cm", price: 9.50, category: "Reglas y Escuadras", img: "ImgProductos/Escuadra Con Numero 20CM.webp" },
        { name: "Escuadra sin número 20 cm", price: 9.50, category: "Reglas y Escuadras", img: "ImgProductos/Escuadra Sin Numero 20CM.webp" },
        { name: "Escuadra con número 25 cm", price: 11.50, category: "Reglas y Escuadras", img: "ImgProductos/Escuadra Con Numero 25CM.webp" },
        { name: "Escuadra sin número 25 cm", price: 11.50, category: "Reglas y Escuadras", img: "ImgProductos/Escuadra Sin Numero 25CM.webp" },
        { name: "Escuadra con número 30 cm", price: 13.50, category: "Reglas y Escuadras", img: "ImgProductos/Escuadra Con Numero 30CM.webp" },
        { name: "Escuadra sin número 30 cm", price: 13.50, category: "Reglas y Escuadras", img: "ImgProductos/Escuadra Sin Numero 30CM.webp" },
        { name: "Bitácora Canson A4", price: 14.50, category: "Arte y Manualidades", img: "ImgProductos/Bitacora Canson A4.webp" },
        { name: "Bitácora Canson A3", price: 24.50, category: "Arte y Manualidades", img: "ImgProductos/Bitacora Canson A3.webp" },
        { name: "Escalímetro Ove", price: 11.00, category: "Útiles Universitarios", img: "ImgProductos/escalímetro ove.webp" },
        { name: "Escalímetro Artesco", price: 12.00, category: "Útiles Universitarios", img: "ImgProductos/escalímetro artesco.webp" },
        { name: "Papel vegetal A4 112 g/m²", price: 1.00, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/Papel Vegetal 112GR A4.webp" },
        { name: "Foldcote 215 g", price: 2.00, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/Foldcote 215GR.webp" },
        { name: "Foldcote 235 g", price: 2.20, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/Foldcote 235GR.webp" },
        { name: "Dúplex 235 g", price: 2.20, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/Duplex 235GR.webp" },
        { name: "Dúplex 245 g", price: 2.40, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/Duplex 245GR.webp" },
        { name: "Dúplex 330 g", price: 2.80, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/Duplex 330GR.webp" },
        { name: "Liner 135 g", price: 1.20, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/Liner 135GR.webp" },
        { name: "Liner 170 g", price: 1.60, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/Liner 170GR.webp" },
        { name: "Micas con film protector ambas caras 180 micras", price: 6.00, category: "Varios", img: "ImgProductos/Micas con Film protector en Ambas caras 180micras.webp" },
        { name: "Micas con film protector ambas caras 250 micras", price: 8.50, category: "Varios", img: "ImgProductos/Micas con Film protector en Ambas caras 250 micras.webp" },
        { name: "Micas (lisa, cubo, catedral) A4", price: 0.50, category: "Varios", img: "ImgProductos/Micas (lisa - cubo - catedral) A4.webp" },
        { name: "Mica porta papel A4 paquete x10", price: 6.00, category: "Varios", img: "ImgProductos/mica portapapel a4 de pqtx10.webp" },
        { name: "Mica porta papel A4 unidad", price: 1.00, category: "Varios", img: "ImgProductos/mica portapapel a4 x unidad.webp" },
        { name: "Plancha de corcho 1 mm natural", price: 15.00, category: "Varios", img: "ImgProductos/Plancha de Corcho 1MM ( natural ).webp" },
        { name: "Plancha de corcho 1 mm verde", price: 15.00, category: "Varios", img: "ImgProductos/Plancha de Corcho 1MM ( verde ).webp" },
        { name: "Madera balsa varilla cuadrada 90 cm x 1×1 mm", price: 0.00, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Varilla Cuadrada largo90CM 1MM x 1MM.webp" },
        { name: "Madera balsa varilla cuadrada 90 cm x 1.5×1.5 mm", price: 0.50, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Varilla Cuadrada largo90CM 1.5MMx1.5MM.webp" },
        { name: "Madera balsa varilla cuadrada 90 cm x 2×2 mm", price: 0.50, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Varilla Cuadrada largo90CM 2MM x 2MM.webp" },
        { name: "Madera balsa varilla cuadrada 90 cm x 3x3 mm", price: 0.60, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Varilla Cuadrada largo90CM 3MM x 3MM.webp" },
        { name: "Madera balsa varilla cuadrada 90 cm x 4×4 mm", price: 0.60, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Varilla Cuadrada largo90CM 4MM x 4MM.webp" },
        { name: "Madera balsa varilla cuadrada 90 cm x 5×5 mm", price: 0.70, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Varilla Cuadrada largo90CM 5MM x 5MM.webp" },
        { name: "Madera balsa varilla cuadrada 90 cm x 6×6 mm", price: 0.80, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Varilla Cuadrada largo90CM 6MM x 6MM.webp" },
        { name: "Madera balsa laminada 90 cm x 1×2 mm", price: 0.50, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 1MM x 2MM.webp" },
        { name: "Madera balsa laminada 90 cm x 1×3 mm", price: 0.60, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 1MM x 3MM.webp" },
        { name: "Madera balsa laminada 90 cm x 1×4 mm", price: 0.70, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 1MM x 4MM.webp" },
        { name: "Madera balsa laminada 90 cm x 1×5 mm", price: 0.80, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 1MM x 5MM.webp" },
        { name: "Madera balsa laminada 90 cm x 1×6 mm", price: 0.80, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 1MM x 6MM.webp" },
        { name: "Madera balsa laminada 90 cm x 1×7 mm", price: 0.90, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 1MM x 7MM.webp" },
        { name: "Madera balsa laminada 90 cm x 2×3 mm", price: 0.50, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 2MM x 3 MM.webp" },
        { name: "Madera balsa laminada 90 cm x 2×4 mm", price: 0.60, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 2MM x 4 MM.webp" },
        { name: "Madera balsa laminada 90 cm x 2×5 mm", price: 0.80, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 2MM x 5MM.webp" },
        { name: "Madera balsa laminada 90 cm x 2×6 mm", price: 1.00, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 2MM x 6MM.webp" },
        { name: "Madera balsa laminada 90 cm x 3×4 mm", price: 0.70, category: "Arte y Manualidades", img: "ImgProductos/Madera Balsa Laminada largo90CM 3MM x 4MM.webp" },
        { name: "Madera dura varilla cuadrada 80 cm x 1×1 mm", price: 0.80, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Varilla Cuadrada largo80CM 1MM x1MM.webp" },
        { name: "Madera dura varilla cuadrada 80 cm x 1.5×1.5 mm", price: 0.90, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Varilla Cuadrada largo80CM 1.5MMx1.5MM.webp" },
        { name: "Madera dura varilla cuadrada 80 cm x 2×2 mm", price: 1.00, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Varilla Cuadrada largo80CM 2MM x2MM.webp" },
        { name: "Madera dura varilla cuadrada 80 cm x 3×3 mm", price: 1.10, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Varilla Cuadrada largo80CM 3MM x3MM.webp" },
        { name: "Madera dura varilla cuadrada 80 cm x 4×4 mm", price: 1.20, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Varilla Cuadrada largo80CM 4MM x4MM.webp" },
        { name: "Madera dura varilla cuadrada 80 cm x 5×5 mm", price: 1.30, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Varilla Cuadrada largo80CM 5MM x5MM.webp" },
        { name: "Madera dura laminada 80 cm x 1×2 mm", price: 0.80, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Laminada largo80CM 1MM x 2MM.webp" },
        { name: "Madera dura laminada 80 cm x 1×3 mm", price: 0.90, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Laminada largo80CM 1MM x 3MM.webp" },
        { name: "Madera dura laminada 80 cm x 1×4 mm", price: 1.00, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Laminada largo80CM 1MM x 4MM.webp" },
        { name: "Madera dura laminada 80 cm x 1×5 mm", price: 1.00, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Laminada largo80CM 1MM x 5MM.webp" },
        { name: "Madera dura laminada 80 cm x 2×3 mm", price: 1.00, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Laminada largo80CM 2MM x 3MM.webp" },
        { name: "Madera dura laminada 80 cm x 2×4 mm", price: 1.00, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Laminada largo80CM 2MM x 4MM.webp" },
        { name: "Madera dura laminada 80 cm x 2×5 mm", price: 1.20, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Laminada largo80CM 2MM x 5MM.webp" },
        { name: "Madera dura laminada 80 cm x 2×6 mm", price: 1.30, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Laminada largo80CM 2MM x 6MM.webp" },
        { name: "Madera dura plancha 80 cm x 1×10 cm", price: 7.00, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Plancha largo80CM 1MM x 10CM.webp" },
        { name: "Madera dura plancha 80 cm x 1.5×10 cm", price: 8.00, category: "Arte y Manualidades", img: "ImgProductos/Madera Dura Plancha largo80CM 1.5MM x 10CM.webp" },
        { name: "Pintura en spray", price: 8.00, category: "Pinceles y pinturas acrílicas", img: "ImgProductos/Pintura en Spray.webp" },
        { name: "Silicona Arti 30 ml", price: 2.00, category: "Silicona líquida o en barra", img: "ImgProductos/Silicona Arti 30ML.webp" },
        { name: "Silicona Arti 100 ml", price: 4.50, category: "Silicona líquida o en barra", img: "ImgProductos/Silicona Arti 100ML.webp" },
        { name: "Silicona Arti 250 ml", price: 7.50, category: "Silicona líquida o en barra", img: "ImgProductos/Silicona Arti 250ML.webp" },
        { name: "Estilógrafo Unipin 0.8", price: 6.80, category: "Lápices de dibujo, carboncillo, pasteles", img: "ImgProductos/Estilografo UNIPIN 0.8.webp" },
        { name: "Estilógrafo Unipin 0.5", price: 6.80, category: "Lápices de dibujo, carboncillo, pasteles", img: "ImgProductos/Estilografo UNIPIN 0.5.webp" },
        { name: "Estilógrafo Unipin 0.3", price: 6.80, category: "Lápices de dibujo, carboncillo, pasteles", img: "ImgProductos/Estilografo UNIPIN 0.3.webp" },
        { name: "Estilógrafo Artline 0.8", price: 8.50, category: "Lápices de dibujo, carboncillo, pasteles", img: "ImgProductos/Estilografo ARTLINE 0.8.webp" },
        { name: "Estilógrafo Artline 0.5", price: 8.50, category: "Lápices de dibujo, carboncillo, pasteles", img: "ImgProductos/Estilografo ARTLINE 0.5.webp" },
        { name: "Estilógrafo Artline 0.3", price: 8.50, category: "Lápices de dibujo, carboncillo, pasteles", img: "ImgProductos/Estilografo ARTLINE 0.3.webp" },
        { name: "Palito de brochetas #10", price: 2.00, category: "Varios", img: "ImgProductos/palito de brochetas 10.webp" },
        { name: "Palito de brochetas #12", price: 2.50, category: "Varios", img: "ImgProductos/palito de brochetas 12.webp" },
        { name: "Dispensador Artesco", price: 10.50, category: "Cinta adhesiva y dispensadores", img: "ImgProductos/Dispensador artesco.webp" },
        { name: "Pañitos amarillos", price: 1.00, category: "Varios", img: "ImgProductos/pañitos amarillos.webp" },
        { name: "Aerosol Glade", price: 10.00, category: "Varios", img: "ImgProductos/sprite glade.webp" },
        { name: "Bolsa de basura La Roca", price: 7.00, category: "Varios", img: "ImgProductos/Bolsa de basura La roca.webp" },
        { name: "Bolsa de basura Alfa", price: 14.00, category: "Varios", img: "ImgProductos/Bolsa de basura Alfa.webp" },
        { name: "Super glue plancha x12", price: 4.80, category: "Pegamentos y Adhesivos", img: "ImgProductos/super glue plancha x12.webp" },
        { name: "Super glue unidad", price: 0.50, category: "Pegamentos y Adhesivos", img: "ImgProductos/super glue unidad.webp" },
        { name: "Acuarela x12 Artesco", price: 10.00, category: "Acuarelas y témperas", img: "ImgProductos/acuarela x12 artesco.webp" },
        { name: "Borrador blanco chico Artesco", price: 0.50, category: "Borradores y Tajadores", img: "ImgProductos/borrador blanco chico artesco.webp" },
        { name: "Borrador blanco grande Artesco", price: 1.00, category: "Borradores y Tajadores", img: "ImgProductos/borrador blanco grande artesco.webp" },
        { name: "cartulina escolar", price: 0.50, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/cartulina escolar.webp" },
        { name: "Colores x12 triangulares Artesco", price: 6.00, category: "Colores y Crayones", img: "ImgProductos/colores x12 triang artesco.webp" },
        { name: "Colores x12 Faber", price: 7.00, category: "Colores y Crayones", img: "ImgProductos/colores x12 faber.webp" },
        { name: "Lapicero Pilot punta fina", price: 2.70, category: "Bolígrafos y plumones para oficina", img: "ImgProductos/lapicero pilot punta fina bp-sf.webp" },
        { name: "Lapicero Pilot", price: 4.50, category: "Bolígrafos y plumones para oficina", img: "ImgProductos/lapicero pilot.webp" },
        { name: "Lapicero Faber-Castell", price: 1.50, category: "Bolígrafos y plumones para oficina", img: "ImgProductos/lapicero faber castell.webp" },
        { name: "Lapicero de color Faber-Castell", price: 1.00, category: "Bolígrafos y plumones para oficina", img: "ImgProductos/lapicero de color faber castell.webp" },
        { name: "Lapicero borrable Faber-Castell", price: 5.00, category: "Bolígrafos y plumones para oficina", img: "ImgProductos/lapicero borrable faber castell.webp" },
        { name: "Lapicero Ove tinta líquida", price: 1.80, category: "Bolígrafos y plumones para oficina", img: "ImgProductos/lapicero ove tinta liquida.webp" },
        { name: "Corrector Faber", price: 1.60, category: "Correctores", img: "ImgProductos/corrector faber.webp" },
        { name: "Crayones x12 delgados Artesco", price: 3.00, category: "Colores y Crayones", img: "ImgProductos/crayones x12 delgado artesco.webp" },
        { name: "Crayones x12 jumbo Artesco", price: 4.60, category: "Colores y Crayones", img: "ImgProductos/crayones x12 jumbo artesco.webp" },
        { name: "Clips metálicos Artesco", price: 1.50, category: "Clips, sujetadores y chinches", img: "ImgProductos/clips metálicos artesco.webp" },
        { name: "Clips mariposa grande", price: 3.50, category: "Clips, sujetadores y chinches", img: "ImgProductos/clips mariposa grande.webp" },
        { name: "Clips mariposa chico", price: 4.50, category: "Clips, sujetadores y chinches", img: "ImgProductos/clips mariposa chico.webp" },
        { name: "Chinches doradas Artesco", price: 1.50, category: "Clips, sujetadores y chinches", img: "ImgProductos/chinches dorado artesco.webp" },
        { name: "Chinches de colores Ove", price: 2.00, category: "Clips, sujetadores y chinches", img: "ImgProductos/chinches de colores ove.webp" },
        { name: "Compás escolar Layconsa plástico con lápiz", price: 2.20, category: "Regla T, compás, transportador", img: "ImgProductos/compás escolar layconsa plástico c lapiz.webp" },
        { name: "Lápiz 2B Artesco", price: 0.50, category: "Lápices y Lapiceros", img: "ImgProductos/lapiz 2b artesco.webp" },
        { name: "Lápiz de chequeo rojo Artesco", price: 0.80, category: "Lápices y Lapiceros", img: "ImgProductos/lapiz chequeo rojo artesco.webp" },
        { name: "Lápiz Faber-Castell profesional 2B", price: 2.10, category: "Lápices y Lapiceros", img: "ImgProductos/LAPIZ FC PROF 2B.webp" },
        { name: "Lápiz Faber-Castell profesional 2H", price: 2.10, category: "Lápices y Lapiceros", img: "ImgProductos/LAPIZ FC PROF 2H.webp" },
        { name: "Resaltador mini neón Ove caritas", price: 1.50, category: "Resaltadores y subrayadores", img: "ImgProductos/resaltador mini neon ove caritas.webp" },
        { name: "Resaltador Ove color pastel", price: 2.00, category: "Resaltadores y subrayadores", img: "ImgProductos/resaltador ove color pastel.webp" },
        { name: "Cinta masking 1 (24 mm) x 20 yd Pegafan", price: 2.50, category: "Cinta adhesiva y dispensadores", img: "ImgProductos/cinta masking 1(24mm)x20 yd pegafan.webp" },
        { name: "Cinta masking 1/2 (12 mm) x 20 yd Pegafan", price: 1.50, category: "Cinta adhesiva y dispensadores", img: "ImgProductos/cinta masking 12(12mm)x20yd pegafan.webp" },
        { name: "Cinta masking 3/4 (18 mm) x 20 yd Pegafan", price: 2.00, category: "Cinta adhesiva y dispensadores", img: "ImgProductos/cinta masking 34(18mm)x20yd pegafan.webp" },
        { name: "Cinta adhesiva", price: 0.70, category: "Cinta adhesiva y dispensadores", img: "ImgProductos/cinta adhesiva.webp" },
        { name: "Cinta gruesa", price: 3.50, category: "Cinta adhesiva y dispensadores", img: "ImgProductos/cinta grusa.webp" },
        { name: "Cinta delgada", price: 2.50, category: "Cinta adhesiva y dispensadores", img: "ImgProductos/cinta delgada.webp" },
        { name: "Papelote cuadriculado", price: 0.50, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/papelote cuadriculado.webp" },
        { name: "Papelote rayado", price: 0.50, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/papelote rayado.webp" },
        { name: "Papel sábana", price: 0.30, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/papel sábana.webp" },
        { name: "Plastilina Artesco x10", price: 2.60, category: "Plastilina y Masilla", img: "ImgProductos/plastilina artesco x10.webp" },
        { name: "Plastilina jumbo Artesco x12", price: 4.00, category: "Plastilina y Masilla", img: "ImgProductos/plastilina jumbo artesco x12.webp" },
        { name: "Plumón Faber x12", price: 5.80, category: "Plumones y Marcadores", img: "ImgProductos/plumon faber x12.webp" },
        { name: "Plumón para pizarra", price: 1.70, category: "Pizarras y marcadores para pizarra", img: "ImgProductos/plumon pizarra.webp" },
        { name: "Plumón para papelote", price: 1.70, category: "Plumones y Marcadores", img: "ImgProductos/plumon papelote.webp" },
        { name: "Plumón indeleble dúo negro Ove", price: 2.00, category: "Plumones y Marcadores", img: "ImgProductos/indeleble duo negro ove.webp" },
        { name: "Plumón indeleble Artesco punta 0.7 mm negro", price: 2.00, category: "Plumones y Marcadores", img: "ImgProductos/indeleble artesco de una 0.7mm negro.webp" },
        { name: "Mota", price: 2.90, category: "Varios", img: "ImgProductos/mota.webp" },
        { name: "Papel oficio cuadriculado", price: 0.20, category: "Papel bond (A4, oficio, carta)", img: "ImgProductos/papel oficio cuadriculado.webp" },
        { name: "Papel bond paquete x500 hojas", price: 12.50, category: "Papel bond (A4, oficio, carta)", img: "ImgProductos/papel bond paquete x500 hojas.webp" },
        { name: "Papel bond por unidad", price: 0.10, category: "Papel bond (A4, oficio, carta)", img: "ImgProductos/papel bond x unidad.webp" },
        { name: "Papel A3 por unidad", price: 0.10, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/papel a3 x unidad.webp" },
        { name: "Papel de colores por unidad", price: 0.10, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/papel de colores x  unidad.webp" },
        { name: "Folder manila A4", price: 0.50, category: "Carpetas manila y folders colgantes", img: "ImgProductos/folder manila a4.webp" },
        { name: "Sobre manila a4", price: 0.50, category: "Carpetas manila y folders colgantes", img: "ImgProductos/sobre manila a4.webp" },
        { name: "Fastener", price: 0.20, category: "Folders y archivadores", img: "ImgProductos/fastener.webp" },
        { name: "Papel crepé", price: 0.50, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/papel crepe.webp" },
        { name: "Papel lustre", price: 0.50, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/papel lustre.webp" },
        { name: "Papel kraft", price: 0.50, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/papel kraft.webp" },
        { name: "Silicona en barra delgada", price: 1.00, category: "Silicona líquida o en barra", img: "ImgProductos/silicona barra delgado.webp" },
        { name: "Silicona en barra gruesa", price: 0.50, category: "Silicona líquida o en barra", img: "ImgProductos/silicona barra gruesa.webp" },
        { name: "Microporoso escarchado con adhesivo 50×60", price: 4.00, category: "Cartulinas y papeles decorativos", img: "ImgProductos/microporoso escarchado con adhesivo 50x60.webp" },
        { name: "Microporoso escarchado sin adhesivo 50×60", price: 3.80, category: "Cartulinas y papeles decorativos", img: "ImgProductos/microporoso escarchado sin adhesivo 50x60.webp" },
        { name: "Grapas x5000 Artesco", price: 3.50, category: "Engrapadoras y grapas", img: "ImgProductos/grapas 5000 artesco.webp" },
        { name: "Grapas x1000 Artesco", price: 1.50, category: "Engrapadoras y grapas", img: "ImgProductos/grapas 1000 artesco.webp" },
        { name: "Goma líquida 250 g Artesco con aplicador", price: 3.00, category: "Pegamentos y Adhesivos", img: "ImgProductos/goma liquida 250 gr artesco caplicativo.webp" },
        { name: "Goma líquida 85 g Artesco con aplicador", price: 2.00, category: "Pegamentos y Adhesivos", img: "ImgProductos/goma liquida 85 gr artesco caplicativo.webp" },
        { name: "Goma en barra 21 g Artesco", price: 2.30, category: "Pegamentos y Adhesivos", img: "ImgProductos/goma en barra 21 gr artesco.webp" },
        { name: "Goma en barra 40 g Artesco", price: 3.80, category: "Pegamentos y Adhesivos", img: "ImgProductos/goma en barra 40 gr artesco.webp" },
        { name: "Tajador bloques Ove", price: 2.60, category: "Borradores y Tajadores", img: "ImgProductos/tajador bloques ove.webp" },
        { name: "Tajador Mystic Artesco", price: 3.20, category: "Borradores y Tajadores", img: "ImgProductos/tajador mystic artesco.webp" },
        { name: "Tajador rectangular Artesco", price: 1.20, category: "Borradores y Tajadores", img: "ImgProductos/tajador rectangular artesco.webp" },
        { name: "Tajador + borrador Monster Ove", price: 2.40, category: "Borradores y Tajadores", img: "ImgProductos/tajador + borrador monster ove.webp" },
        { name: "Témpera x7 Faber-Castell", price: 7.00, category: "Acuarelas y témperas", img: "ImgProductos/tempera x7 faber.webp" },
        { name: "Témpera x7 Layconsa Puppy", price: 6.50, category: "Acuarelas y témperas", img: "ImgProductos/tempera x7 layconsa puppy.webp" },
        { name: "Paleta chica de plástico", price: 4.00, category: "Arte y Manualidades", img: "ImgProductos/paleta chica de plastico.webp" },
        { name: "Transportador grande y chico 180°", price: 1.00, category: "Regla T, compás, transportador", img: "ImgProductos/transportador grande y chico 180°.webp" },
        { name: "Juego de escuadras Artesco", price: 4.50, category: "Reglas y Escuadras", img: "ImgProductos/juego de escuadras artesco.webp" },
        { name: "Regla de 30 cm", price: 1.00, category: "Reglas y Escuadras", img: "ImgProductos/regla de 30cm.webp" },
        { name: "Limpiatipo Artesco", price: 2.00, category: "Varios", img: "ImgProductos/limpiatipo artesco.webp" },
        { name: "Tiza blanca x12", price: 2.00, category: "Varios", img: "ImgProductos/tiza blanca x12.webp" },
        { name: "Tiza de colores x12", price: 2.50, category: "Varios", img: "ImgProductos/tiza de colores x12.webp" },
        { name: "Vinifan A4", price: 5.50, category: "Varios", img: "ImgProductos/vinifan a4.webp" },
        { name: "Vinifan oficio", price: 9.90, category: "Varios", img: "ImgProductos/vinifan oficio.webp" },
        { name: "Pincel plano n.º 2 Ove", price: 1.50, category: "Pinceles y pinturas acrílicas", img: "ImgProductos/pincel plano n°2 ove.webp" },
        { name: "Pincel plano n.º 4 Ove", price: 1.60, category: "Pinceles y pinturas acrílicas", img: "ImgProductos/pincel plano n°4 ove.webp" },
        { name: "Pincel plano n.º 6 Ove", price: 1.80, category: "Pinceles y pinturas acrílicas", img: "ImgProductos/pincel plano n°6 ove.webp" },
        { name: "Pincel plano n.º 8 Ove", price: 2.00, category: "Pinceles y pinturas acrílicas", img: "ImgProductos/pincel plano n°8 ove.webp" },
        { name: "Pincel x6 Ove", price: 6.00, category: "Pinceles y pinturas acrílicas", img: "ImgProductos/pincel x 6 ove.webp" },
        { name: "Tijera naranja 5 Artesco", price: 1.80, category: "Tijeras escolares", img: "ImgProductos/tijera naranja 5 artesco.webp" },
        { name: "Tijera 8 Artesco", price: 4.50, category: "Tijeras escolares", img: "ImgProductos/tijera 8 artesco.webp" },
        { name: "Tijera zigzag", price: 4.20, category: "Tijeras escolares", img: "ImgProductos/tijera zic zac.webp" },
        { name: "Tijera forma 3 en 1", price: 8.00, category: "Tijeras escolares", img: "ImgProductos/tijera forma 3en1.webp" },
        { name: "Punzón Evaflex", price: 2.50, category: "Arte y Manualidades", img: "ImgProductos/punzon evaflex.webp" },
        { name: "Chenille pelusa por unidad", price: 0.10, category: "Arte y Manualidades", img: "ImgProductos/chenille pelusa x unidad.webp" },
        { name: "Chenille pelusa por bolsa", price: 5.00, category: "Arte y Manualidades", img: "ImgProductos/chenille pelusa x bolsa.webp" },
        { name: "Ojos x12 por plancha", price: 7.90, category: "Arte y Manualidades", img: "ImgProductos/ojos x12 plancha.webp" },
        { name: "Ojos por bolsita", price: 1.00, category: "Arte y Manualidades", img: "ImgProductos/ojos por bolsita.webp" },
        { name: "Escarcha por plancha", price: 5.00, category: "Arte y Manualidades", img: "ImgProductos/escarcha x plancha.webp" },
        { name: "Escarcha por unidad", price: 0.30, category: "Arte y Manualidades", img: "ImgProductos/escarcha x unidad.webp" },
        { name: "Papel metálico", price: 1.50, category: "Papel bond, cartulina, papel lustre", img: "ImgProductos/papel metálico.webp" },
        { name: "Tampón redondo", price: 3.50, category: "Sellos y tampones", img: "ImgProductos/tampon redondo.webp" },
        { name: "Tampón rectangular", price: 3.50, category: "Sellos y tampones", img: "ImgProductos/tampon rectangular.webp" },
        { name: "Alfileres Artesco", price: 2.00, category: "Clips, sujetadores y chinches", img: "ImgProductos/alfileres artesco.webp" },
        { name: "Cartón corrugado 50×70", price: 2.00, category: "Arte y Manualidades", img: "ImgProductos/Carton Corrugado 50x70.webp" },
        { name: "Cola de rata por rollo", price: 9.00, category: "Arte y Manualidades", img: "ImgProductos/cola de rata x rollo.webp" },
        { name: "Cola de rata por metro", price: 0.30, category: "Arte y Manualidades", img: "ImgProductos/cola de rata x metro.webp" },
        { name: "Pabilo chico", price: 0.70, category: "Arte y Manualidades", img: "ImgProductos/pabilo chico.webp" },
        { name: "Pabilo mediano", price: 0.80, category: "Arte y Manualidades", img: "ImgProductos/pabilo mediano.webp" },
        { name: "APU 30 ml con brillo", price: 2.50, category: "Arte y Manualidades", img: "ImgProductos/apu x 30ml brillo.webp" },
        { name: "Goma EVA o microporoso por plancha", price: 14.00, category: "Cartulinas y papeles decorativos", img: "ImgProductos/goma eva o microporoso x plancha.webp" },
        { name: "Corrospum por plancha", price: 16.00, category: "Cartulinas y papeles decorativos", img: "ImgProductos/corrospum x plancha.webp" }
    ];
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    };
    let cartItems = [];

    function renderProductCard(product) {
        const card = document.createElement('article');
        card.className = 'product-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col';
        card.style.backgroundColor = '#fdfaf6'; // fondo crema claro

        card.innerHTML = `
    <div class="image-container h-48 mb-4 flex items-center justify-center rounded-lg overflow-hidden" style="background-color: #f0f0f0;">
      <img src="${product.img}" alt="${product.name}" class="max-h-full max-w-full object-contain" loading="lazy">
    </div>
    <h3 class="text-lg font-semibold truncate mb-2" style="color: #333333;">${product.name}</h3>
    <p class="mb-4" style="color: #666666;">S/ ${product.price.toFixed(2)}</p>
    <div class="flex items-center gap-3">
      <input type="number" min="1" max="99" value="1" 
             class="quantity-input w-16 text-center border rounded-md focus:outline-none focus:ring-2"
             style="border-color: #cccccc; color: #333;" />
             
      <button class="add-to-cart-btn px-3 py-1 rounded text-white hover:brightness-110 transition-colors text-sm"
              style="background-color: #2E7D32;" 
              data-name="${product.name}" 
              aria-label="Añadir al carrito">
        Añadir al carrito
      </button>
    </div>
  `;
        return card;
    }

    function renderCart() {
        elements.emptyCartText = document.getElementById('empty-cart-text');
        elements.cartItemsContainer.innerHTML = '';
        let total = 0;
        if (cartItems.length === 0) {
            // Mostrar mensaje cuando el carrito está vacío
            elements.emptyCartText.classList.remove('hidden');
            elements.cartTotal.textContent = 'Total: S/ 0.00';
            elements.cartCount.textContent = '0';
        } else {
            // Ocultar mensaje y mostrar productos
            elements.emptyCartText.classList.add('hidden');
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item flex justify-between items-center mb-2';
                itemElement.dataset.name = item.name; // para identificar
                itemElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span class="flex items-center gap-4">
                    <span>S/ ${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn text-red-600 font-bold" aria-label="Eliminar ${item.name} del carrito">&times;</button>
                </span>
            `;
                elements.cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
            elements.cartTotal.textContent = `Total: S/ ${total.toFixed(2)}`;
            elements.cartCount.textContent = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        }
    }


    function addToCart(product, quantity) {
        quantity = Math.min(Math.max(1, quantity), 99); // Limit between 1 and 99
        const existingItem = cartItems.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity = Math.min(existingItem.quantity + quantity, 99);
        } else {
            cartItems.push({ name: product.name, quantity: quantity, price: product.price });
        }
        renderCart();
        elements.cartSidebar.classList.add('open'); // Show cart
    }

    function removeFromCart(productName) {
        const existingItemIndex = cartItems.findIndex(item => item.name === productName);
        if (existingItemIndex !== -1) {
            const item = cartItems[existingItemIndex];
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cartItems.splice(existingItemIndex, 1);
            }
            renderCart();
        }
    }
    elements.productsGrid.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const card = e.target.closest('.product-card');
            if (!card) return;
            const productName = e.target.dataset.name.trim();
            const product = products.find(p => p.name === productName);
            if (!product) return;
            // Get the quantity input next to the button
            const qtyInput = card.querySelector('.quantity-input');
            let quantity = 1;
            if (qtyInput && !isNaN(parseInt(qtyInput.value))) {
                quantity = parseInt(qtyInput.value);
            }
            addToCart(product, quantity);
            // Reset quantity input to 1 after adding to cart
            qtyInput.value = 1;
        }
    });
    // Event listener para eliminar productos del carrito
    elements.cartItemsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('remove-item-btn')) {
            const productDiv = e.target.closest('.cart-item');
            if (productDiv) {
                const productName = productDiv.dataset.name;
                removeFromCart(productName);
            }
        }
    });

    // Renderizar productos
    function renderProducts(filteredProducts) {
        elements.productsGrid.innerHTML = '';
        if (filteredProducts.length === 0) {
            elements.noResults.classList.remove('hidden');
        } else {
            elements.noResults.classList.add('hidden');
            filteredProducts.forEach(product => {
                elements.productsGrid.appendChild(renderProductCard(product));
            });
        }
    }
    // Lógica de filtrado y búsqueda
    function filterProducts() {
        const selectedFilters = Array.from(elements.filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.filter);
        const searchTerm = elements.searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => {
            const matchesCategory = selectedFilters.length === 0 || selectedFilters.some(filter =>
                product.category === filter || (filter === 'university' && product.category.startsWith('university-'))
            );
            const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm) || product.desc.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        renderProducts(filteredProducts);
    }
    // Debounced search
    const debouncedFilter = debounce(filterProducts, 300);

    // Event listeners
    elements.searchInput.addEventListener('input', () => {
        const searchTerm = elements.searchInput.value.trim().toLowerCase();
        const selectedFilters = Array.from(elements.filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.filter);
        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedFilters.length === 0 ||
                selectedFilters.includes(product.category);
            return matchesSearch && matchesCategory;
        });
        renderProducts(filteredProducts);
    });
    // Mantén los listeners de los checkboxes (para re-filtrar al cambiar categorías)
    elements.filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const searchTerm = elements.searchInput.value.trim().toLowerCase(); // Respeta el texto de búsqueda actual
            const selectedFilters = Array.from(elements.filterCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.dataset.filter);
            const filteredProducts = products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm);
                const matchesCategory = selectedFilters.length === 0 ||
                    selectedFilters.includes(product.category);
                return matchesSearch && matchesCategory;
            });
            renderProducts(filteredProducts);
        });
    });
    // Toggle cart sidebar
    elements.toggleCartButton.addEventListener('click', () => {
        elements.cartSidebar.classList.add('open');
    });
    // Close cart sidebar
    elements.closeCartButton.addEventListener('click', () => {
        elements.cartSidebar.classList.remove('open');
    });
    // Close product modal
    elements.closeModalButton.addEventListener('click', () => {
        elements.productModal.classList.add('hidden');
    });
    // Close modal on outside click
    elements.productModal.addEventListener('click', e => {
        if (e.target === elements.productModal) {
            elements.productModal.classList.add('hidden');
        }
    });
    function initialize() {
        renderProducts(products);
        renderCart();
        loadDarkModePreference(); // Cargar preferencia de modo oscuro
    
    // Event listener para el botón de modo oscuro
    elements.darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    initialize()
    document.getElementById('checkout').addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de continuar.');
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.location.href = 'carrito.html';
    });
});
const cartSidebar = document.getElementById('cart-sidebar');
const toggleCartBtn = document.getElementById('toggle-cart');

let closeTimeout;

// Abrir/cerrar con el botón
delements.toggleCartButton.addEventListener('click', () => {
  elements.cartSidebar.classList.toggle('open');
  const isOpen = elements.cartSidebar.classList.contains('open');
  elements.toggleCartButton.setAttribute('aria-expanded', isOpen);
});

// Cerrar carrito
elements.closeCartButton.addEventListener('click', () => {
  elements.cartSidebar.classList.remove('open');
  elements.toggleCartButton.setAttribute('aria-expanded', 'false');
});

// Cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
  const isClickInside = elements.cartSidebar.contains(e.target) || 
                       elements.toggleCartButton.contains(e.target);
  
  if (!isClickInside && elements.cartSidebar.classList.contains('open')) {
    elements.cartSidebar.classList.remove('open');
    elements.toggleCartButton.setAttribute('aria-expanded', 'false');
  }
});

// Scroll Reveal
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[data-scroll-reveal]');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});
// Animación inicial
window.addEventListener('load', () => {
    document.querySelector('.pre-carga').style.display = 'none';
    document.querySelector('footer').classList.add('visible');
});
// Efecto 3D en hover
const mainContent = document.querySelector('.main-content');
mainContent.addEventListener('mousemove', (e) => {
    const rect = mainContent.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    const rotateX = (mouseY / centerY) * 5;
    const rotateY = (mouseX / centerX) * -5;
    mainContent.style.transform = `translateZ(clamp(10px, 2vw, 20px)) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
});

mainContent.addEventListener('mouseleave', () => {
    mainContent.style.transform = 'translateZ(clamp(10px, 2vw, 20px)) rotateX(0deg) rotateY(0deg) scale(1)';
});
// Función para activar/desactivar modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Cambiar icono
    if (isDarkMode) {
        elements.darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        elements.darkModeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    
    // Guardar preferencia
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Función para cargar la preferencia de modo oscuro
function loadDarkModePreference() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Si no hay preferencia guardada, usar la del sistema
    if (localStorage.getItem('darkMode') === null && systemPrefersDark) {
        document.body.classList.add('dark-mode');
        elements.darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    } 
    // Si está habilitado en localStorage
    else if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        elements.darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}


