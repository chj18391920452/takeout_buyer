<template>
    <div class="mui-content">
        <div class="mui-card">
            <ul class="mui-table-view" >
                <li class="mui-table-view-cell">订单号<span class="spanright">{{data.orderId}}</span></li>
                <li class="mui-table-view-cell">收货地址<span class="spanright">{{data.buyerAddress}}<br/>{{data.buyerName}} {{data.buyerPhone}}</span></li>
                <li class="mui-table-view-cell">订单价格<span class="spanright">{{data.orderAmount}}元</span></li>
                <li class="mui-table-view-cell">下单时间<span class="spanright">{{dateFormat(data.createTime)}}</span></li>
                <li class="mui-table-view-cell">订单状态<span class="spanright orderStatus">{{transformOrderStatus(data.orderStatus)}}</span></li>
                <li class="mui-table-view-cell">支付状态<span class="spanright orderStatus">{{transformPayStatus(data.payStatus)}}</span></li>
                <li class="mui-table-view-cell">
                    <div style="width: 100%;height: 40px;margin-top: 20px;font-size: 13px" v-for="item in data.orderDetailList" >
                        <div style="float:left;width: 60px;height: 40px;">
                            <img style="height: 40px" :src="item.productIcon"/>
                        </div>
                        <div style="float:left;height:40px;width: 110px; line-height: 40px; margin-left: 10px;">{{item.productName}}</div>
                        <div style="float:left;height:40px;width: 50px; line-height: 40px; margin-left: 100px;">
                            <span class="mui-icon mui-icon-closeempty" style="position: relative;top: 3px;"></span>{{item.productQuantity}}
                        </div>
                        <div style="float:right;height:40px;width: 50px; line-height: 40px; margin-left: 20px;font-size: 15px;font-weight: bold">￥{{item.productPrice*item.productQuantity}}</div>
                    </div>
                </li>
            </ul>
            <button type="button" class="mui-btn mui-btn-block mui-btn-success" v-show="payStatus==0 && orderStatus==0" @click="toPay()">确认付款</button>
            <button type="button" class="mui-btn mui-btn-block mui-btn-warning" v-show="orderStatus==0" @click="cancelOrder()">取消订单</button>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        name: "orderDetail",
        data(){
            return {
                data:{
                    "orderId": "161899085773669363",
                    "buyerName": "李四",
                    "buyerPhone": "18868877111",
                    "buyerAddress": "科技路",
                    "buyerOpenid": "18eu2jwk2kse3r42e2e",
                    "orderAmount": 18,
                    "orderStatus": 0,
                    "payStatus": 0,
                    "createTime": 1490177352,
                    "updateTime": 1490177352,
                    "orderDetailList": [
                        {
                            "detailId": "161899085974995851",
                            "orderId": "161899085773669363",
                            "productId": "157875196362360019",
                            "productName": "招牌奶茶",
                            "productPrice": 9,
                            "productQuantity": 2,
                            "productIcon": "https://s1.st.meishij.net/rs/50/123/6030800/n6030800_152708155351112.jpg",
                            "productImage": "https://s1.st.meishij.net/rs/50/123/6030800/n6030800_152708155351112.jpg"
                        }
                    ]
                },
                selected:'',
                payStatus:0,
                orderStatus:0
            }
        },
        created(){
            this.$store.state.index = 2
        },
        methods:{
            transformOrderStatus(status){
                switch (status){
                    case 0: return '新订单';break;
                    case 1: return '已完成';break;
                    case 2: return '已取消';break;
                }
            },
            transformPayStatus(status){
                switch (status){
                    case 0: return '未支付';break;
                    case 1: return '已支付';break;
                }
            },
            dateFormat(time) {
                var date = new Date(time);
                var year=date.getFullYear();
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
            },
            cancelOrder(){
                const _this = this
                MessageBox.confirm('确定取消订单吗?').then(action => {
                    let instance = Toast('取消成功');
                    setTimeout(() => {
                        instance.close();
                        window.location.reload()
                    }, 500);
                });
            },
            toPay(){
                this.$router.push('/pay?orderAmount='+this.data.orderAmount+'&orderId='+this.$route.query.orderId)
            }
        },
        watch:{

        }
    }
</script>

<style scoped>
    .spanright{
        display: inline-block;
        float: right;
    }
    .orderStatus{
        font-weight: bold;
        color: red;
    }
    .mui-table-view-cell{
        text-align: left;
    }
</style>
