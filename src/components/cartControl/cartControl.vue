<template>
    <div id="cart-control">
    	
    		<transition name='scroll'>
    			<span class="icon-minus minus" v-show='food.count>0' @click.stop.prevent='minuscount($event)'></span>
    		</transition>
    		<span class='num' v-show='food.count>0'>{{food.count}}</span>
    		<span class='icon-plus plus' @click.stop.prevent='addcount($event)'></span>
    </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
    #cart-control
       position:relative
       .minus,.plus
          display: inline-block
          width:18px
          height:18px
          border-radius:50%
          font-size:12px
          text-align:center
          line-height:18px
       /*最终和最开始的样式，先有icon-minus,后有.scroll-enter,然后是scroll-enter-active,最后又回归icon-minus*/
       .icon-minus
          position:absolute
          right:54px
          top:0
          color: rgb(0,160,220)
          border:2px solid rgb(0,160,220)
          transition:all 0.5s
          &.scroll-enter-active, &.scroll-leave
             opacity: 1
             transform:translate3D(0, 0,0)  rotate(0deg)
          &.scroll-enter, &.scroll-leave-active
             opacity: 0
             transform:translate3D(54px, 0, 0) rotate(360deg)
       .icon-plus
          color:white
          background-color:rgb(0,160,220)
          width:22px
          height:22px
          line-height:22px
       .num
          font-size:12px
          color:rgb(147,153,159)
          margin-left:8px
          margin-right:8px
       
</style>
<script type='text/ecmascript-6'>
    import Vue from 'vue';
    export default{
        props: {
        	food: {
        		type: Object
        	}
        },
        methods: {
        	addcount(event) {
        		if(!event._constructed){
        			return;
        		}
        		if(!this.food.count){
        			Vue.set(this.food, 'count', 1);
        		}else{
        			this.food.count++;
        		}
        	},
        	minuscount(event) {
        		if(!event._constructed){
        			return;
        		}
        		if(this.food.count>0){
        		  this.food.count--;
        		}
        	},
        	afterEnter(el) {
        		el.style.display='none';
        	}
        }
    };
</script>
