<template>
  <div class='app'>
     <v-header :seller='seller'></v-header>
    <div class="tab-menu border-1px">
      <div class="tab-item"><router-link to="/goods" class='path'>商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings" class='path'>评论</router-link></div>
      <div class="tab-item"><router-link to="/seller" class='path'>商家</router-link></div>
    </div>
    <div class="tab-content">
    	<keep-alive>
    		<router-view :seller='seller'></router-view>
    	</keep-alive>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import {urlParse} from 'common/js/utils.js';
import header from './components/header/header';
const ERR_NO = 0;
export default {
  data() {
     return {
      seller: {
      	id: (() => {
      		let queryParam=urlParse();
      		return queryParam.id;
      	})()
      }
     };
  },
  created() {
    this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
      response = response.body;
      if (response.errno === ERR_NO) {
        this.seller = Object.assign({}, this.seller, response.data);
      }
    });
//  node js的express与后台数据交换
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
   @import "./common/stylus/mixin.styl"
   .app
     .tab-menu
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        border-1px(rgba(7,17,27,0.1))
        .tab-item
          flex: 1
          text-align: center
          .path
            font: 14px Arial, sans-serif;
            color: rgb(77,85,93)
          .active
            color: rgb(240,20,20)
    
</style>
