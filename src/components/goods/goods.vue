<template>
	<div id="goods">
		<div class="menu-wrapper" ref='menuWrapper'>
			<ul>
				<li v-for='(item, index) in goods' class='menu-item'  :class="{'current': currentIndex===index}" @click='selectMenu(index,$event)'>
					<span  class='menu-text'>
						<span v-show='item.type>0' class='menu-icon' :class='classMap[item.type]'></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
    	<div class='goods-wrapper' ref='goodsWrapper'>
    		<ul>
    			<!--food-list-hook,,hook代表没有实际样式，只是用来供js选择dom结构-->
    			<li v-for='item in goods' class='food-list food-list-hook'>
    				<h2 class='title'>{{item.name}}</h2>
    				<ul class='food-sec-list'>
    					<li v-for='food in item.foods' class='food-item'  @click='showFoodDetail(food,$event)'>
    						<div class="icon">
    							<img :src="food.icon" alt="" width='57' height='57'/>
    						</div>
    						<div class="content">
    							<h3 class='name'>{{food.name}}</h3>
    							<p class='desc'>{{food.description}}</p>
    							<div class="extra">
    								<span class='sell'>月售{{food.sellCount}}份</span>
    								<span class='rating'>好评率{{food.rating}}%</span>
    							    <p class='price'>
    							    	<span class='nowprice'>￥{{food.price}}</span>
    							    	<span class='oldprice' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
    							    </p>
    							</div>
    							<div class="control">
    								<cartcontrol :food='food'></cartcontrol>
    							</div>
    						</div>
    						
    					</li>
    				</ul>
    				
    			</li>
    		</ul>
    	</div>
    	<buycar ref='buycar' :deliver-fee='seller.deliveryPrice' :min-price='seller.minPrice' :selectedFoods='selectedFoods'></buycar>
    	<food :curFood='curFood' ref='food'></food>
	</div>
    
</template>
<style lang='stylus' rel='stylesheet/stylus'>
    @import "../../common/stylus/mixin.styl"
    #goods
       position:absolute
       top:185px
       width:100%
       bottom:46px
       display:flex
       overflow:hidden
       .menu-wrapper
          /*第一个等分，第二个内容不够时缩放情况，第三个占用空间*/
          flex:0 0 80px
          width:80px
          background-color:#f3f5f7
          .menu-item
             /*display:table是垂直居中最好的布局，可以让两行多行都垂直居中*/
             display:table
             height:54px
             width:56px
             padding:0 12px
             text-align:left
             &.current
               background-color:white
               .menu-text
                  color:black 
                  font-weight: 700              
             &:last-child
               .menu-text
                 border:0px
             .menu-text
                display:table-cell
                font-size:12px
                color: rgb(77, 85, 93)
                font-weight:200
                vertical-align:middle
                line-height:14px
                border-1px(rgba(7, 17, 27, 0.1))
                .menu-icon
                   display:inline-block
                   width:12px
                   height:12px
                   vertical-align:bottom
                   &.decrease
                     bg-image('decrease_3')
                   &.discount
                     bg-image('discount_3')
                   &.special_1
                     bg-image('special_3')
                   &.invoice
                     bg-image('invoice_3')
                   &.guarantee
                     bg-image('guarantee_3')
        .goods-wrapper
          flex:1
          .title
             background:#f3f5f7
             color:rgb(147, 153, 159)
             font-size:12px
             line-height:26px
             padding-left:14px
             border-left:2px solid #d9dde1
          .food-sec-list
             .food-item 
               display:flex
               background: white
               margin:18px
               margin-bottom:0
               padding-bottom:18px
               border-1px(rgba(7,17,27,0.1))
               &:last-child
                  border-none()
               .icon
                  flex: 0 0 57px
                  margin-right: 10px
               .content 
                   flex: 1
                   position: relative
                   .name
                     font-size: 14px
                     color:rgb(7, 17, 27)
                     line-height: 14px
                   .desc
                     font-size:10px
                     line-height:10px
                     margin-top:8px
                     color:rgb(147, 153, 159)
                   .extra
                      font-size:0
                      margin-top:8px
                      span
                         font-size:10px
                         line-height: 10px
                         color:rgb(147, 153, 159)
                         &.sell
                           margin-right:12px 
                      .price
                         height:24px                     
                         line-height:24px
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
                   .control
                      position: absolute
                      right:0
                      bottom:0 
</style>
<script type='text/ecmascript-6'>
   import BScroll from 'better-scroll';
   import buyCar from 'components/buyCar/buyCar';
   import cartControl from 'components/cartControl/cartControl';
   import food from 'components/food/food';
    const ERR_NO = 0;
    export default{
        props: {
        	seller: {
        		type: Object
        	}
        },
        data() {
        	return {
        		goods: [],
        		listHeight: [],
        		scrollY: 0,
        		curFood: {}
        	};
        },
        computed: {
        	currentIndex() {
        		for(let i=0;i<this.listHeight.length;i++){
        			let height1 = this.listHeight[i];
        			let height2 = this.listHeight[i+1];
        			if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
        				return i;
        			}
        		}
        	},
        	selectedFoods() {
        		let foods = [];
        		this.goods.forEach((good) => {
        			good.foods.forEach((food) => {
        				if(food.count){
        					foods.push(food);
        				}
        			});
        		});
        		return foods;
        	}
        },
        created() {
        	this.$http.get('/api/goods').then((response) => {
		      response = response.body;
		      if (response.errno === ERR_NO) {
		        this.goods = response.data;
//		        与dom相关的操作放在nextTick后
		        this.$nextTick(() => {
		        	this._initScroll();
		        	this._calculateHeight();
		        });
		      }
		    });
		    this.classMap = ['decrease', 'discount', 'special_1', 'invoice', 'guarantee'];
        },
        methods: {
        	_initScroll() {
//      		console.log(this.$refs.menuWrapper);
        		this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        			click: true
        		});
        		this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
        			probeType: 3,
        			click: true
//      			该属性用来监听滚动位置
        		});
        		this.goodsScroll.on('scroll', (pos) => {
        			this.scrollY = Math.abs(Math.round(pos.y));
        		});
        	},
        	_calculateHeight() {
        		let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
        		let height = 0;
        		this.listHeight.push(height);
        		for(let i = 0; i < foodList.length; i++){
        			let item = foodList[i];
        			height = height +item.clientHeight;
        			this.listHeight.push(height);
        		}
        	},
        	selectMenu(index, event) {
        		if(!event._constructed){
//      			如果event._constructed存在,说明这个事件是vue的事件,不是浏览器的事件，以此来过滤掉浏览器事件
                    return; 
        		}
        		
        		let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
        		let el=foodList[index];
        		this.goodsScroll.scrollToElement(el, 300);
        	},
        	showFoodDetail(food, event) {
        		if(!event._constructed){
//      			如果event._constructed存在,说明这个事件是vue的事件,不是浏览器的事件，以此来过滤掉浏览器事件
                    return; 
        		}
        		this.curFood=food;
        		this.$refs.food.show();
        	}
        },
        components: {
        	'buycar': buyCar,
        	'cartcontrol': cartControl,
        	'food': food
        }
    };
</script>
