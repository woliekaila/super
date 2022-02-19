<template>
  <div class="type-nav">
    <!-- <h2>{{categoryData}}</h2> -->
    <div class="container">
      <!-- 控制三级分类列表的显示与隐藏 -->
      <div  @mouseenter="showNav" @mouseleave="hideNav">
        <h2 class="all">全部商品分类</h2>
        <!--  -->
        <div class="sort" v-show="isShow">
          <!-- 利用事件的委派与编程式导航实现路由跳转 -->
          <div class="all-sort-list2" @click="goSearch">
            <!-- 第一级 -->
            <div class="item bo" v-for="(c1, index1) in categoryData"
              :key="c1.categoryId"
              @mouseleave="leaveIndex(index1)">
              <h3 @mouseenter="changeIndex(index1)" :class="{ currentBg: index1 === currentIndex }">
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">
                  {{ c1.categoryName }}
                </a>
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: index1 === currentIndex ? 'block' : 'none' }">
              <!-- 第二级 -->
                <div
                  class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                        {{ c2.categoryName }}
                      </a>
                    </dt>
                    <dd>
                      <!-- 第三级 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                          {{ c3.categoryName }}
                        </a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  mounted() {
    // 当组件挂载完毕时发送网络请求 通知Vuex发请求 并将数据存储与vuex中 (有缺陷,当路由在跳转时type-nav会被重复销毁和创建导致请求会重复发送,影响性能)
    // this.$store.dispatch("categoryList");
    // 控制三级分类列表在哪个路由组件显示以及隐藏
    if (this.$route.path !== "/home") {
      this.isShow = !this.isShow;
    }
  },
  computed: {
    ...mapState({
      categoryData: function (state, b) {
        state.home.categoryList.pop();
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    changeIndex(index) {
      // console.log(index)
      this.currentIndex = index;
    },
    leaveIndex(index) {
      this.currentIndex = -1;
    },
    // 实现路由跳转
    goSearch(event) {
      // console.log('asd')
      // 实现逻辑: 为节点绑定自定义属性实现标签类别以及动态传递路由参数
      let element = event.target;
      // dataset是节点所有的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 判断用户点击的是否是a标签
      if (categoryname) {
        // console.log(categoryname)
        // 整理路由参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 判断一级分类、二级分类、三级分类a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        // 若有pramas参数则合并
        if(this.$route.params){
          let parmas = this.$route.params
          location.params = parmas;
        }
        //将路由参数汇总并进行路由跳转
        location.query = query;
        this.$router.push(location);
      }
    },
    // 控制三级分类列表的显示与隐藏
    showNav() {
      this.isShow = true;
    },
    hideNav() {
      let flag = this.$route.path.slice(0,7)
      if (this.$route.path === "/search" || flag === "/detail") {
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .currentBg {
          background-color: #ff6700;
        }
      }
    }
  }
}
</style>
