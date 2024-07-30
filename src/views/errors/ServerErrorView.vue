<script setup>
import { useAuthUserStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const store = useAuthUserStore();
const { authStatus } = storeToRefs(store);
const { authCheck } = store;
authCheck();
</script>
<template>
    <div class="error_page">
        <section class="error">
            <h1 class="error-title">مشكلة في الخادم</h1>
            <router-link :to="{ name: 'admin.home' }" v-if="authStatus">الرجوع إلى الرئيسية</router-link>
            <router-link :to="{ name: 'landing' }" v-else>الرجوع إلى الرئيسية</router-link>
        </section>
    </div>
</template>

<style scoped>
.error_page {
    width: 100%;
    height: 100vh;
    background-color: var(--light-gray-color);
    padding: 50px 0;
}

.error_page .error {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.error_page .error .error-title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--main-red-color);
    text-align: center;
    border-bottom: 1px solid var(--dark-gray-color);
}

.error_page .error a {
    color: var(--main-green-color)
}

@media only screen and (max-width: 600px) {

    .error_page .error {
        padding: 0 30px;
    }
}
</style>