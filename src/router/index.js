import Vue from 'vue'
import Router from 'vue-router'
import postList from '@/components/postList'
import Article from '@/components/Article'
import sideBar from '@/components/sideBar'
import userInfo from '@/components/userInfo'

Vue.use(Router);


export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'root',
      components:{
        'main':postList
      }
    },{
      path:'/topic/:id/:author',
      name:'content',
      components:{
        'main':Article,
        'sidebar':sideBar
      }
    },{
      path:'/user/:author',
      name:'user',
      components:{
        'main':userInfo,
        'sidebar':sideBar
      }
    }
  ]
})

