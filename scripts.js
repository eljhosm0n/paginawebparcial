document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("index.html")) {
        if (!localStorage.getItem("logueado")) {
            window.location.href = "login.html";
        }
    }

    const loginBox = document.getElementById("loginBox");
    const registerBox = document.getElementById("registerBox");
    const goRegister = document.getElementById("goRegister");
    const goLogin = document.getElementById("goLogin");

    function mostrarRegistro() {
        loginBox.classList.remove("active");
        loginBox.classList.add("fadeOut");

        setTimeout(() => {
            loginBox.style.display = "none";
            registerBox.style.display = "block";

            registerBox.classList.remove("fadeOut");
            registerBox.classList.add("active");
        }, 300);
    }

    function mostrarLogin() {
        registerBox.classList.remove("active");
        registerBox.classList.add("fadeOut");

        setTimeout(() => {
            registerBox.style.display = "none";
            loginBox.style.display = "block";

            loginBox.classList.remove("fadeOut");
            loginBox.classList.add("active");
        }, 300);
    }

    if (goRegister && goLogin) {
        goRegister.addEventListener("click", mostrarRegistro);
        goLogin.addEventListener("click", mostrarLogin);
    }

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nuevoUsuario = document.getElementById("nuevoUsuario").value.trim();
            const nuevoPassword = document.getElementById("nuevoPassword").value.trim();
            const mensajeRegistro = document.getElementById("mensajeRegistro");

            if (!nuevoUsuario || !nuevoPassword) {
                mensajeRegistro.style.color = "red";
                mensajeRegistro.textContent = "Todos los campos son obligatorios.";
                return;
            }

            if (nuevoPassword.length < 6) {
                mensajeRegistro.style.color = "red";
                mensajeRegistro.textContent = "Mínimo 6 caracteres.";
                return;
            }

            localStorage.setItem("usuario", nuevoUsuario);
            localStorage.setItem("password", nuevoPassword);

            mensajeRegistro.style.color = "lightgreen";
            mensajeRegistro.textContent = "Registro exitoso 🎉";

            setTimeout(() => {
                mostrarLogin();
            }, 1500);
        });
    }

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const usuario = document.getElementById("usuario").value.trim();
            const password = document.getElementById("password").value.trim();
            const mensaje = document.getElementById("mensaje");

            const savedUser = localStorage.getItem("usuario");
            const savedPass = localStorage.getItem("password");

            if (usuario === savedUser && password === savedPass) {
                localStorage.setItem("logueado", "true");
                window.location.href = "index.html";
            } else {
                mensaje.style.color = "red";
                mensaje.textContent = "Datos incorrectos.";
            }
        });
    }

    const logoutBtn = document.getElementById("logout-btn");
    const modal = document.getElementById("logoutModal");
    const confirmLogout = document.getElementById("confirmLogout");
    const cancelLogout = document.getElementById("cancelLogout");

    if (logoutBtn && modal && confirmLogout && cancelLogout) {

        logoutBtn.addEventListener("click", () => {
            modal.classList.add("show");
        });

        function cerrarModal() {
            modal.classList.remove("show");
        }

        cancelLogout.addEventListener("click", cerrarModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) cerrarModal();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") cerrarModal();
        });

        confirmLogout.addEventListener("click", () => {
            localStorage.removeItem("logueado");
            window.location.href = "login.html";
        });
    }

});
