<script>
import { defineComponent, ref, onBeforeMount } from "vue"
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import axios from 'axios'
import { useToast } from 'primevue/usetoast';
import ProgressSpinner from 'primevue/progressspinner';
import DeleteModal from './DeleteModal.vue'
import AddPatient from "./AddPatient.vue";
import EditPatient from "./EditPatient.vue";

export default defineComponent({
    name: "ListPatient",
    components: {
        TreeTable,
        Column,
        ProgressSpinner,
        DeleteModal,
        AddPatient,
        EditPatient
    },
    setup() {
        const patientList = ref([])
        const toast = useToast();
        const isLoading = ref(true);
        onBeforeMount(() => {
            axios.get('http://localhost:8000/api/v1/get')
                .then(({data}) => {
                    isLoading.value = false;
                    patientList.value = data.results.map((pat, i) => {
                        return {
                            "key": i+1,
                            "data": {
                                "id": pat.id,
                                "name": pat.name,
                                "sex": pat.sex,
                                "religion": pat.religion,
                                "phone": pat.phone,
                                "address": pat.address,
                                "nik": pat.nik
                            },
                        }
                    })
                })
                .catch((error) => {
                    isLoading.value = false;
                    toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
                })
            })
        function edit(aaa, bbb) {
            // console.log(aaa, bbb, selectedKey.value);
            axios.get('http://localhost:8000/api/v1/get/' + bbb.id)
                .then(({data}) => {
                    console.log("data: ", data.results);
                    data.value = data.results
                    visibleEdit.value = true;
                })
        }
        const selectedKey = ref(null);
        const id = ref(null);
        const name = ref(null)
        const visible = ref(false);
        const visibleForm = ref(false);
        const visibleEdit = ref(false);
        const data = ref(
            {
            name: "",
            sex: "",
            religion: "",
            phone: "",
            address: "",
            nik: ""
        }
        );
        function deletePatient(key, data) {
            id.value = data.id;
            name.value = data.name;
            visible.value = true;
        }
        function closeModal() {
            visible.value = false;
        }
        function addForm() {
            visibleForm.value = true;
        }
        function closeAdd() {
            visibleForm.value = false;
        }
        function visibleFormEdit() {
            visibleEdit.value = false;
        }

        return {
            patientList,
            edit,
            selectedKey,
            isLoading,
            name,
            id,
            visible,
            deletePatient,
            closeModal,
            addForm,
            visibleForm,
            closeAdd,
            visibleFormEdit,
            visibleEdit,
            data,
        }
    }
})
</script>

<template>
    <div v-if="!isLoading" class="card" style="margin-top: 50px; padding: 0 20px 0 20px;">
        <TreeTable :value="patientList">
            <template #header>
                <div class="flex justify-content-between w-100">
                    <div class="text-xl font-bold">File Viewer</div>
                    <Button label="Add Patient" @click="addForm" icon="pi pi-user-plus" size="small" severity="info"/>
                </div>
            </template>
            <Column field="id" header="ID" columnResizeMode="fit"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="sex" header="Sex"></Column>
            <Column field="religion" header="Religion"></Column>
            <Column field="phone" header="Phone"></Column>
            <Column field="address" header="Address"></Column>
            <Column field="nik" header="NIK"></Column>
            <Column headerStyle="width: 10rem">
                <template #body="slotProps">
                    <div class="button-wrapper">
                        <Button type="button" icon="pi pi-trash" rounded severity="danger" @click="deletePatient(slotProps.node.key, slotProps.node.data)"/>
                        <Button type="button" icon="pi pi-pencil" rounded severity="success" @click="edit(slotProps.node.key, slotProps.node.data)" />
                    </div>
                </template>
            </Column>
        </TreeTable>
    </div>
    <div v-else class="page-loading">
        <ProgressSpinner />
    </div>
    <DeleteModal :id="id" :name="name" :visible="visible" @closeModal="closeModal"/>
    <AddPatient :visible="visibleForm" @closeAdd="closeAdd"/>
    <EditPatient :visible="visibleEdit" @closeEdit="visibleFormEdit" :data="data"/>
</template>

<style scoped>
    .button-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .page-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>