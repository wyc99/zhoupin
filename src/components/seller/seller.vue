<template>
    <div id='seller' ref='sellerLayer'>
		<div class="seller-content">
			<div class="info">
				<h3 class="title">{{seller.name}}</h3>
				<div class="extra">
					<star class='star' :size='36' :score='seller.serviceScore'></star>
				    <span class="rating-count">({{seller.ratingCount}})</span>
				    <span class="sell-count">月售{{seller.sellCount}}单</span>
				</div>
				<div class="desc">
					<div class="block"><span class="name">起送价</span><span class="value"><em class='num'>{{seller.minPrice}}</em>元</span></div>
					<div class="block"><span class="name">商家配送</span><span class="value"><em class='num'>{{seller.deliveryPrice}}</em>元</span></div>
					<div class="block"><span class="name">平均配送时间</span><span class="value"><em class='num'>{{seller.deliveryTime}}</em>分钟</span></div>
				</div>
				<div class="collect">
					<span class="icon-heart" :class="{'active': favorite}" @click='toggleCollect($event)'></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<div class="bulletin-head">
					<h3 class='title'>公告与活动</h3>
					<p class="text">{{seller.bulletin}}</p>
				</div>
				<ul v-if='seller.supports' class='supports'>
      		    	<li  class='support-item' v-for='item in seller.supports'>
      		    		<span  class='support-icon' :class='classMap[item.type]'></span>
      		    		<!--<span>{{seller.supports[$index].description}}</span>-->
      		    		<!--废弃的写法-->
      		    		<span>{{item.description}}</span>
      		    	</li>
	           </ul>
			</div>
			<split></split>
			<div class="seller-pic">
				<h3 class="title">商家实景</h3>
				<div class="pic-wrapper" ref='picWrapper'>
					<ul class="pic-list" ref='picList'>
						<li class="pic-item" v-for='pic in seller.pics'>
							<img class='pic' width="120" height='90' :src="pic" alt="" />
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="extra">
				<div class="title">商家信息</div>
				<ul class="extra-list">
					<li class="support" v-for='info in seller.infos'>{{info}}</li>
				</ul>
			</div>
		</div>
    </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
    @import "../../common/stylus/mixin.styl"
    @import "../../common/stylus/fonts.styl"
    #seller
       position:absolute
       top:185px
       width:100%
       bottom:18px
       /*overflow:auto*/
       overflow:hidden
       .info
          position:relative
          .title
             margin:18px
             margin-bottom:0
             font-size:14px
             color:rgb(7,17,27)
             line-height:14px
          .extra
             margin:8px 18px 0
             padding-bottom:18px
             border-1px(rgba(7,17,27,0.1))
             font-size:0
             .star
                display:inline-block
             .rating-count
                margin:0 12px 0 8px
                font-size:10px
                color:rgb(77,85,93)
                line-height:10px
             .sell-count
                font-size:10px
                color:rgb(77,85,93)
                line-height:10px
          .collect
             position:absolute
             right:18px
             top:0
             text-align:center
             .icon-heart
                font-size:24px
                display:block
                color:gray
                width:36px
                margin-bottom:4px
                &.active
                   color:red
             .text
                font-size:10px
                color:rgb(77,85,93)
                line-height:10px
          .desc
             display:flex
             .block
                flex:1 
                text-align:center
                margin-top:18px
                margin-bottom:18px
                border-right:1px solid rgba(7,17,27,0.1)
                .name
                   font-size:10px
                   color:rgb(147,153,159)
                   line-height:10px
                   margin:0
                   display:block
                .value
                   display:block
                   margin-top:4px
                   line-height:24px
                   font-size:10px
                   font-weight:200
                   .num
                     font-size:24px
                     font-weight:200
                     color:rgb(7,17,27)
                     line-height:24px
      .bulletin
        margin:18px 18px 0
        .bulletin-head
           border-1px(rgba(7,17,27,0.1))
           padding-bottom:18px
	       .title
	           font-size:14px
	           color:rgb(7,17,27)
	           line-height:14px
	       .text
	           margin:8px 12px 0
	           color:rgb(240,20,20)
	           font-size:12px
	           font-weight:200
	           line-height:24px
        .supports
           font-size:12px
           font-weight:200
           line-height:16px
           color:rgb(7,17,27)
           .support-item
               padding:16px
               border-1px(rgba(7,17,27,0.1))
               &:last-child
                  border:none
               .support-icon
                  display:inline-block
                  width:16px
                  height:16px
                  vertical-align:top
                  margin-right:6px
                  &.decrease
                    bg-image('decrease_4')
                  &.discount
                    bg-image('discount_4')
                  &.special_1
                    bg-image('special_4')
                  &.invoice
                    bg-image('invoice_4')
                  &.guarantee
                    bg-image('guarantee_4')   
      .seller-pic
         padding:18px
         .title
            font-size:14px
            color:rgb(7,17,27)
            line-height:14px  
         .pic-wrapper
            margin-top:12px
            overflow:hidden
            white-space: nowrap
            width:100%
            .pic-list
               font-size:0    
               .pic-item
                  display:inline-block
                  margin-right:6px
                  width:120px
                  height:90px
                           
      .extra
         margin:18px
         margin-bottom:0
         .title
            font-size:14px
            color:rgb(7,17,27)
            line-height:14px
         .extra-list
            margin-top:12px
            .support
               padding:16px 12px
               border-top:1px solid rgba(7,17,27,0.1)
               font-size:12px
               font-weight:200
               color:rgb(7,17,27)
               line-height:16px        
             
</style>
<script type='text/ecmascript-6'>
   import star from 'components/star/star';
   import split from 'components/split/split';
   import BScroll from 'better-scroll';
   import {saveToLocal, loadFromLocal} from 'common/js/store';
    export default{
   		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				'favorite': (() => {
					return loadFromLocal(this.seller.id, 'favorite', false);
				})()
			};
		},
		components: {
			star,
			split
		},
//		先mounted,此时seller为空也就是数据为空,虽然初始化了scroll对象但是不能滚动,页面高度此时还是小于设备高度的
		mounted() {
			this._initScroll();
			this._initPicScroll();
		},
//		mounted后当监测到有数据后,再刷新页面滚动
		watch: {
			'seller'() {
				this._initScroll();
				this._initPicScroll();
			}
		},
		computed: {
			favoriteText() {
				if(this.favorite){
					return '已收藏';
				}else{
					return '收藏';
				}
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special_1', 'invoice', 'guarantee'];
//		    this.$nextTick(() => {	
// 				this.scroll=new BScroll(this.$refs.sellerLayer, {
// 					click: true
// 				});
//     	   	});
	   },
	   methods: {
	   	 _initScroll() {
	   	 	if(!this.scroll){
		   	 	this.scroll=new BScroll(this.$refs.sellerLayer, {
	   					click: true
	   			});
   			}else{
   				this.scroll.refresh();
   			}
	   	 },
	   	 _initPicScroll() {
	   	 	if(this.seller.pics) {
	   	 		let picWidth=120;
	   	 		let margin=6;
	   	 		let width=(picWidth+margin)*this.seller.pics.length-margin;
	   	 		this.$refs.picList.style.width=width+'px';
	   	 	}
	   	 	if(!this.picScroll){
	   	 		this.picScroll=new BScroll(this.$refs.picWrapper, {
	   	 			scrollX: true,
	   	 			eventPassThrough: 'vertical'
	   	 		});
	   	 	}else{
	   	 		this.picScroll.refresh();
	   	 	}
	   	 },
	   	 toggleCollect(event) {
	   	 	if(!event._constructed){
//      			如果event._constructed存在,说明这个事件是vue的事件,不是浏览器的事件，以此来过滤掉浏览器事件
                    return; 
        	}
	   	 	this.favorite=!this.favorite;
	   	 	saveToLocal(this.seller.id, 'favorite', this.favorite);
	   	 }
	   }
    };
</script>
