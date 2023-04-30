<script setup>
import SideBar from './components/sidebar.vue'
</script>

<template>
    <div>
        <!-- <SideBar /> -->
        <component :is="$route.meta.layout || 'div'">
            <router-view />
        </component>
        <Toast />
        
    </div>
</template>
