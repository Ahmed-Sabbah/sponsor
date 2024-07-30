<script setup>
import Header from '../../components/admin/layout/Header.vue'
</script>
<template>
    <div class="admin-panel">
        <Header />
        <router-view></router-view>
    </div>
</template>
<style>
@import '../../assets/css/admin-panel.css';
</style>