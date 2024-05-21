document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementsByName("username")[0];
    const passwordInput = document.getElementsByName("password")[0];
    const form = document.querySelector(".form");
    const loginButton = document.querySelector("button[type='submit']");
    const loading = document.querySelector(".loading");
    let username, password;

    init();

    async function init() {
        loginButton.disabled = true;
        loading.style.display = "block";

        try {
            const products = await login();
            render(products); // Предполагается, что у вас есть функция render
        } catch (err) {
            console.error(err);
        } finally {
            loading.style.display = "none";
        }

        redirect();
    }

    usernameInput.oninput = function(event) {
        username = event.target.value.trim();
        toggleButton();
    };

    passwordInput.oninput = function(event) {
        password = event.target.value.trim();
        toggleButton();
    };

    form.onsubmit = async function(event) {
        event.preventDefault();

        try {
            const result = await login();
            saveToken(result.token);
            resetInputValues();
            redirect();
        } catch (err) {
            console.error(err);
        }
    };

    function toggleButton() {
        loginButton.disabled = !(username && password);
    }

    async function login() {
        const response = await fetch("https://fakestoreapi.com/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Ошибка сети");
        }

        const result = await response.json();
        return result;
    }

    function saveToken(token) {
        localStorage.setItem("token", token);
    }

    function redirect() {
        const token = localStorage.getItem("token");

        if (token) {
            window.location.href = "/index.html";
        }
    }

    function resetInputValues() {
        usernameInput.value = "";
        passwordInput.value = "";
        username = "";
        password = "";
    }
});
