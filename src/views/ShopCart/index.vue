<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeSkuNum('decrement',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="changeSkuNum('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="changeSkuNum('increment',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum * cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="removeCart(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked()">删除选中的商品</a>
        <a >移到我的关注</a>
        <a >清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData();
    },
    methods: {
      // 派发action 发送网络请求获取购物车中的数据
      getData(){
        this.$store.dispatch('getCartList')
      },
      // 修改商品数量 
      //使用接口 /api/cart/addToCart/{ skuId }/{ skuNum }
      // 参数skuNum: 商品数量 正数代表增加 负数代表减少
      changeSkuNum(type,disNum,cart){
        //type: 修改数量有三种方式,分别为三种方式做上标记,将标记以实参的形式传入
        //disNum: 就是带给服务器的skuNum
        // cart: 可以从中获取产品id并带给服务器 (skuId)
        //向服务器发送请求修改产品数量
        switch(type){
          case 'increment':
            // 带给服务器变化的量
            disNum = 1
            break
          case 'decrement':
            // 产品个数必须大于1,<=1 产品个数就不能减少
            disNum = cart.skuNum>1 ? -1 : 0
            break
          case 'change':
            if(isNaN(disNum) || disNum<0){
              disNum = 0
            }else{
              disNum = parseInt(disNum) - cart.skuNum
            }
        }
        // 派发action修改产品数量
        this.$store.dispatch('addShopCart',{skuId:cart.skuId,skuNum: disNum}).then(res =>{
          // console.log(res)
          this.getData()
        }).catch(err =>{
          console.log(err)
        })
        // console.log(type,disNum)
      },
      // 删除商品
      removeCart(cart){
        this.$store.dispatch('deleteCart',cart.skuId).then(res =>{
          console.log(res)
          this.getData();
        }).catch(err =>{
          console.log(err)
        })
      },
      // 修改商品选中状态
      updateChecked(cart,event){
        // console.log(cart,event.target.checked)
        // 判断当前input是否选中 若选中isChecked值为1否则则为0
        let isChecked = event.target.checked ? 1 : 0;
        this.$store.dispatch('updateChecked',{skuId:cart.skuId,isChecked}).then(res =>{
          // console.log(res)
          this.getData();
        }).catch(err =>{
          console.log(err)
        })
      },
      // 删除所有的选中商品
      deleteAllChecked(){
        this.$store.dispatch('deleteAllChecked').then(res =>{//只有当所有选中的商品全部删除成功,才会再次向服务器请求购物车的数据
          console.log(res)
          this.getData();
        }).catch(err =>{
          console.log(err)
        })
      },
      // 单击全选复选框使购物车中的商品根据全选复选框的状态进行相应的更新
      updateAllCartChecked(){
        // 获取全选复选框的状态
        let isChecked = this.isAllChecked ? '0' : '1'
        this.$store.dispatch('updateAllCartChecked',isChecked).then(res =>{//只有当所有的商品状态全部修改成功,才会再次向服务器请求购物车的数据
          console.log(res)
          this.getData();
        }).catch(err =>{
          console.log(err)
        })
      }
    },
    computed: {
      // 获取仓库中存储的购物车信息
      ...mapGetters(['cartInfo']),
      // 对购物车信息进一步简化
      cartInfoList(){
        return this.cartInfo.cartInfoList || [];
      },
      // 购买商品的总价
      totalPrice(){
        let sum = 0
        this.cartInfoList.forEach(item => {
          sum += item.skuNum * item.skuPrice
        });
        return sum
      },
      // 默认商品是否全选
      isAllChecked(){
        let flag = true
        this.cartInfoList.forEach(item => {
          if(item.isChecked !== 1){
            flag = false
          }
        });
        return flag
      }
    }
    
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;
          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>