<script>
import { defineComponent, ref } from "vue"
import axios from 'axios'
import { useToast } from 'primevue/usetoast';
import ProgressSpinner from 'primevue/progressspinner';
import Dialog from 'primevue/dialog';

export default defineComponent({
    name: "DeleteModal",
    components: {
        ProgressSpinner,
        Dialog
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        }
    },
    emits: ['closeModal'],
    setup(props) {
        const toast = useToast();
        const isLoading = ref(true);
        const deletePatient = (id) => {
            axios.delete(`http://localhost:8000/api/v1/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'mode': 'no-cors'
                }
            })
                .then(({data}) => {
                    toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                    isLoading.value = false;
                    $router.push({path:'/list'})
                })
                .catch((error) => {
                    toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
                    isLoading.value = false;
                })
        }
        return {
            isLoading,
            deletePatient,
        }
    }
})
</script>

<template>
    <div class="card flex justify-content-center">
        <Dialog v-model:visible="visible" modal header="Are You Sure?" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }" >
            <p>Are you sure you want to delete <b>{{ name }}</b>?</p>
            <div class="button-del">
                <button type="button" class="p-button p-button-secondary" @click="$emit('closeModal')">Cancel</button>
                <button type="button" class="p-button p-button-danger" @click="deletePatient(id)">Yes</button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
    .button-del {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .p-dialog-header-icons {
        display: none !important;
    }

    .p-dialog-header-close-icon {
        display: none !important;
    }

    .p-dialog-titlebar-close {
        display: none !important;
    }
</style>