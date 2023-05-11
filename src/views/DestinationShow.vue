<template>
    <div>
        <section v-if="destination" class="destination">
            <h1>{{ destination.name }}</h1>
            <go-back></go-back>
            <div class="destination-details">
                <img :src="`/images/${destination.image}`" :alt="destination.name">
                <p>{{ destination.description }}</p>
            </div>
        </section>
        <section class="experiences">
            <h2>Top Experiences in {{ destination.name }}</h2>
            <div class="cards">
                <AppLink
                    v-for="experience in destination.experiences"
                    :key="experience.slug"
                    :to="{name: 'experience.show', params: {experienceSlug: experience.slug}}"
                >
                    <ExperienceCard    
                        :experience="experience"
                    />
                </AppLink>           
            </div>  
            <router-view />
        </section>
    </div>
</template>

<script>
    import sourceData from '@/data.json'
    import ExperienceCard from '@/components/ExperienceCard.vue'
    import GoBack from '@/components/GoBack.vue'

    export default {
        components: { ExperienceCard, GoBack},
        /*data() {
            return {
                destination: null
            }
        },*/
        props: {
            slug: {type: String, required: true}
        },
        computed: {
            /*destinationSlug() {
                return this.$route.params.slug
            },*/
            destination() {
                return sourceData.destinations.find(destination => destination.slug === this.slug)
            }
        },
        /*methods: {
            async initData() {
                const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}.json`)
                this.destination = await response.json()
            }
        },
        async created() {
            this.initData()
            //this.$watch(() =>  this.$route.params,this.initData)
        }*/
    }
</script>