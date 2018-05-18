<template>
 <div class="sideBar">
    <div class="author_info">
      <h4>作者</h4>
      <div class="info_name">
        <router-link :to="{name:'user',params:{author:info.loginname}}"> 
          <img :src="info.avatar_url" alt="">
          {{info.loginname}}
        </router-link>
      </div>
      <p class="score">积分：{{info.score}}</p>
    </div>
    <div class="recent_topics">
      <h4>最近话题</h4>
      <ul>
        <li v-for="topics in info.recent_topics"><router-link :to="{name:'content',params:{id:topics.id,author:topics.author.loginname}}">{{topics.title}}</router-link></li>
      </ul>
    </div>
    <div class="recent_replies">
      <h4>最近回复</h4>
      <ul>
        <li v-for="replies in info.recent_replies"><router-link :to="{name:'content',params:{id:replies.id,author:replies.author.loginname}}">{{replies.title}}</router-link></li>
      </ul>
    </div>
 </div>
</template>

<script>
  export default {
    data(){
      return {
        info:{}
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        var that = this;
        that.axios({
          method:"get",
          url:"https://cnodejs.org/api/v1/user/" + that.$route.params.author
        }).then(function(res){
          that.info = res.data.data;
        }).catch(function(err){
          console.log(err);
        })
      }
    },
	  //监控同级路由下复用附件，进行数据更新
		watch:{
      '$route' (to, from) {  
        this.getData(); 
      } 
    }
    
  }
</script>

<style scoped>
.sideBar{ float: right;width: 22%;margin-right: 10%;margin-top: 15px;border-radius: 3px;}
.sideBar ul,.sideBar li,.sideBar ol {list-style: none;}
.sideBar h4{ color: #666;font-size: 14px;font-weight: normal;background: #f5f5f5;padding: 10px}
.info_name{padding: 10px;color: #777;background: #fff;}
.info_name a{display: block;text-decoration: none;}
.info_name img{width: 48px;height: 48px;border-radius: 5px;vertical-align: middle;margin-right: 5px;}
.score{padding: 10px;font-size: 12px;background: #fff;}
.recent_replies ul{padding-bottom: 10px;}
.recent_replies ul li a{ display: block;padding: 10px;padding-bottom:0;color: #666;font-size: 14px;text-decoration: none;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break: break-all;}
.recent_topics ul{padding-bottom: 10px;}
.recent_topics ul li a{ display: block;padding: 10px;padding-bottom:0;color: #666;font-size: 14px;text-decoration: none;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break: break-all;}
.recent_topics,.recent_replies{margin-top: 10px;background: #fff;}
.recent_replies ul li a.router-link-active{ color: rgb(13, 172, 212)}
.recent_topics ul li a.router-link-active{ color: rgb(13, 172, 212)}
</style>
