<template>
    <div id="ratings" ref='ratingLayer'>
    	<div class="ratings-content" >
    		<div class="score-wrapper">
	    		<div class="score-l">
	    			<h3 class='title'>{{seller.score}}</h3>
	    			<p class='small-title'>综合评分</p>
	    			<p class='rank-rate'>高于周边商家{{seller.rankRate}}%</p>
	    		</div>
	    		<div class="score-r">
	    			<ul>
	    				<li class='score-list'>
	    					<span class="item-name">服务态度</span>
	    					<star class='star' :size='36' :score='seller.serviceScore'></star>
	    					<span class="score-item">{{seller.serviceScore}}</span>
	    				</li>
	    				<li class='score-list'>
	    					<span class="item-name">商品评分</span>
	    					<star class='star' :size='36' :score='seller.foodScore'></star>
	    					<span class='score-item'>{{seller.foodScore}}</span>
	    				</li>
	    				<li class='score-list'>
	    					<span class="item-name">送达时间</span>
	    					<span class='delivery-time'>{{seller.deliveryTime}}分钟</span>
	    				</li>
	    			</ul>
	    		</div>
	    	</div>
	    	<split></split>
	    	<div class="rating-wrapper">
				<ratingselect :select-type='selectType' :desc='desc' :only-content='onlyContent' :ratings='ratings'></ratingselect>
			</div>
			
			<div class="rating-list" >
				<ul v-show='ratings && ratings.length>0'>
					<li class="rating-item" v-for='rating in ratings'  v-show='needShow(rating.rateType,rating.text)'>
						<div class="avatar-wrapper">
							<img :src="rating.avatar" alt="" class='avatar' width='28' height='28'/>
						</div>
						<div class="rating-text">
							<div class="title">
								<span class="username">{{rating.username}}</span>
								<span class="rate-time">{{rating.rateTime | format}}</span>
							</div>
							<div class="star-wrapper">
								 <star :size='36' :score='rating.score' class='star'></star>
							     <span class='delivery-time' v-show='rating.deliveryTime'>{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">
								{{rating.text}}
							</p>
							<div class="footer">
								<span class='icon' :class="{'icon-smile': rating.rateType==0,'icon-sad':rating.rateType==1}"></span>
								<ul class="recommend-list">
									<li class="recommend-item" v-for='recommend in rating.recommend' v-show='rating.recommend'>
										{{recommend}}
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
				<div class="no-ratings" v-show='!ratings || ratings.length==0'></div>
			</div>
    	</div>
    </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
   @import "../../common/stylus/mixin.styl"
    #ratings
       position:absolute
       top:185px
       width:100%
       bottom:18px
       overflow:hidden
       .ratings-content
          width:100%
          .score-wrapper
              width:100%
              display:flex
              padding:18px 0
              .score-l
                 flex:0 0  130px
                 width:130px
                 text-align:center
                 border-right:1px solid rgba(7,17,27,0.1)
                 @media only screen and (max-width: 320px)
                    flex:0 0 110px
                    width:110px
                 .title
                    font-size:24px
                    color:rgb(255,153,0)
                    line-height:24px
                 .small-title
                    font-size:12px
                    color:rgb(7,17,27)
                    line-height:12px
                    margin-top:6px
                 .rank-rate
                    margin-top:8px
                    margin-bottom:6px
                    font-size:10px
                    color:rgba(7,17,27,0.5)
                    line-height:10px
              .score-r
                 flex:1
                 padding:0 24px
                 @media only screen and (max-width: 320px)
                    padding:0 6px
                 .score-list
                    font-size:0
                    .item-name
                      font-size:12px
                      color:rgb(7,17,27)
                      line-height:18px
                    .star
                      display:inline-block
                      margin:0 12px
                    .score-item
                      font-size:12px
                      color:rgb(255,153,0)
                      line-height:20px
                    .delivery-time
                      font-size:12px
                      color:rgb(147,153,159)
                      line-height:18px
                      margin-left:12px
          .rating-wrapper
             margin-top:18px
          .rating-list
             .rating-item
                display:flex
                padding:18px
                .avatar-wrapper
                    flex:0 0 28px
                    width:28px
                    margin-right: 12px
                    .avatar
                      border-radius:50%
                .rating-text
                    flex: 1
                    .title
                       overflow:hidden
                       .username
                          float:left
                          font-size:10px
                          color:rgb(7,17,27)
                          line-height:10px
                       .rate-time
                          float:right
                          font-size:10px
                          font-weight:200
                          color:rgb(147,153,159)
                          line-height:10px
                    .star-wrapper
                       margin-top:4px
                       .star
                          display:inline-block
                       .delivery-time
                          font-size: 10px
                          font-weight:200
                          color:rgb(147,153,159)
                          line-height:12px  
                    .text
                       margin-top:3px
                       font-size:12px
                       color:rgb(7,17,27)
                       line-height:18px
                    .footer
                       display:flex
                       .icon
                          font-size:12px
                          color:rgb(0,160,220)
                          line-height:12px
                          margin-right:8px
                          flex:0 0 12px
                          width:12px
                          margin-top:5px
                          &.icon-sad
                            color:rgb(183,187,191)
                       .recommend-list
                          flex:1
                          .recommend-item
                              float:left
                              border:1px solid rgba(7,17,27,0.1)
                              margin-right:8px
                              border-radius:1px
                              font-size:9px
                              color:rgb(147,153,159)
                              padding:0 6px
                              line-height:16px
                              height:16px
                              margin-top:3px
                              
</style>
<script type='text/ecmascript-6'>
   import star from 'components/star/star';
   import split from 'components/split/split';
   import BScroll from 'better-scroll';
   import {dateformat} from 'common/js/date.js';
   import ratingselect from 'components/ratingselect/ratingselect';
// const POSITIVE=0;
// const NEGATIVE=1;
    const ERR_NO=0;
    const ALL=2;
    export default{
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			star,
			ratingselect,
			split
		},
		data() {
        	return {
        		ratings: [],
        		selectType: ALL,
        		onlyContent: true,
        		desc: {
        			all: '全部',
        			positive: '满意',
        			negative: '不满意'
        		}
        	};
        },
        created() {
        	this.$http.get('/api/ratings').then((response) => {
		      response = response.body;
		      if (response.errno === ERR_NO) {
		        this.ratings = response.data;
//		        与dom相关的操作放在nextTick后
                this.$nextTick(() => {
		        	this._initScroll();
		        });
		      } 
        	});
        	this.$root.eventHub.$on('e_selectRating', this.e_selectRating);
        	this.$root.eventHub.$on('e_toggleSwitch', this.e_toggleSwitch);
      },
      beforeDestroy: function () {
			  this.$root.eventHub.$off('e_selectRating', this.e_selectRating);
			   this.$root.eventHub.$off('e_toggleSwitch', this.e_toggleSwitch);
	  },
	  filters: {
	  	format(time) {
        	let datetime=new Date(time);
        	return dateformat(datetime, 'yyyy-MM-dd  hh:mm');
        }
	  },
      methods: {
      	 _initScroll() {
      	 	this.scroll = new BScroll(this.$refs.ratingLayer, {
        		click: true
        	});
      	 },
      	 e_selectRating(type) {
        		this.selectType=type;
        		this.$nextTick(() => {
       	   				this.scroll.refresh();
       	   		});
        },
        e_toggleSwitch() {
        	   	this.onlyContent = !this.onlyContent;
        		this.$nextTick(() => {
       	   				this.scroll.refresh();
       	   		});
        },
        needShow(type, text) {
        		if(this.onlyContent && !text){
        			return false;
        		}
        		if(this.selectType===ALL){
        			return true;
        		}else{
        			return type===this.selectType;
        		}
        }
      }
    };
</script>
