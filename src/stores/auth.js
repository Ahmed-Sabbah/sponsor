import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("user", () => {

    const authStatus = ref(false);

    function authCheck() {
        let token = localStorage.getItem("token");
        if (token) {
            authStatus.value = true
        } else {
            authStatus.value = false;
        }
    }

    return { authStatus, authCheck };
});