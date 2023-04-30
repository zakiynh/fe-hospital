<script>
import { defineComponent, ref, onUpdated, onMounted, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast';
import ProgressSpinner from 'primevue/progressspinner';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

export default defineComponent({
    name: "Editpatient",
    components: {
        ProgressSpinner,
        Dialog,
        InputText
    },
    props: {
        visible: {type: Boolean, default: false},
        data: {
            name: "",
            sex: "",
            religion: "",
            phone: "",
            address: "",
            nik: ""
        }
    },
    emits: ['closeEdit'],
    setup(props) {
        watch(() => props.data, () => {
            formInput.value.name = props.data.name
            formInput.value.sex = props.data.sex
            formInput.value.religion = props.data.religion
            formInput.value.phone = props.data.phone
            formInput.value.address = props.data.address
            formInput.value.nik = props.data.nik
        }),
        onUpdated(() => {
            formInput.value.name = props.data.name
            formInput.value.sex = props.data.sex
            formInput.value.religion = props.data.religion
            formInput.value.phone = props.data.phone
            formInput.value.address = props.data.address
            formInput.value.nik = props.data.nik
        })

        const toast = useToast();
        const isLoading = ref(true);
        const formInput = ref(props.data)
        function editPatient() {
            axios.post('http://localhost:8000/api/v1/put', formInput)
                .then(({data}) => {
                    toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                    visible.value = false;
                    isLoading.value = false;
                })
                .catch((error) => {
                    isLoading.value = false;
                    toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
                })
        }
        return {
            isLoading,
            editPatient,
            formInput
        }
    }
})
</script>

<template>
    <div>
        <Dialog v-model:visible="visible" modal header="Edit New Patient" :style="{ width: '45vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
            <form @submit.prevent="editPatient">
                <div class="flex gap-4 justify-content-center">
                    <div class="flex flex-column gap-2">
                        <div class="flex flex-wrap align-items-center gap-2 w-100">
                            <label for="name" class="p-sr-only">Name</label>
                            <InputText v-model="formInput.name" id="name" placeholder="name" />
                        </div>
                        <div class="flex flex-wrap align-items-center gap-2">
                            <label for="sex" class="p-sr-only">Sex</label>
                            <InputText v-model="formInput.sex" id="sex" placeholder="sex" />
                        </div>
                        <div class="flex flex-wrap align-items-center gap-2">
                            <label for="religion" class="p-sr-only">Religion</label>
                            <InputText v-model="formInput.religion" id="religion" placeholder="religion" />
                        </div>
                    </div>
                    <div class="flex flex-column gap-2">
                        <div class="flex flex-wrap align-items-center gap-2">
                            <label for="phone" class="p-sr-only">Phone</label>
                            <InputText v-model="formInput.phone" id="phone" placeholder="phone" />
                        </div>
                        <div class="flex flex-wrap align-items-center gap-2">
                            <label for="address" class="p-sr-only">Address</label>
                            <InputText v-model="formInput.address" id="address" placeholder="address" />
                        </div>
                        <div class="flex flex-wrap align-items-center gap-2">
                            <label for="nik" class="p-sr-only">NIK</label>
                            <InputText v-model="formInput.nik" id="nik" placeholder="nik" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-content-center gap-2">
                    <Button type="button" label="Cancel" size="small" icon="pi pi-times" class="mt-3" @click="$emit('closeEdit')" severity="danger"/>
                    <Button type="submit" label="Edit Patient" size="small" icon="pi pi-user-plus" class="mt-3" severity="info"/>
                </div>
            </form>
        </Dialog>
    </div>
</template>

<style scoped>
</style>