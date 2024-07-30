<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import Loader from '../../Loader.vue'

const orphans = ref([])
const isLoading = ref(true)
const totlaItems = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const pageRange = ref(2)

const $toast = useToast()

const totalPages = computed(() => {
    return Math.ceil(totlaItems.value / itemsPerPage.value)
})

const paginatedRange = computed(() => {
    const start = Math.max(2, currentPage.value - pageRange.value);
    const end = Math.min(totalPages.value - 1, currentPage.value + pageRange.value);
    const range = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
})

const shouldShowFirst = computed(() => {
    return currentPage.value > pageRange.value + 1;
})
const shouldShowLeftEllipsis = computed(() => {
    return currentPage.value > pageRange.value + 2;
})
const shouldShowRightEllipsis = computed(() => {
    return currentPage.value < totalPages.value - pageRange.value - 1;
})
const shouldShowLast = computed(() => {
    return currentPage.value < totalPages.value - pageRange.value;
})

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
    axios.get('/index-api/orphans?page=' + currentPage.value).then((response) => {
        orphans.value = response.data.data
        totlaItems.value = response.data.total_items
        isLoading.value = false
    }).catch((error) => {
        isLoading.value = false
        $toast.open({ message: 'يوجد مشكلة، حاول مرة أخرى', type: 'error', position: 'top-left' })
    })
}
function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
    axios.get('/index-api/orphans?page=' + currentPage.value).then((response) => {
        orphans.value = response.data.data
        totlaItems.value = response.data.total_items
        isLoading.value = false
    }).catch((error) => {
        isLoading.value = false
        $toast.open({ message: 'يوجد مشكلة، حاول مرة أخرى', type: 'error', position: 'top-left' })
    })
}
function goToPage(page) {
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
    axios.get('/index-api/orphans').then((response) => {
        orphans.value = response.data.data
        totlaItems.value = response.data.total_items
        isLoading.value = false
    }).catch((error) => {
        isLoading.value = false
        $toast.open({ message: 'يوجد مشكلة، حاول مرة أخرى', type: 'error', position: 'top-left' })
    })
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
    <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1" class="page-btn">السابق</button>

        <button v-if="shouldShowFirst" @click="goToPage(1)" class="page-btn">1</button>
        <span v-if="shouldShowLeftEllipsis" class="ellipsis">...</span>
        <button v-for="page in paginatedRange" :key="page" @click="goToPage(page)"
            :class="['page-btn', { active: currentPage === page }]">
            {{ page }}
        </button>
        <span v-if="shouldShowRightEllipsis" class="ellipsis">...</span>
        <button v-if="shouldShowLast" @click="goToPage(totalPages)" class="page-btn">{{ totalPages }}</button>

        <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">التالي</button>
        <span>صفحة {{ currentPage }} من {{ totalPages }}</span>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
}

.page-btn {
    margin: 0 5px;
    padding: 10px 15px;
    border: none;
    background-color: var(--main-green-color);
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.page-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.page-btn:hover:not(:disabled) {
    background-color: var(--dark-green-color);
}

.page-btn.active {
    background-color: var(--dark-green-color);
    font-weight: bold;
}

.page-btn.active:hover {
    background-color: var(--main-green-color);
}

.ellipsis {
    margin: 0 5px;
}
</style>