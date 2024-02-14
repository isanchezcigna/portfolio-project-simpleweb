document.addEventListener("DOMContentLoaded", function(){  
    window.onload = function() {
        loadDefault();
    }
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.getElementById('main-menu').classList.add('fixed-top');
            document.getElementById('main-menu').classList.add('bg-opacity-75');
            // add padding top to show content behind navbar
            navbar_height = document.querySelector('.navbar').offsetHeight;
            document.body.style.paddingTop = navbar_height + 'px';
        } else {  
            document.getElementById('main-menu').classList.remove('fixed-top');
            document.getElementById('main-menu').classList.remove('bg-opacity-75');
            // remove padding top from body
            document.body.style.paddingTop = '0';
        } 
    });
    //window.addEventListener('contextmenu', event => event.preventDefault());
}); 

function validateForm() {
        'use strict'
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
            form.classList.add('was-validated')
            }, false)
        })
  }

function loadLayout(layout){
    fetch(`layout/${layout}.html`)
    .then(data => data.text())
    .then((data)=> {
        document.getElementById(`${layout}`).innerHTML = data;
    });
};
function loadView(view){
    fetch(`views/${view}.html`)
    .then(data => data.text())
    .then((data)=> {
        document.getElementById('main').innerHTML = data;
        if (view === "tienda") {
            getProducts();
        } else if (view === "checkout") {
            getCart(false);
            for (i in dataComunas) {
                document.getElementById('invoice-comuna').innerHTML += "<option value='"+dataComunas[i]+"'>"+dataComunas[i]+"</option>";
            }
        } else if (view === "cart"){
            getProductsCart();
        }

    });
}

function loadDefault(){
    loadLayout('header');
    loadLayout('footer');
    const dom = document.getElementById('main');
    if (dom.childNodes.length === 0){ // verifica si hay cargada una vista, si no carga el inicio.
        loadView('inicio');
    };
}

const getProducts = function(){
    let products = '';
    dataInfo.forEach(product => {
        products += `
            <div class="col py-2">
                <article class="product_inner">
                    <figure class="product-image">
                        <a data-bs-toggle="modal" data-bs-target="#modalProduct" onclick="showProductModal(${product.id})">
                            <img src="${product.img_path}" srcset="${product.img_path}" class="product-cols-4 img-thumbnail" alt="" loading="lazy" sizes="(max-width: 540px) 100vw, 540px">
                        </a>
                    </figure>
                    <div class="product-category">
                        <a rel="tag" class="">${product.category}</a>
                    </div>
                    <header class="product-header">
                        <h5 class="product-h5">
                            <a>${product.name}</a>
                        </h5>
                    </header>
                    <div class="product-info">
                        <img src="img/${product.score}stars.JPG" class="align-items-center" alt="">
                        <span class="price">
                            <span class="product-price pb-3">
                                <bdi><span>$</span>${format(product.price)}</bdi>
                            </span>
                        </span>
                    </div>
                    <footer class="product-footer">
                        <a onclick="addCart(${product.id}) " class="add_cart_button btn btn-primary" title="Add to Cart">Agregar al Carro</a>
                        <a href="#" onclick="buy(${product.id}) "class="add_cart_button btn btn-warning" title="Buy Button">Comprar</a>
                    </footer>
                </article>
            </div>
        `;
    });
    document.getElementById('tienda-content').innerHTML = products;
};


const addCart = function(product){
    let addProduct = Object.assign({}, ...dataInfo.filter((data) => product === data.id));
    dataCart.push(addProduct);
    document.getElementById('cart-badge-top').innerHTML = dataCart.length;
};

const buy = function(product){
    addCart(product);
    loadView('cart');
};

const getCart = function(coupon){
    let carts = '';
    dataCart.forEach((cart) => {
        carts += `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${cart.name}</h6>
                    <small class="text-muted">${cart.size}</small>
                </div>
                <span class="text-muted">$${format(cart.price)}</span>
            </li>
        `;
    });
/*     if (coupon) {
        carts += `
        <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
                <h6 class="my-0">Cupón aplicado</h6>
                <small>DUOCUC</small>
            </div>
            <span class="text-success">−20%</span>
        </li>`;
    } */
    let cartDiv = document.getElementById('cart-content').lastElementChild;
    carts += `<li class="list-group-item d-flex justify-content-between">
        <span>Total (CLP)</span>
        <strong>$<span id="cart-total">0</span></strong>
    </li>`;
    document.getElementById('cart-badge').innerHTML = dataCart.length;
    document.getElementById('cart-content').innerHTML = carts;
    cartTotal();
};

const getProductsCart = function(){
    let productCarts = '';
    let resumeCarts = '';
    let total = 0;
    if (dataCart.length === 0){
        productCarts = `
        <div class="p-5">
            <div class="d-flex justify-content-between align-items-center mb-5">
                <h3 class="fw-bold mb-0 text-black">Productos en Carrito</h3>
                <span class="badge bg-warning" id="cart-badge">${dataCart.length}</span>
            </div>
            <hr class="my-4">
            <h4 class="fw-bold mb-0 text-black">No hay productos en el carro</h4>
            <hr class="my-4">
        </div>`;
        resumeCarts = `
        <div class="p-5">
            <div class="d-flex justify-content-between align-items-center mb-5">
                <h3 class="fw-bold mb-0 text-black">Resumen</h3>
                
            </div>
            <hr class="my-4">

            <div class="d-flex justify-content-between mb-4">
                <h5 class="">Sub-total:</h5>
                <h5>$0</h5>
            </div>

            <hr class="my-4">

            <div class="d-flex justify-content-between mb-5">
                <h5 class="">Total:</h5>
                <h5>$0</h5>
            </div>
        </div>`
    } else {
        productCarts += `
        <div class="p-5">
            <div class="d-flex justify-content-between align-items-center mb-5">
                <h3 class="fw-bold mb-0 text-black">Productos en Carrito</h3>
                <span class="badge bg-warning" id="cart-badge">${dataCart.length}</span>
            </div>
            <hr class="my-4">`;    
        dataCart.forEach((cart) => {
            total += parseInt(cart.price);
            productCarts += `
                <div class="row mb-4 d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                        <img src="${cart.img_path}" class="img-fluid rounded-3" alt="${cart.name}">
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">${cart.category}</h6>
                        <h6 class="text-black mb-0">${cart.name}</h6>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">$${format(cart.price)}</h6>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" onclick="deleteProductFromCart(${cart.id})" class="text-muted"><i class="fas fa-times"></i></a>
                    </div>
                </div>
                <hr class="my-4">`;
        });
        productCarts += `</div>`
        resumeCarts = `
        <div class="p-5">
            <div class="d-flex justify-content-between align-items-center mb-5">
                <h3 class="fw-bold mb-0 text-black">Resumen</h3>
                
            </div>
            <hr class="my-4">

            <div class="d-flex justify-content-between mb-4">
                <h5 class="">Sub-total:</h5>
                <h5>$${format(total)}</h5>
            </div>

            <hr class="my-4">

            <div class="d-flex justify-content-between mb-5">
                <h5 class="">Total:</h5>
                <h5>$${format(total)}</h5>
            </div>
        </div>`
    }
    document.getElementById('cartProductCol').innerHTML = productCarts;
    document.getElementById('resumeProductCol').innerHTML = resumeCarts;
}

const cartTotal = function(){
    let total = 0;
    dataCart.forEach((cart) => {
        total += parseInt(cart.price);
    });
    document.getElementById('cart-total').innerHTML = format(total);
};

const emptyCart = function(){
    dataCart.splice(0,dataCart.length);
    getCart();
}

function deleteProductFromCart(product){
    var opcion = confirm("Seguro desea borrar el producto?");
    if (opcion == true) {
        var newDataCart = dataCart.filter((data) => data.id !== product);
        emptyCart();
        dataCart = newDataCart;
        console.log(dataCart)
        alert("Elemento eliminado");
        getProductsCart();
	}
}

const showProductModal = function(product){
    let productShow = dataInfo.filter((data) => product === data.id);
    console.log("aqui va el producto show")
    console.log(productShow);
    let modalHeader = `<h5 class="modal-title" id="modalProductLongTitle">${productShow.name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>`;
    let modalBody = `
        <div class="row">
        <div class="col-lg-5">
            <!--Carousel Wrapper-->
            <div id="carousel-thumbEx" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
            <!--Slides-->
            <div class="carousel-inner" role="listbox">
                <div class="carousel-item">
                <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/img%20(23).webp" alt="First slide">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/img%20(24).webp" alt="Second slide">
                </div>
                <div class="carousel-item active">
                <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/img%20(25).webp" alt="Third slide">
                </div>
            </div>
            <!--/.Slides-->
            <!--Controls-->
            <a class="carousel-control-prev" href="#carousel-thumbEx" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carousel-thumbEx" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            <!--/.Controls-->
            <ol class="carousel-indicators">
                <li data-target="#carousel-thumb" data-slide-to="0" class="">
                <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/img%20(23).webp" width="60">
                </li>
                <li data-target="#carousel-thumb" data-slide-to="1" class="">
                <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/img%20(24).webp" width="60">
                </li>
                <li data-target="#carousel-thumb" data-slide-to="2" class="active">
                <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/img%20(25).webp" width="60">
                </li>
            </ol>
            </div>
            <!--/.Carousel Wrapper-->
        </div>
        <div class="col-lg-7">
            <h2 class="h2-responsive product-name">
            <strong>Product Name</strong>
            </h2>
            <h4 class="h4-responsive">
            <span class="green-text">
                <strong>$49</strong>
            </span>
            <span class="grey-text">
                <small>
                <s>$89</s>
                </small>
            </span>
            </h4>

            <!--Accordion wrapper-->
            <div class="accordion md-accordion" id="accordionEx1" role="tablist" aria-multiselectable="true">

            <!-- Accordion card -->
            <div class="card">

                <!-- Card header -->
                <div class="card-header" role="tab" id="headingOne11">
                <a data-toggle="collapse" data-parent="#accordionEx1" href="#collapseOne11" aria-expanded="true" aria-controls="collapseOne11">
                    <h5 class="mb-0">
                    Collapsible Group Item #1 <i class="fas fa-angle-down rotate-icon"></i>
                    </h5>
                </a>
                </div>

                <!-- Card body -->
                <div id="collapseOne11" class="collapse show" role="tabpanel" aria-labelledby="headingOne11" data-parent="#accordionEx1">
                <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                    wolf moon officia aute,
                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                </div>
                </div>

            </div>
            <!-- Accordion card -->

            <!-- Accordion card -->
            <div class="card">

                <!-- Card header -->
                <div class="card-header" role="tab" id="headingTwo21">
                <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseTwo21" aria-expanded="false" aria-controls="collapseTwo21">
                    <h5 class="mb-0">
                    Collapsible Group Item #2 <i class="fas fa-angle-down rotate-icon"></i>
                    </h5>
                </a>
                </div>

                <!-- Card body -->
                <div id="collapseTwo21" class="collapse" role="tabpanel" aria-labelledby="headingTwo21" data-parent="#accordionEx1">
                <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                    wolf moon officia aute,
                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                </div>
                </div>

            </div>
            <!-- Accordion card -->

            <!-- Accordion card -->
            <div class="card">

                <!-- Card header -->
                <div class="card-header" role="tab" id="headingThree31">
                <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseThree31" aria-expanded="false" aria-controls="collapseThree31">
                    <h5 class="mb-0">
                    Collapsible Group Item #3 <i class="fas fa-angle-down rotate-icon"></i>
                    </h5>
                </a>
                </div>

                <!-- Card body -->
                <div id="collapseThree31" class="collapse" role="tabpanel" aria-labelledby="headingThree31" data-parent="#accordionEx1">
                <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                    wolf moon officia aute,
                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                </div>
                </div>

            </div>
            <!-- Accordion card -->

            </div>
            <!-- Accordion wrapper -->


            <!-- Add to Cart -->
            <div class="card-body">
            <div class="row">
                <div class="col-md-6">

                <div class="select-wrapper md-form mdb-select colorful-select dropdown-primary"><span class="caret">▼</span><input type="text" class="select-dropdown form-control" readonly="true" required="false" data-activates="select-options-mselect1" value="" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-required="false" aria-haspopup="true" aria-expanded="false"><ul id="select-options-mselect1" class="dropdown-content select-dropdown w-100 " style="display: none;"><li class="disabled active " role="option" aria-selected="true" aria-disabled="true"><span class="filtrable "> Choose your option    </span></li><li class="  " role="option" aria-selected="false" aria-disabled="false"><span class="filtrable "> White    </span></li><li class="  " role="option" aria-selected="false" aria-disabled="false"><span class="filtrable "> Black    </span></li><li class="  " role="option" aria-selected="false" aria-disabled="false"><span class="filtrable "> Pink    </span></li></ul><select class="md-form mdb-select colorful-select dropdown-primary initialized" id="mselect1">
                    <option value="" disabled="" selected="">Choose your option</option>
                    <option value="1">White</option>
                    <option value="2">Black</option>
                    <option value="3">Pink</option>
                </select><label class="mdb-main-label active">Select color</label></div>
                

                </div>
                <div class="col-md-6">

                <div class="select-wrapper md-form mdb-select colorful-select dropdown-primary"><span class="caret">▼</span><input type="text" class="select-dropdown form-control" readonly="true" required="false" data-activates="select-options-mselect2" value="" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-required="false" aria-haspopup="true" aria-expanded="false"><ul id="select-options-mselect2" class="dropdown-content select-dropdown w-100 " style="display: none;"><li class="disabled active " role="option" aria-selected="true" aria-disabled="true"><span class="filtrable "> Choose your option    </span></li><li class="  " role="option" aria-selected="false" aria-disabled="false"><span class="filtrable "> XS    </span></li><li class="  " role="option" aria-selected="false" aria-disabled="false"><span class="filtrable "> S    </span></li><li class="  " role="option" aria-selected="false" aria-disabled="false"><span class="filtrable "> L    </span></li></ul><select class="md-form mdb-select colorful-select dropdown-primary initialized" id="mselect2">
                    <option value="" disabled="" selected="">Choose your option</option>
                    <option value="1">XS</option>
                    <option value="2">S</option>
                    <option value="3">L</option>
                </select><label class="mdb-main-label active">Select size</label></div>
                

                </div>
            </div>
            <div class="text-center">

                <button type="button" class="btn btn-secondary waves-effect waves-light" data-dismiss="modal">Close</button>
                <button class="btn btn-primary waves-effect waves-light">Add to cart
                <i class="fas fa-cart-plus ml-2" aria-hidden="true"></i>
                </button>
            </div>
            </div>
            <!-- /.Add to Cart -->
        </div>
        </div>
    `;
    let modalById = document.getElementById('modalProduct');
    /* modalById.getElementById('modalProduct-header').innerHTML = modalHeader;
    modalById.getElementById('modalProduct-body').innerHTML = modalBody; */
};

function format(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

function login(){
    let mail = document.getElementById('loginEmail');
    let pass = document.getElementById('loginPassword');
    let mailOk = false;
    let passOk = false
    dataUser.forEach((user) => {
        if (user.mail === mail) {
            mailOk = true;
            if (user.pass === pass) passOk = true;
        }
    });
}

const paramsUrl = function (){
    const vals = window.location.search;
    const urlParams = new URLSearchParams(vals);
    return urlParams;
}

function contactForm () {

}

function sendMail(toMail,subject,body){
    Email.send({
        Host: "mail.syntaxit.cl",
        Username: "no-responder@cholitostore.syntaxit.cl",
        Password: "Dj%458535.,",
        To: toMail,
        From: "no-responder@cholitostore.syntaxit.cl",
        Subject: subject,
        Body: body,
      })
        .then(function (message) {
          console.log("Mail enviado correctamente.")
        });
}
