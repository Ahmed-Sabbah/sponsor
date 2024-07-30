<script setup>
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
// import axios from 'axios'

const router = useRouter()

const $toast = useToast()

function logout() {
    localStorage.removeItem('token')
    $toast.open({ message: 'تم تسجيل الخروج بنجاح', type: 'success', position: 'top-left' })
    router.push({ name: 'login' })
    // axios.post('/api-logout').then((response) => {

    //     if (response.data.status == 'success') {
    //         localStorage.removeItem('token')
    //         $toast.open({ message: 'تم تسجيل الخروج بنجاح', type: 'success', position: 'top-left' })
    //         router.push({ name: 'login' })
    //     } else {
    //         $toast.open({ message: 'فشلت العملية', type: 'error', position: 'top-left' })
    //     }

    // }).catch((error) => {
    //     $toast.open({ message: 'يوجد مشكلة، حاول مرة أخرى', type: 'error', position: 'top-left' })
    // })
}
</script>
<template>
    <header>
        <div class="logo">
            <img src="@/assets/images/logo.svg" alt="logo">
            <h2>لوحة الإدارة</h2>
        </div>
        <div class="setting">
            <form @submit.prevent="logout()">
                <button type="submit">
                    <img src="@/assets/images/sign-out.svg" alt="sign-out"> تسجيل الخروج
                </button>
            </form>
        </div>
    </header>
</template>