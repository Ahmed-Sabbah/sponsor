<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import Loader from '../../Loader.vue'
import Paginate from "vuejs-paginate-next"

const orphans = ref([])
const isLoading = ref(true)
const totlaItems = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)

const $toast = useToast()

const totalPages = computed(() => {
    return Math.ceil(totlaItems.value / itemsPerPage.value)
})

function handlePageClick(page) {
    isLoading.value = true
    axios.get('/index-api/orphans?page=' + page).then((response) => {
        orphans.value = response.data.data
        totlaItems.value = response.data.total_items
        isLoading.value = false
        currentPage.value = page
    }).catch((error) => {
        isLoading.value = false
        $toast.open({ message: 'يوجد مشكلة، حاول مرة أخرى', type: 'error', position: 'top-left' })
    })
}

onMounted(() => {
    handlePageClick(1)
})
</script>
<template>
    <Loader v-if="isLoading" />
    <div class="orphans-list" v-else>
        <div class="item" v-for="item in orphans" :key="item">
            <div class="item-img">
                <img :src="item.photo_file" alt="user" v-if="item.photo_file">
                <img src="@/assets/images/user-avatar.png" alt="user" v-else>
            </div>
            <div class="item-body">
                <h3 v-text="item.name"></h3>
            </div>
            <div class="item-footer">
                <router-link :to="{ name: 'admin.orphan', params: { id: item.id } }">مشاهدة التفاصيل</router-link>
            </div>
        </div>
    </div>
    <paginate :page-count="totalPages" :click-handler="handlePageClick" :prev-text="'السابق'" :next-text="'التالي'"
        :container-class="'pagination'" :page-class="'page-btn'" :prev-class="'prev-btn'" :next-class="'next-btn'"
        :active-class="'active'" :disabled-class="'disabled'" />
    <span class="pagination-pages">صفحة {{ currentPage }} من {{ totalPages }}</span>
</template>

<style>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
}

.pagination .page-btn,
.pagination .prev-btn,
.pagination .next-btn {
    margin: 0 5px;
    padding: 0;
    border: none;
    background-color: var(--main-green-color);
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.pagination .page-btn .page-link,
.pagination .prev-btn .page-link,
.pagination .next-btn .page-link,
.pagination .page-link {
    display: inline-block;
    padding: 10px 15px;
}

.pagination .page-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination .page-btn:hover:not(.disabled),
.pagination .prev-btn:hover:not(.disabled),
.pagination .next-btn:hover:not(.disabled) {
    background-color: var(--dark-green-color);
}

.pagination .page-btn.active {
    background-color: var(--dark-green-color);
    font-weight: bold;
}

.pagination .page-btn.active:hover {
    background-color: var(--main-green-color);
}

.pagination .disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination-pages {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    color: var(--main-red-color);
}
</style>