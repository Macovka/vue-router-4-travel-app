<template>
    <div id="nav">
        <AppLink to="/" id="logo">Travel App</AppLink>
        <AppLink 
            v-for="destination in destinations"
            :key="destination.id"
            :to="{name: 'destination.show', params:{slug: destination.slug}}"
        >
            {{ destination.name }}
        </AppLink>
        <AppLink :to="{name: 'protected'}">Dashboard</AppLink>
        <AppLink to="https://github.com/Macovka">GitHub Profile</AppLink>
    </div>
</template>

<script>
    import sourceData from '@/data.json'
    export default {
        data() {
            return {
                destinations: sourceData.destinations
            }
        }
    }
</script>