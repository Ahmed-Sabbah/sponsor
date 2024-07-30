<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import axios from 'axios'

const loading = ref(false)

const values = reactive({
    'username': '',
    'password': '',
})

const router = useRouter()

const $toast = useToast()

function login() {

    loading.value = true;
    
    axios.post('/index-api/login', values).then((response) => {

        if (response.data.status == 'success') {
            localStorage.setItem('token', response.data.token)
            $toast.open({ message: 'تم تسجيل الدخول بنجاح', type: 'success', position: 'top-left' })
            router.push({ name: 'admin.home' });
        } else {
            $toast.open({ message: 'تأكد من كتابة البيانات بشكل صحيح', type: 'error', position: 'top-left' })
        }

    }).catch((error) => {
        $toast.open({ message: 'يوجد مشكلة، حاول مرة أخرى', type: 'error', position: 'top-left' })
    }).finally(() => {
        loading.value = false;
    })
}
</script>
<template>
    <div class="login-page">
        <img class="logo" src="@/assets/images/logo.svg" alt="logo">
        <h3>تسجيل الدخول</h3>
        <p>سجل دخولك لتتمكن من الوصول إلى لوحة الإدارة</p>
        <form @submit.prevent="login()">
            <div class="input-group">
                <label><img src="@/assets/images/email.svg" alt="email"></label>
                <input type="text" name="username" placeholder="اسم المستخدم" v-model="values.username">
            </div>
            <div class="input-group">
                <label><img src="@/assets/images/lock.svg" alt="lock"></label>
                <input type="password" placeholder="كلمة المرور" v-model="values.password">
            </div>
            <button type="submit" class="loading" :disabled="loading">
                تسجيل الدخول <img src="@/assets/images/loading.gif" alt="loading" />
            </button>
        </form>
    </div>
</template>

<style>
@import '../assets/css/login.css';
</style>