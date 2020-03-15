<template>
	<view class="uni-margin-wrap">
        <view class="content">
            <image class="logo" src="../../static/logo.png"></image>
            <view>
                <text class="title">{{title}}</text>
                <button type="primary" @tap="this.getUserOpne()"> {{i18n.openid}}</button>
            </view>
        </view>
	</view>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component,Watch} from "vue-property-decorator";
    import {
        namespace
    } from "vuex-class";

    const initModule=namespace('init')
    @Component({})
    export default class Index extends  Vue {
        @initModule.State(state => state.hasLogin) public hasLogin!: boolean;
        @initModule.Action('getUserOpenId') getUserOpenId!: Function;

        title= 'Hello';
        onLoad() {
            console.log('onLoad')
        }
       /* @Watch('title')
        changeIndex(old:any, val:any){
            console.log(old,val);
        }*/
        get i18n(){
            return this.$t('index');
        }

        async getUserOpne(){
            const openId=await this.getUserOpenId();
            console.log(openId,this.hasLogin);
        }
    }
</script>

<style scoped>
    .uni-margin-wrap {
        width:calc(100%- 60rpx);
        margin:0 30rpx;
        position: 'relative';
    }
    .swiper {
        height: 300rpx;
    }
    .swiper-item {
        display: block;
        height: 300rpx;
        line-height: 300rpx;
        text-align: center;
    }

    .body-list {
        width: 100%;
    }
    .body-item {
        width:50%;
        height: 300rpx;
    }
</style>
