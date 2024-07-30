<script setup>
import OrphansList from '../../components/admin/pages/OrphansList.vue'
</script>
<template>
    <div class="content">
        <div class="page-navigation">
            <div class="nav">
                <span>لوحة الإدارة</span>
                <span>/</span>
                <span class="active">الرئيسية</span>
            </div>
        </div>
        <!-- <div class="profile">
            <div class="user">
                <img src="@/assets/images/user-6.jpg" alt="user">
                <div class="user-info">
                    <h3>صالح الجعفراوي</h3>
                    <p>مرحباً بك</p>
                </div>
            </div>
        </div> -->
        <div class="orphans">
            <h2 class="title">قائمة المكفولين</h2>
            <OrphansList />
        </div>
    </div>
</template>