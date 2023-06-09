import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import sourceData from '@/data.json'

const routes = [
    {path: '/', name: 'Home', component: Home},
    {
        path: '/protected', 
        name: 'protected', 
        component: () => import('@/views/Protected.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/invoices',
        name: 'invoices',
        component: () => import('@/views/Invoices.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/destination/:slug', 
        name: 'destination.show', 
        component: () => import('@/views/DestinationShow.vue'),
        props: route => ({...route.params}),
        beforeEnter(to, from) {
            const exist = sourceData.destinations.find(
                destination => destination.slug === to.params.slug
            )
            if (!exist) return {
                name: 'NotFound',
                params: {pathMatch: to.path.split('/').slice(1)},
                quert: to.query,
                hash: to.hash,
                
            }
        },
        children: [{
            path: ':experienceSlug',
            name: 'experience.show',
            component: () => import('@/views/ExperienceShow.vue'),
            props: route => ({...route.params})
        }]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue')
    }    
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        return savedPosition || new Promise((resolve) => {
            setTimeout(() => resolve({top: 0, behavior: 'smooth'}), 300)
        })
    }
})
router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && !window.user) {
        return { name: 'login', query: {redirect: to.fullPath}}
    }
})
export default router