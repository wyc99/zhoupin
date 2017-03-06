<template>
    <div id="header">
      <div class="title-wrapper">
        <div class="avatar">
          <img width='64' height='64' :src='seller.avatar'>
        </div>
        <div class="title-content">
          <div class="title">
            <span class="brand"></span>
            <span>{{seller.name}}</span>
          </div>
          <div class="smalltitle">
            <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
          </div>
          <div class="description" v-if='seller.supports'>
            <span class='sell-icon' :class='classMap[seller.supports[0].type]'></span>
            <span>{{seller.supports[0].description}}</span>
          </div>
          <div class="support-count"  v-if='seller.supports' @click='showDetail'>
          	<span class='count'>{{seller.supports.length}}个</span>
          	<i class="icon-arrow-right2"></i>
          </div>
        </div>
      </div>
      <div class="bulletin-wrapper" @click='showDetail'>
      	<!--要么设置父元素的字体大小为0要么删掉换行符，都是为了让两个span之间没有间隙，这里不能设置父元素的字体大小为0，省略号将不显示-->
      	<span class="bulletin-title"></span><span class="bulletin-desc">{{seller.bulletin}}</span>
      	<i class="icon-arrow-right2"></i>
      	
      </div>
      <div class="background">
      	<img :src="seller.avatar" alt="" width='100%' height='100%'/>
      </div>
      <!--浮层css sticky footer-->
      <transition name='appear'>
	      <div v-show='detailShow' class="detail">
	      	<div class="detail-wrapper clearfix">
	      		<div class="detail-main">
	      			<h1 class='name'>{{seller.name}}</h1>
	      		    <div class="star-wrapper">
	      		    	 <star :size='48' :score='seller.score'></star>
	      		    </div>
	      		    <div class="titleone">
	      		    	<div class="line"></div>
	      		    	<div class="text">优惠信息</div>
	      		    	<div class="line"></div>
	      		    </div>
	      		    <ul v-if='seller.supports' class='text-wrapper supports'>
	      		    	<li  class='support-item' v-for='item in seller.supports'>
	      		    		<span  class='support-icon' :class='classMap[item.type]'></span>
	      		    		<!--<span>{{seller.supports[$index].description}}</span>-->
	      		    		<!--废弃的写法-->
	      		    		<span>{{item.description}}</span>
	      		    	</li>
	      		    </ul>
	      		    <div class="titleone">
	      		    	<div class="line"></div>
	      		    	<div class="text">商家公告</div>
	      		    	<div class="line"></div>
	      		    </div>
	      		    <p class="text-wrapper supports bulletin-desc">
	      		    	{{seller.bulletin}}
	      		    </p>
	      		</div>
	      	</div>
	      	<div class="detail-close">
	      		<i class='icon-cancel-circle' @click='hideDetail'></i>
	      	</div>
	      </div>
      </transition>
    </div>
</template>


<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/fonts.styl"
   #header
     background: rgba(7, 17, 27, 0.5)
     position:relative
     /*去掉blur的阴影*/
     overflow:hidden
     & span
        color: white
     .icon-arrow-right2
        color: white
        font-size: 10px 
        
     .title-wrapper
        padding: 24px 12px 18px 24px
        overflow: hidden
        position: relative
        .avatar
          border-radius: 2px
          float: left
        .title-content 
          float: left
          margin-left: 16px
          font-size: 0px 
           
          /*设置父元素的字体大小为0可以取消字体和背景之间的间隔*/
          .smalltitle
            margin-top:8px
            span
              font-size: 12px  
          .description
            margin-top:10px
            span
              font-size:10px
              &.sell-icon
                display:inline-block
                width: 12px
                height: 12px
                margin-right: 4px
                vertical-align: top
                &.decrease
                  bg-image('decrease_1')
                &.discount
                  bg-image('discount_1')
                &.guarantee
                  bg-image('guarantee_1')
                &.invoice
                  bg-image('invoice_1')
                &.special
                  bg-image('special_1')
          .title span
            font-size: 16px
            font-weight: bold
            line-height: 18px
            &.brand
              display: inline-block
              width: 30px
              height: 18px
              bg-image('brand')
              vertical-align: top
              margin-right: 6px
          .support-count
            position: absolute
            right:12px
            bottom:18px
            height: 24px
            width: 48px
            text-align:center
            border-radius:16px 14px
            background: rgba(0, 0, 0, 0.2)
            font-size: 10px
            .count
              display: inline-block
              height: 100%
              line-height:24px
           
      .bulletin-wrapper
      	 color:white
      	 height: 28px
      	 line-height:28px
      	 padding-left:12px
      	 padding-right:16px
      	 letter-spacing:1px
      	 background: rgba(0, 0, 0, 0.2)
      	 white-space: nowrap
      	 overflow: hidden
      	 text-overflow: ellipsis
      	 position:relative
      	 font-size:10px
      	 .bulletin-title 
      	    display: inline-block
      	    width: 22px
      	    height: 12px
      	    bg-image('bulletin') 
      	 .bulletin-desc
      	    padding:0 4px 0;
      	 .icon-arrow-right2
      	    position:absolute
      	    font-size:10px
      	    right: 12px
      	    top:8px
            
            
      .background
         position:absolute
         z-index:-1
         top:0
         left:0
         width:100%
         height:100%
         filter:blur(8px)
      .detail
        position:fixed
        z-index:100
        width:100%
        top:0
        left:0
        height:100%
        overflow:auto
        background:rgba(7, 17, 27, 0.8)
        /*有些iphone手机支持此特性，让背景模糊*/
        backdrop-filter: blur(10px)
        &.appear-enter-active, .appear-leave-active
           transition: all 0.6s
        &.appear-enter, &.appear-leave-active
           opacity: 0  
        .detail-wrapper
           min-height:100%
           width:100%
           text-align:center
           .detail-main 
              margin-top: 64px
              color:white
              padding-bottom:64px
              .name
                color:white
                line-height:16px
                font-size:16px
                font-weight: 700
              .star-wrapper
                margin-top:18px
                padding:2px 0
              .titleone
                 display:flex
                 width:80%
                 margin:28px auto 24px auto
                 .line
                    flex:1
                    position:relative
                    top:-6px
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2)
                 .text
                    color: white
                    padding:0 12px
                    font-weight:700
                    font-size: 14px
              .text-wrapper
                 width: 80%
                 padding:0 12px
                 box-sizing:border-box
                 margin:0 auto
                 text-align:left
                 color:white
                 &.supports
                   font-size:12px
                   font-weight:200
                   line-height:16px
                   color:white
                   .support-item
                       margin-top: 12px
                       &:first-child
                          margin-top:0
	                   .support-icon
	                      display:inline-block
	                      width:16px
	                      height:16px
	                      vertical-align:top
	                      margin-right:6px
	                      &.decrease
	                        bg-image('decrease_1')
	                      &.discount
	                        bg-image('discount_1')
	                      &.special_1
	                        bg-image('special_1')
	                      &.invoice
	                        bg-image('invoice_1')
	                      &.guarantee
	                        bg-image('guarantee_1')
	                &.bulletin-desc  
	                   line-height:24px 
        .detail-close
            position:relative
            width:32px
            height:32px
            margin:-64px auto 0 auto
            clear: both
            font-size: 32px
            .icon-cancel-circle
              color:white
              
             
               


</style>

<script type='text/ecmascript-6'>
  import star from 'components/star/star';
    export default{
      props: {
        seller: {
          type: Object
        }
      },
      data() {
      	return {
      		detailShow: false
      	};
      },
      methods: {
      	showDetail() {
      		this.detailShow = true;
      	},
      	hideDetail() {
      		this.detailShow = false;
      	}
      },
      created() {
        this.classMap = ['decrease', 'discount', 'special_1', 'invoice', 'guarantee'];
      },
      components: {
    	star
  	  }
    };
</script>
