<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Loader from '../../components/Loader.vue'

const route = useRoute()

const orphan = ref({})
// const orphanSponser = ref({})
const isLoading = ref(true)

function getGender(gender) {
    return gender == 'female' ? 'أنثى' : 'ذكر'
}

onMounted(() => {
    const id = route.params.id;
    axios.get('/index-api/orphans/' + id).then((response) => {
        orphan.value = response.data
        isLoading.value = false
    })
    // axios.get('/index-api/orphan-sponsers/' + id).then((result) => {
    //     orphanSponser.value = result.data
    // })
})

</script>
<template>
    <div class="content">
        <div class="page-navigation">
            <div class="nav">
                <span><router-link :to="{ name: 'admin.home' }">لوحة الإدارة</router-link></span>
                <span>/</span>
                <span class="active">تفاصيل اليتيم</span>
            </div>
        </div>
        <Loader v-if="isLoading" />
        <div class="orphan-form-data" v-else>
            <h2 class="title">بيانات استمارة اليتيم</h2>
            <div class="btn-group">
                <button type="button">تنزيل الاستمارة</button>
            </div>
            <div class="orphan-details details-box">
                <h4>بيانات اليتيم:</h4>
                <div class="data">
                    <p><b>اسم اليتيم رباعي:</b> {{ orphan.name }}</p>
                    <p><b>الجنس:</b> {{ getGender(orphan.gender) }}</p>
                    <p><b>رقم الهوية:</b> {{ orphan.id_num }}</p>
                    <p><b>تاريخ الميلاد:</b> {{ orphan.dob }}</p>
                    <p><b>الحالة الصحية:</b> {{ orphan.health_status ?? 'سليم' }}</p>
                    <!-- <p><b>المرحلة الدراسية:</b> ---</p> -->
                </div>
                <img :src="orphan.photo_file" alt="user" v-if="orphan.photo_file">
                <img src="@/assets/images/user-avatar.png" alt="user" v-else>
            </div>
            <!-- <div class="orphan-family details-box">
                <h4>بيانات أسرة اليتيم:</h4>
                <div class="data">
                    <p><b>اسم الشهيد:</b> ---</p>
                    <p><b>عدد الإخوة:</b> ---</p>
                    <p><b>ذكور:</b> ---</p>
                    <p><b>إناث:</b> ---</p>
                    <p><b>العنوان الأصلي:</b> ---</p>
                    <p><b>العنوان الحالي:</b> ---</p>
                    <p><b>رقم الهوية:</b> ---</p>
                    <p><b>الحالة المعيشية:</b> ---</p>
                </div>
            </div> -->
            <!-- <div class="orphan-responsible details-box">
                <h4>بيانات المسؤول عن اليتيم:</h4>
                <div class="data">
                    <p><b>الاسم رباعي:</b> ---</p>
                    <p><b>رقم الهوية:</b> ---</p>
                    <p><b>علاقته باليتيم:</b> ---</p>
                    <p><b>رقم الجوال:</b> ---</p>
                </div>
            </div> -->
            <div class="orphan-sponsor details-box" v-for="item in orphan.sponserings">
                <h4>بيانات الكافل:</h4>
                <div class="data">
                    <p><b>الاسم رباعي:</b> {{ item.sponser_name }}</p>
                    <p><b>الدولة:</b> {{ item.sponser_country }}</p>
                    <p><b>مبلغ الكفالة الشهري:</b> {{ item.amount }}</p>
                    <!-- <p><b>مدة الكفالة:</b> ---</p> -->
                    <p><b>تاريخ بداية الكفالة:</b> {{ item.first_payment_month }}</p>
                    <p><b>تاريخ نهاية الكفالة:</b> {{ item.last_payment_month }}</p>
                </div>
                <div class="sponsor-payments">
                    <h5>سجل الدفعات:</h5>
                    <div class="payments-history">
                        <div class="item" v-for="payment in item.sponsering_payments">
                            <p><b>المبلغ المدفوع:</b> {{ payment.amount }} <span>ريال</span></p>
                            <p><b>تاريخ الدفعة:</b> {{ payment.payment_date }}</p>
                            <!-- <img :src="payment.payment_photo" alt="payment_photo" width="250" height="300"> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>