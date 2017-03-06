<template>
	<div id="buycar">
		<div class="content-wrapper">
			<div class="relative">
				<div class="content-left" @click='toggleList'>
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight': totalCount>0}">
							<span class='icon-cart' :class="{'highlight': totalCount>0}"></span>
							<span class='total-count' v-show='totalCount>0'>{{totalCount}}</span>
						</div>
					</div>
					<div class="price-wrapper">
						<span class='total-price' :class="{'highlight': totalPrice>0}">
    			 	￥{{totalPrice}}
    			</span>
						<span class='deliver-fee'>
    				另需配送费￥{{deliverFee}}元
    			</span>
					</div>
				</div>
				<div class="content-right" @click='pay'>

					<div class="balance-wrapper" :class='payClass'>
						<span class='balance'>
    				{{payDesc}}
    			</span>
					</div>
				</div>
				<transition name='fold'>
					<div class="shopcart-list" v-show='listShow'>
						<div class="list-header">
							<h3 class='title'>购物车</h3>
							<span class='empty' @click='empty'>清空</span>
						</div>
						<div class="list-content" ref='buydetail'>
							<ul>
								<li class="fooditem" v-for='food in selectedFoods'>
									<span class='name'>{{food.name}}</span>
									<div class="control">
										<span class='price'>￥{{food.price*food.count}}</span>
										<div class="cartcontrol-wrapper">
											<cartcontrol :food='food'></cartcontrol>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</transition>
			</div>

		</div>

		<transition name='fade'>
			<div class="list-mask" @click='hideList' v-show='listShow'></div>
		</transition>
	</div>

</template>
<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/fonts.styl"
  .content-wrapper
     position:fixed
     left: 0
     bottom: 0
     height: 48px 
     width:100%
     z-index: 50
     .relative
         position:relative
         width:100%
         height:100%
         display:flex
         background:#141d27
	     .content-left
	        flex:1
	        display:flex
	        .logo-wrapper
	           margin-left:11px
	           margin-right:11px
	           height:58px
	           background:#141d27
	           border-radius:50%
	           width:58px
	           margin-top:-10px
	           position:relative
	           flex:0 0 58px
	           .logo
	             width:44px
	             height:44px
	             position:absolute
	             top:7px
	             left:7px
	             border-radius:50%
	             background-color:rgba(255,255,255,0.2)
	             text-align:center
	             line-height:44px
	             &.highlight
	                background-color:rgb(0,160,220)
	             .icon-cart
	               color:rgba(255,255,255,0.4)
	               &.highlight
	                 color:white
	             .total-count
	               position:absolute
	               display:block
	               width:24px
	               height:12px
	               border-radius:6px
	               right:-3px
	               top:-3px
	               background-color:rgb(240, 20, 20)
	               color:white
	               box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4)
	               font-weight:700
	               text-align:center
	               font-size:9px
	               line-height:12px
	        .price-wrapper
	           flex:1
	           margin-top:12px
	           margin-bottom:12px
	           .total-price
	              display:inline-block
	              padding-right:12px
	              border-right:1px solid rgba(255,255,255,0.1)
	              color:rgba(255,255,255,0.4)
	              font-weight:700
	              font-size:16px
	              line-height:24px
	              &.highlight
	                 color:white
	           .deliver-fee  
	              font-size: 14px
	              color:rgba(255,255,255,0.4)
	              line-height:24px        
	     .content-right
	        flex:0 0 105px
	        width:105px
	        background:rgba(255,255,255,0.2)
	        .balance-wrapper
	           line-height:48px
	           text-align:center
	           background:rgba(255,255,255,0.2)
	           .balance
	              color:rgba(255,255,255,0.4)
	              font-size:14px
	              font-weight:700
	           &.not-enough
	              background:rgba(255,255,255,0.2)
	           &.enough
	              background:green
	              .balance
	                 color:white
	     .shopcart-list
	        position:absolute
	        left:0
	        width:100%
	        bottom:48px
	        background-color: white
	        transition: all 0.5s
	        z-index:-70
	        &.fold-enter-active, &.fold-leave
	           transform: translateY(0)
	        &.fold-enter, &.fold-leave-active
	           transform: translateY(100%)
	        .list-header
	           width:90%
	           padding:0 5%
	           height:40px
	           border-1px(rgba(7, 17, 27, 0.1))
	           background-color:#f3f5f7
	           .title
	               font-size:14px
	               font-weight:200
	               color:rgb(7,17,27)
	               line-height:40px
	               float:left
	           .empty
	               float:right
	               font-size:12px
	               color:rgb(0,160,220)
	               line-height:40px
	        .list-content
	           width:90%
	           margin:0 auto
	           padding-bottom: 24px
	           max-height:217px
	           overflow: hidden
	           .fooditem
	           	  height:48px
	           	  border-1px(rgba(7,17,27,0.1))
	           	  .name
	           	     float:left
	           	     color:rgb(7,17,27)
	           	     font-size:14px
	           	     line-height:48px
	           	  .control
	           	     float: right
	                 .price
	                    display:inline-block
	                    height:48px
	                    color:rgb(240,20,20)
	                    font-size:10px
	                    font-weight:700
	                    line-height:48px
	                    margin-right:32px
	                 .cartcontrol-wrapper
	                    display:inline-block
  .list-mask
     position:fixed
     top: 0
     left:0
     width:100%
     height:100%
     z-index: 40
     transition:all 0.5s  
     background:rgba(7,17,27,0.6)  
     backdrop-filter: blur(10px) 
     &.fade-enter,&.fade-leave-active
        opacity:0
     &.fade-enter-active,&.fade-leave
        opacity:1
        
                
</style>
<script type='text/ecmascript-6'>
   import cartcontrol from 'components/cartControl/cartControl';
   import BScroll from 'better-scroll'; 
   export default{
	    props: {
	    	selectedFoods: {
//	    		在vue中,如果type是array或者是obj,default是函数
	    		type: Array,
	    		default() {
	    			return [
	    			 {
	    			 	'count': 0,
	    			 	'price': 0
	    			 }
	    			
	    			];
	    		}
	    	},
        	deliverFee: {
        		type: Number,
        		default: 0
        		
        	},
        	minPrice: {
        		type: Number,
        		default: 0
        	}
     	},
     	data() {
     		return {
     			havelist: false
     			
     		};
     	},
       computed: {
       	   totalPrice() {
       	 	  let total = 0;
       	 	  this.selectedFoods.forEach((food) => {
       	 	  	total+=food.price * food.count;
       	 	  });
       	 	  return total;
       	   },
       	   totalCount() {
       	   	 let count = 0;
       	   	 this.selectedFoods.forEach((food) => {
       	   	 	count+=food.count;
       	   	 });
       	   	 return count;
       	   },
       	   payDesc() {
       	   	 let total = this.totalPrice;
       	   	 let minPrice = this.minPrice;
       	   	 if(total === 0){
       	   	 	return `￥${minPrice}起送`;
       	   	 }else if(total < minPrice){
       	   	 	return `还差￥${(minPrice-total)}起送`;
       	   	 }else{
//     	   	 	没有变量的话应用单引号
       	   	 	return '去结算';
       	   	 }
       	   },
       	   payClass() {
       	   	 if(this.totalPrice >= this.minPrice){
       	   	 	return 'enough';
       	   	 }else{
       	   	 	return 'not-enough';
       	   	 }
       	   },
       	   listShow() {
       	   	if(!this.totalCount){
       	   		this.havelist=false;
       	   		return false;
       	   	}
       	   	let show=this.havelist;
       	   	if(show){
       	   		this.$nextTick(() => {
       	   			if(!this.scroll){
       	   				this.scroll=new BScroll(this.$refs.buydetail, {
       	   					click: true
       	   				});
       	   			}else{
       	   				this.scroll.refresh();
       	   			}
       	   		});
       	   	}
       	   	return show;
       	   }
       },
       components: {
       	cartcontrol
       },
       methods: {
       	  toggleList() {
       	  	if(!this.totalCount){
       	  		return;
       	  	}
       	  	this.havelist=!this.havelist;
       	  },
       	  empty() {
       	  	this.selectedFoods.forEach((food) => {
       	  		food.count=0;
       	  	});
       	  },
       	  hideList() {
       	  	this.havelist=false;
       	  },
       	  pay() {
       	  	 if(this.totalPrice<this.minPrice){
       	  	 	return;
       	  	 }
       	  	 window.alert('您需要支付'+this.totalPrice+'元');
       	  }
       }
    };
</script>
