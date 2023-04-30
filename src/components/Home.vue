<script>
import { defineComponent, onBeforeMount, ref } from "vue"
import Card from 'primevue/card';
import 'primeicons/primeicons.css';
import axios from 'axios'
import { useToast } from 'primevue/usetoast';
import ProgressSpinner from 'primevue/progressspinner';

export default defineComponent({
    name: "Home",
    components: {
        Card,
        ProgressSpinner
    },
    setup() {
        const totalUser = ref(0);
        const toast = useToast();
        const isLoading = ref(true);
        onBeforeMount(() => {
            axios.get('http://localhost:8000/api/v1/get')
                .then(({data}) => {
                    totalUser.value = data.results.length;
                    isLoading.value = false;
                })
                .catch((error) => {
                    toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
                    isLoading.value = false;
                })
            })
        return {
            totalUser,
            isLoading
        }
    }
})
</script>

<template>
    <div v-if="!isLoading" class="card-container">
        <div>
            <h1>Dashboard for Patient Data</h1>
        </div>
        <div class="card">
            <div class="separator-card">
                <div class="content-card">
                    <div class="header-card">
                        <div>
                            {{ totalUser }}
                        </div>
                    </div>
                    <div class="body-card">
                        <div>
                            Total Patient
                        </div>
                    </div>
                </div>
                <i class="pi pi-users icon-card" />
            </div>
            <div class="footer-card" @click="$router.push({path:'/list'})">
                See All Patient
            </div>
        </div>
    </div>
    <div v-else class="page-loading">
        <ProgressSpinner />
    </div>
</template>

<style scoped>
.card-container {
    align-items: center;
}

h1 {
    padding-left: 15px;
}

.page-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.p-button {
    background: #1babe2 !important;
    border: 1px solid #1babe2 !important;
}

.p-sidebar-header {
    justify-content: flex-start;
    justify-content: space-between !important;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 100%;
    border-radius: 10px;
    margin: 20px 20px;
    box-shadow: 0 4px 8px 0 #7fc8e6, 0 6px 20px 0 #81d0f0;
    background-color: #33CDFF;
}

.footer-card {
    width: 100%;
    background-color: #2060a5;
    text-align: center;
    padding: 8px 0 8px 0;
    border-radius: 0 0 10px 10px;
    color: white;
    cursor: pointer;
}

.header-card {
    width: 100%;
    padding: 5px 0 0 15px;
    border-radius: 10px 10px 0 0;
    font-size: 40px;
}

.body-card {
    width: 100%;
    padding: 0 0 0 15px;
    font-size: medium;
}

.separator-card {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 10px;
}

.icon-card {
    font-size: 80px;
    padding: 0 15px 0 0;
    color: rgb(31, 31, 31);
    opacity: 70%;
}

.content-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}

.footer-card:hover {
    color: #33CDFF;
    transition: 0.5s;
}</style>