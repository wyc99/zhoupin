<template>
	<transition name='rslide'>
		<div class='food' v-show='showFlag' ref='foodlayer'>
			<div class="container">
				<div class="img-container">
					<img :src="curFood.image" alt="食物照片" class='banner' />
					<div class="back">
						<i class="icon-circle-left" @click='hide'></i>
					</div>
				</div>
				<div class="food-desc">
					<h3 class='title'>{{curFood.name}}</h3>
					<div class="extra">
						<span class='sell'>月售{{curFood.sellCount}}份</span>
						<span class='rating'>好评率{{curFood.rating}}%</span>
						<p class='price'>
							<span class='nowprice'>￥{{curFood.price}}</span>
							<span class='oldprice' v-show='curFood.oldPrice'>￥{{curFood.oldPrice}}</span>
						</p>
					</div>
					<div class="cartcontrol-wrapper" v-show='curFood.count>0'>
						<cartcontrol :food='curFood'></cartcontrol>
					</div>
					<div class="addbtn" v-show='curFood.count===0 || !curFood.count' @click='addFood($event)'>
						<span>加入购物车</span>
					</div>

				</div>
				<split v-show='curFood.info'></split>
				<div class="food-info" v-show='curFood.info'>
					
					<h3 class='title'>商品介绍</h3>
					<p class='text'>{{curFood.info}}</p>

				</div>
				<split></split>
				<div class="food-ratings">
					<h3 class='title'>商品评论</h3>
				    <div class="rating-wrapper">
				    	<ratingselect :select-type='selectType' :desc='desc' :only-content='onlyContent' :ratings='curFood.ratings'></ratingselect>
				    </div>
				    <div class="rating-content">
			        	<ul class='rating-list' v-show='curFood.ratings && curFood.ratings.length>0' >
			        		<li v-for='rating in curFood.ratings' class='rating-item'  v-show='needShow(rating.rateType,rating.text)'>
			        				<div class="title">
			        					<span class='rate-time'>{{rating.rateTime | format}}</span>
			        					<span class="rate-user">
			        						<span class="username">{{rating.username}}</span>
			        						<img :src="rating.avatar" alt="" class="avatar" width='12' height='12'/>
			        					</span>
			        				</div>
			        				<p class="text"><span class='icon' :class="{'icon-smile': rating.rateType==0,'icon-sad':rating.rateType==1}"></span>{{rating.text}}</p>
			        		</li>
			        	</ul>
		        		<div class="no-ratings" v-show='!curFood.ratings || curFood.ratings.length==0'></div>
		        	</div>
				</div>
			</div>

		</div>
	</transition>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
     @import "../../common/stylus/mixin.styl"
     @import "../../common/stylus/fonts.styl"
    .food
      position:fixed
      bottom:48px
      left:0
      top:0
      background:#fff
      z-index:30
      width:100%
      overflow:hidden
      transition:all 0.5s linear
      &.rslide-enter, &.rslide-leave-active
         transform: translate3D(100%,0,0)
      &.rslide-enter-active, &.rslide-leave
         transform: translate3D(0,0,0)
      /*构建一个正方形的容器*/
      .img-container
         position:relative
         width:100%
         /*padding-top的百分比参照自身width*/
         padding-top:100%
         height:0
         .banner
           position:absolute
           left:0
           top:0
           width:100%
           height:100%
         .back
           position:absolute
           left:10px
           top:10px
           .icon-circle-left
              font-size:20px
              color:white
      .food-desc
          padding:18px
          position:relative
          .title
             font-size:14px
             font-weight:700
             color:rgb(7,17,27)
             line-height:14px
          .extra
             margin-top:8px
             font-size:0
             .sell,.rating
               font-size: 10px
               color:rgb(147,153,159)
               line-height:10px
               margin-right:12px
             .price
               margin-top:18px
	           .nowprice
	              margin-right:8px
	              font-weight:bold
	              color:rgb(240, 20, 20)
	              font-size:14px
	           .oldprice
	              font-size:10px
	              color:rgb(147,153,159)
	              font-weight:bold
	              line-height:24px
	              text-decoration:line-through  
	      .cartcontrol-wrapper,.addbtn
	         position:absolute
	         right:18px
	         bottom:18px
	      .addbtn   
	         padding:6px 12px
	         background-color:rgb(0,160,220)
	         border-radius:12px
	         span
	           font-size:10px
	           color:white
	  .food-info
	      padding:18px
	      .title
	         font-size:14px
	         font-weight:500
	         color:rgb(7,17,27)
	         line-height:14px
	      .text
	         margin-top:6px
	         font-size:12px
	         color:rgb(147,153,159)
	         line-height:24px
	         font-weight:200
	         padding:0 8px
	  .food-ratings
         .title
         	font-size:14px
         	padding:18px
         	font-weight:500
         	color:rgb(7,17,27)
         	line-height:14px
         .rating-content
            margin:0 18px
            .rating-item
               padding:16px 0
               border-1px(rgba(7,17,27,0.1))
               .title
                 font-size:0
                 padding:0
                 overflow:hidden
                 .rate-time
                   font-size:10px
                   color:rgb(147,153,159)
                   line-height:10px
                   float:left
                 .rate-user
                   float:right
                   font-size:0
                   .username
                      font-size:10px
                      color:rgb(147,153,159)
                      line-height:10px
                   .avatar
                      margin-left:6px
               .text
                 font-size:12px
                 line-height:24px
                 color:rgb(7,17,27)
                 .icon
                    font-size:12px
                    color:rgb(147,153,159)
                    line-height:24px
                    margin-right:4px
                    &.icon-smile
                       color:rgb(0,160,220)
                    &.icon-sad
                       color:rgb(147,153,159)
</style>
<script type='text/ecmascript-6'>
    import cartcontrol from 'components/cartControl/cartControl';
    import Vue from 'vue';
    import {dateformat} from 'common/js/date.js';
    import split from 'components/split/split';
    import BScroll from 'better-scroll';
    import ratingselect from 'components/ratingselect/ratingselect';
//  const POSITIVE=0;
//  const NEGATIVE=1;
    const ALL=2;
    export default{
        props: {
        	curFood: {
        		type: Object
        	}
        },
//      父组件可以调用子组件的方法,但是子组件不能调用父组件的方法
        data() {
        	return {
        		showFlag: false,
        		selectType: ALL,
        		onlyContent: true,
        		desc: {
        			all: '全部',
        			positive: '推荐',
        			negative: '吐槽'
        		}
        	};
        },
        created() {
        	this.$root.eventHub.$on('e_selectRating', this.e_selectRating);
        	this.$root.eventHub.$on('e_toggleSwitch', this.e_toggleSwitch);
        },
        // 最好在组件销毁前
		// 清除事件监听
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
//      	以下划线开头的方法名代表组件私有的方法
        	show() {
        		this.showFlag = true;
        		this.selectType= ALL;
        		this.onlyContent=false;
        		this.$nextTick(() => {
       	   			if(!this.scroll){
       	   				this.scroll=new BScroll(this.$refs.foodlayer, {
       	   					click: true
       	   				});	
       	   			}else{
       	   				this.scroll.refresh();
       	   			}
       	   		});
        	},
        	hide() {
        		this.showFlag=false;
        	},
        	addFood(event) {
//      		防止pc多次点击
        		if(!event._constructed){
        			return;
        		}
        		if(!this.curFood.count){
        			Vue.set(this.curFood, 'count', 1);
        		}
        		if(this.curFood.count===0){
        			this.curFood.count=1;
        		}
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
        	}
        },
        components: {
        	cartcontrol,
        	split,
        	ratingselect
        }
    };
</script>
