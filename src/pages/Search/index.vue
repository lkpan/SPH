<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.substring(2)
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖信息属性值展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a
                    >综合<span
                      v-show="isOne"
                      :class="{
                        iconfont: true,
                        'icon-xiajiantou': isDown,
                        'icon-shangjiantou': isUp,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a
                    >价格<span
                      v-show="isTwo"
                      :class="{
                        iconfont: true,
                        'icon-xiajiantou': isDown,
                        'icon-shangjiantou': isUp,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转的时候 -->
                    <router-link :to="`/detail/${good.id}`"><img  :src="good.defaultImg" /></router-link>
                   
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :totle="totle"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一、二、三级分类的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序,初始值应该是综合|降序
        order: "1:desc",
        // 分页器 ，当前页
        pageNo: 1,
        // 每一页展示数据个数
        pageSize: "3", // this.pageSize,
        // 平台售卖的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  name: "Search",
  components: {
    SearchSelector,
  },
  // 组件挂载完毕之前执行一次
  beforeMount() {
    // 发请求之前先把要传递的参数，进行整理进行发送
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 在发请求之前带给服务器【searchParams参数发生变化带给服务器】
    this.getData();
  },
  computed: {
    // mapGetters：数组写法，没有划分模块【home，search】
    ...mapGetters(["goodsList"]),
    // 获取search模块一共多少条数据
    ...mapState({
      totle: (state) => state.search.searchList.total,
    }),
    // 判断active显示位置
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    // 箭头指向
    isDown() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    isUp() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    // 每页页码数是多少
    pageSize: (state) => state.search.searchList.pageSize,
  },
  methods: {
    // 向服务器发送请求获取search模块数据
    // 把这次请求封装成一个函数，需要时调用
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除面包屑
    removeCategoryName() {
      // 带给服务器数据置空
      // 如果是空字符串的话还是会带给服务器，undefined就不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // this.searchParams.keyword = undefined
      this.getData();
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 删除面包屑关键字
    removeKeyword() {
      // 置空keyword
      this.searchParams.keyword = undefined;
      // 再次发送请求（但是watch中会不会冲突:会，所以注释掉了）
      // this.getData()
      // 全局事件总线 通知兄弟清除Header的关键字
      this.$bus.$emit("clear");
      this.$router.push({ name: "search" });
    },
    // 删除品牌信息
    removeTrademark() {
      // 置空
      this.searchParams.trademark = undefined;
      // 发请求
      this.getData();
    },
    // 删除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      // 再次发请求
      this.getData();
    },
    // 收集平台属性
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
      }
    },
    // 自定义事件回调，处理子组件传来的数据
    tradeMarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发请求
      this.getData();
    },
    // 点击综合和价格改变排序
    changeOrder(flag) {
      // flag表示用户点击的是综合还是价格
      let origin = this.searchParams.order.split(":");
      let originFlag = origin[0];
      let originSort = origin[1];
      let newOrder = "";
      // 是否点击当前Flag
      if (originFlag == flag) {
        // 假如是当前
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
        // 不是当前
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    // 自定义回调，获取当前是第几页
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      // 再次发请求
      this.getData();
    },
  },
  // 数据监听：监听组件实例身上的属性值变化,发生变化的话就再次发送请求
  watch: {
    $route(newValue, oldValue) {
      // 再次发送请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 发请求
      this.$store.dispatch("getSearchList", this.searchParams);
      // 请求完毕后应把相应的一二三级分类id置空，让他接收下一次的相应id
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>