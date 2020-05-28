<template>
  <div id="app">
    <!-- <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in images" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel> -->

    <MySwiper>
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3505635486,3006958704&fm=26&gp=0.jpg" alt="">
    </MySwiper>


    <MyLayout>
        <template v-slot:header>
          <div>我是头部</div>
        </template>

        <div>我是内容</div>

        <template v-slot:footer>
          <div>
            我是底部
          </div>
        </template>
    </MyLayout>

    <MyTable :data="persons">
      <template slot-scope="scope">
        <div :style="{color:scope.row.age > 18 ? 'green' : 'red'}">
          {{scope.row.name}}---{{scope.row.age}}
        </div>
      </template>
    </MyTable>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MySwiper from './components/MySwiper'
import MyLayout from './components/MyLayout'
import MyTable from './components/MyTable'

export default {
  name: 'app',
  components: {
    // HelloWorld
    MySwiper,
    MyLayout,
    MyTable
  },
  data(){
    return {
      images:[
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2271248055,1664460237&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2040120582,4245895937&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1446163485,3564402207&fm=26&gp=0.jpg'
      ],
      persons:[
        {id:1001,name:'天山童姥',age:16},
        {id:1002,name:'虚竹',age:25},
        {id:1003,name:'小昭',age:15}
      ]
    }
  }
}
</script>

<style>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

