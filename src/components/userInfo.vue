<template>
 <div class="userinfo">
 111
    <h4>个人中心</h4>
    <div class="infoBox">
      <div class="info_name">
        <img :src="info.avatar_url" alt="">
        {{info.loginname}}
      </div>
      <p class="score">
        积分：{{info.score}}
      </p>
      <p class="git">
        GitHub：
        <a :href="gitUrl + info.githubUsername" target="_blank">
          {{info.githubUsername}}
        </a>
      </p>
      <p class="create_time">
        注册时间 {{info.create_at | formatDate}}
      </p>
    </div>
    <div class="recent_topics">
      <h4>最近创建的话题</h4>
      <ul>
        <li v-for="item in info.recent_topics">
          <router-link :to="{name:'content',params:{id:item.id,author:item.author.loginname}}">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <h4>最近参与的话题</h4>
      <ul>
        <li v-for="item in info.recent_replies">
          <router-link :to="{name:'content',params:{id:item.id,author:item.author.loginname}}">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
 </div>
</template>

<script>
  export default {
    data () {
      return {
        info:{},
        gitUrl:"https://github.com/"
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData(){
        var that = this;
        that.axios({
          method:"get",
          url:"https://cnodejs.org/api/v1/user/" + that.$route.params.author
        }).then(function(res){
          that.info = res.data.data;
          console.log(res.data.data)
        }).catch(function(err){
          console.log(err)
        })
      }
    }
  }
</script>

<style>
  ul,ol,li{list-style: none;padding: 0;margin: 0;}
  .userinfo{width: 55%;float: left;margin-left: 10%;margin-top: 15px;border-radius: 3px;}
  .userinfo h4{padding: 10px;background: #f5f5f5;color: #666;font-size: 12px;font-weight: normal}
  .infoBox{ background: #fff;padding: 10px;}
  .infoBox .info_name{color: #999;}
  .infoBox .info_name img{ vertical-align: middle;margin-right: 5px;width: 60px;height: 60px;border-radius: 3px}
  .infoBox .score{padding-top: 10px;font-size: 12px; color: #999;}
  .infoBox .git{padding-top: 10px;color: #333; font-size: 12px;}
  .infoBox .git a{ color: #12bff3;text-decoration: none}
  .create_time{font-size: 12px; color: #666;padding-top: 10px;}
  .recent_topics,.recent_replies{margin-top: 10px;background: #fff;}
  .recent_topics h4,.recent_replies h4{padding: 10px;background: #f5f5f5;color: #666;font-size: 12px;font-weight: normal}
  .recent_topics ul li,.recent_replies ul li{padding-top:10px;padding: 10px;border-top: 1px solid #f5f5f5;}
  .recent_topics ul li a,.recent_replies ul li a{ text-decoration: none;color: #333;font-size: 13px}
  .recent_topics ul li a:hover,.recent_replies ul li a:hover{color: #12bff3}
  .recent_topics ul li a:visited,.recent_replies ul li a:visited{color:#ccc}
</style>
