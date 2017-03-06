<template>
    <div class='ratingselect'>
        <div class="type-wrapper">
        	<div class="item-wrapper all" :class="{'active': selectType===2}" @click='selectRating(2,$event)'>
        		<span class='big'>{{desc.all}}</span>
        		<span class='num'>{{ratings.length}}</span>
        	</div>
        	<div class="item-wrapper positive" :class="{'active': selectType===0}" @click='selectRating(0,$event)'>
        		<span class='big'>{{desc.positive}}</span>
        		<span class='num'>{{positives.length}}</span>
        	</div>
        	<div class='item-wrapper negative' :class="{'active': selectType===1}" @click='selectRating(1,$event)'>
        		<span class='big'>{{desc.negative}}</span>
        		<span class='num'>{{negatives.length}}</span>
        	</div>
        </div>
        <div class="switch-wrapper" @click='toggleSwitch($event)'>
        	<span class='gou' :class="{'on': onlyContent}">{{yon}}</span>
        	<span class="text">只看有内容的评价</span>
        </div>
        
    </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
    @import "../../common/stylus/mixin.styl"
    @import "../../common/stylus/fonts.styl" 
    .ratingselect
        background:#fff
        .type-wrapper
            padding-bottom:18px
            margin:0 18px
            border-1px(rgba(7,17,27,0.1))
            font-size:0
            .item-wrapper
              display:inline-block
              padding:8px 12px
              border-radius:2px
              margin-right:8px
              &.all
                 background:rgba(0,160,220,0.2)
                 &.active
                    background:rgb(0,160,220)
              &.positive
                 background:rgba(0,160,220,0.2)
                 &.active
                   background:rgb(0,160,220)
              &.negative
                 background:rgba(77,85,93,0.2)
                 &.active
                   background:rgba(77,85,93,0.5)
              &.active span
                 color:white
              .big
                color: rgb(77,85,93)
                font-size:14px
                font-weight:500
                margin-right:3px
                line-height:14px
              .num
                color: rgb(77,85,93)
                font-size:12px   
        .switch-wrapper
           width:100%
           border-1px(rgba(7,17,27,0.1))
           padding:18px
           font-size:0
           .gou
             display:inline-block
             width:14px
             height:14px
             background:rgb(147,153,159)
             border-radius:50%
             margin-right:4px
             vertical-align:top
             color:white
             font-size:12px
             text-align:center
             &.on
               background:#00C850
           .text
             font-size:12px
             color:rgb(147,153,159)
             line-height:12px
</style>
<script type='text/ecmascript-6'>
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;
    export default{
        props: {
        	selectType: {
        		type: Number,
        		default: ALL
        	},
        	desc: {
        		type: Object,
        		default() {
        			return {
        				all: '全部',
        				positive: '满意',
        				negative: '不满意'
        			};
        		}
        	},
        	onlyContent: {
        		type: Boolean,
        		default: false
        	},
        	ratings: {
        		type: Array,
        		default() {
        			return [];
        		}
        	}
        },
        computed: {
        	yon() {
        	   if(this.onlyContent){
        	   	  return 'y';
        	   }else{
        	   	  return 'n';
        	   }
        	},
        	positives() {
        		return this.ratings.filter((rating) => {
        			return rating.rateType=== POSITIVE;
        		});
        	},
        	negatives() {
        		return this.ratings.filter((rating) => {
        			return rating.rateType=== NEGATIVE;
        		});
        	}
        },
        methods: {
        	selectRating(type, event) {
        		if(!event._constructed){
        			return;
        		}
//      		console.log(this.selectType);
        		this.$root.eventHub.$emit('e_selectRating', type);
//      		console.log(this.selectType);
//              两次console结果相同,实现了props的数据双向,实现了父子间的通信
        	},
        	toggleSwitch(event){
        		if(!event._constructed){
        			return;
        		}
        		this.$root.eventHub.$emit('e_toggleSwitch');
        	}
        }
    };
</script>
