<script>
import { defineComponent } from "vue"
import { ref } from "vue";
import Menubar from 'primevue/menubar';

export default defineComponent({
    name: "SideBar",
    components: {
        Menubar
    },
    setup() {
        const visible = ref(false);
        return {
            visible
        }
    }
})
</script>

<template>
    <div>
        <Sidebar v-model:visible="visible">
            <hr />
            
            <div style="display: flex; align-items: center; gap: 15px; padding: 25px 0 0 8px; cursor: pointer;" @click="$router.push({path:'/'})">
                <i class="pi pi-server" style="font-size: 25px;"/>
                <span style="font-weight: bold; font-size: 20px;">Dashboard</span>
            </div>
            <div style="display: flex; align-items: center; gap: 15px; padding: 25px 0 0 8px; cursor: pointer;" @click="$router.push({path:'/list'})">
                <i class="pi pi-users" style="font-size: 25px;"/>
                <span style="font-weight: bold; font-size: 20px;">List Patient</span>
            </div>

            <template #header>
                <div style="display: flex; justify-content: space-between; gap: 10px; align-items: center; padding-right: 20px;">
                    <img alt="logo" src="../assets/3262677.png" height="50" class="mr-2" style="border: 1px solid #1babe2; border-radius: 100%;"/>
                    <h2>Hospital-CMS</h2>
                </div>
            </template>
        </Sidebar>
        <!-- <Button icon="pi pi-arrow-right" @click="visible = true" /> -->
        <Menubar>
            <template #start>
                <div style="cursor: pointer;">
                    <i class="pi pi-bars" style="font-size: 25px; padding: 5px;" @click="visible = true"/>
                </div>
            </template>
            <template #end>
                <img alt="logo" src="../assets/logo_header.svg" height="40" class="mr-2" />
            </template>
        </Menubar>
        <slot />
    </div>
</template>

<style scoped>
    .p-button {
        background: #1babe2 !important;
        border: 1px solid #1babe2 !important;
    };
    :deep(Sidebar.p-sidebar-header) {
        background-color: black !important;
        justify-content: space-between !important;
    };
    .dashboard-title {
        width: 100%;
        text-align: left;
        margin-right: 100px;
    }
</style>