<template>
    <div class="postList">
        <ul>
            <li v-for='item in data'>
                <div class="flt">
                    <router-link to='' class="user_avatar"><img :src="item.author.avatar_url" /></router-link>
                    <span class="tag" :class="{'put_good':item.good, 'put_top': item.top}">{{item.tab}}</span>
                    <router-link :to="{name:'content',params:{id:item.id,author:item.author.loginname}}" class="topic_title">{{item.title}}</router-link>
                </div>
                <div class="frt">
                    <i class="time_box">{{item.last_reply_at | formatDate}}</i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                data:{}
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
                    url:'https://cnodejs.org/api/v1/topics'
                }).then(function(res){
                    that.data = res.data.data;
                    var obj = that.data;
                    console.log(obj)
                    for( var i = 0; i<that.data.length;i++){
                        var top = obj[i].top;
                        var good = obj[i].good;
                        var tag = obj[i].tab;
                        switch(tag){
                            case 'share':
                                obj[i].tab = '分享';
                            break;
                            case 'ask':
                                obj[i].tab = '问答';
                            break;
                            case 'job':
                                obj[i].tab = '招聘';
                            break;
                            case 'good':
                                obj[i].tab = '精华';
                            break;
                        }
                        if(top == true){
                            obj[i].tab = '置顶';
                        }
                        if(good == true){
                            obj[i].tab = '精华';
                        }
                    }
                    
                })
                .catch(function(err){
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>
    *{margin: 0;padding: 0;}
    .postList{border-radius:3px;width: 90%;margin: 15px auto;min-height: 400px; background: #fff;}
    ul,ol,li{list-style: none;}
    .postList ul li{padding: 10px;overflow: hidden; border-top: 1px solid #ddd;}
    .postList ul li:first-child{border-top: 0;}
    .postList ul li a,.postList ul li i,.postList ul li span{display: inline-block;vertical-align: middle; font-style: normal;}
    .postList ul li:hover{ background: #f9f9f9}
    .flt{ float: left; width: 85%;}
    .user_avatar{width: 30px;height: 30px; overflow: hidden;border-radius: 2px;margin-right: 5px}
    .user_avatar img{width: 30px;height: 30px;}
    .visit_box{font-size: 14px; color: #ccc;}
    .visit_box .reply{color:#9e78c0; margin-right: 2px}
    .visit_box .click{margin-left: 3px; font-size: 12px}
    .tag{background: #e5e5e5;font-size: 12px; padding:2px 4px;color: #999;border-radius: 2px;margin-left: 5px;margin-right: 5px}
    .topic_title{ color: #333; font-size: 16px;text-decoration: none;max-width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .topic_title:hover{text-decoration: underline;}
    .topic_title:visited{color: #666;}
    .frt{float: right;width: 15%; text-align: right;}
    .replyer_img{ width: 16px;height: 16px;overflow: hidden;border-radius: 2px;margin-right: 3px}
    .replyer_img img{width: 16px;height: 16px;}
    .time_box{color: #778087;font-size: 12px;}
    .put_good,.put_top{background: #80bd01;color: #fff;}
</style>
