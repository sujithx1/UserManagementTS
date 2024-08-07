"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.getElementById('login-form').addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    console.log(email);
    messageDiv.classList.remove('error');
    messageDiv.textContent = '';
    // Frontend validation
    if (!email || !password) {
        messageDiv.classList.add('error');
        messageDiv.textContent = 'All fields are required.';
        return;
    }
    try {
        const response = yield fetch('/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = yield response.json();
        if (response.ok) {
            window.location.href = '/admin/dashboard';
        }
        else {
            messageDiv.classList.add('error');
            messageDiv.textContent = data.msg || 'Login failed!';
        }
    }
    catch (error) {
        console.error('Error:', error);
        messageDiv.classList.add('error');
        messageDiv.textContent = 'An error occurred. Please try again.';
    }
}));
