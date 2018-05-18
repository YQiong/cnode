<template>
  <div class="Article">
    <div id="content">
      <div class="topic_head">
        <h3><span v-if="post.top" class="tag">置顶</span><span v-if="post.good" class="tag">精华</span>{{post.title}}</h3>
        <div class="changes">
          <span>● 发布于 {{ post.create_at | formatDate }}</span>
          <span>● 作者 {{post.author.loginname}}</span>
          <span>● {{post.visit_count}} 次浏览</span>
          <span>● 来自 {{post.tab}}</span>
        </div>
      </div>
      <div class="topic_content" v-html="post.content"></div>
      <div class="reply_box">
        <div class="reply_title">{{post.reply_count}} 回复</div>
        <div class="reply_list">
          <div class="item" v-for="(item,index) in post.replies">
            <div class="reply_info">
              <span class="avatar"><router-link :to="{name:'user',params:{author:item.author.loginname}}"><img :src="item.author.avatar_url" alt=""></router-link></span>
              <span class="loginname"><router-link :to="{name:'user',params:{author:item.author.loginname}}">{{item.author.loginname}}</router-link></span>
              <span class="create_time">{{index+1}}楼 ● {{item.create_at | formatDate}}</span>
            </div>
            <div class="reply_content" v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        post:{
          author: {
            loginname: 'temp'//设置默认值，防止Vue在axios未被调用前报错
          }
        }
      }
    },
    mounted(){
      this.getData()
      
    },
    methods:{
      getData(){
        var that = this;
       that.axios({
          method:'get',
          url:'https://cnodejs.org/api/v1/topic/'+ that.$route.params.id
        }).then(function(res){
          that.post = res.data.data;
          //console.log(that.post)
          var type = that.post.tab;
          switch(type){
            case "ask" :
              that.post.tab = "问答"
            break;
            case "share" :
              that.post.tab =  "分享"
            break;
            case "job" :
              that.post.tab =  "招聘"
            break;
            case "good" :
              that.post.tab =  "精华"
            break;
          }
        })
        .catch(function(err){
            console.log(err);
        });
      }
    },
	  //监控同级路由下复用附件，进行数据更新
		watch:{
      '$route' :'getData'
      /*
      '$route' (to, from) {  
        this.getData(); 
      } 
       */
       /*
       $route(){
				this.getData();
			}
        */
		}
  }
</script>

<style>

  @import url("../assets/markdown-github.css");
  .Article{width: 55%;float: left;margin-left: 10%;margin-top: 15px;border-radius: 3px;}
  .topic_head{border-bottom: 1px solid #ccc;padding: 10px;background: #fff;}
  .changes{color: #838383;font-size: 12px;margin-top: 10px;}
  .changes span{ margin-right:10px;}
  .tag{background: #80bd01;padding:2px 4px; color:#fff;font-size: 12px;border-radius: 3px;vertical-align: middle;margin-right: 5px;}
  .topic_content{padding: 10px;background: #fff;}
  #content p{ font-size: 14px; color: #333}
  #content h3{font-size: 22px;line-height: 22px;margin: 0;padding: 0;}
  .reply_box{margin-top: 10px;background: #fff;}
  .reply_title{ padding: 10px;background: #f5f5f5;font-size: 12px;color: #666}
  .reply_list .item{border-bottom: 1px solid #eee;padding: 10px;}
  .reply_info span{ display: inline-block; vertical-align: middle;font-size: 12px}
  .reply_info .avatar{ width: 30px;height: 30px;border-radius: 3px;overflow: hidden;}
  .reply_info .avatar img{width: 100%; height: 100%}
  .reply_info .loginname{ font-weight: bold;color: #666}
  .reply_content{padding-left: 50px}
  .reply_info .create_time{color: #08c}
</style>
