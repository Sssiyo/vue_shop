<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="danger" @click="logout">退出登录</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollape">| | |</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#86c5a3"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span class="one">{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        125: "iconfont icon-duoren",
        103: "iconfont icon-lock",
        101: "iconfont icon-app",
        102: "iconfont icon-biaoge1",
        145: "iconfont icon-biaodanbiaoqian",
      },
      // 侧边栏是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "",
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleCollape() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },

    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200)
        return this.$message.console.error(res.meta.msg);
      this.menulist = res.data;
      console.log(res);
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  background-color: #17a783;
  color: #333;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  margin-left: 15px;
}
.toggle-button {
  background-color: #4a5;
}
.el-aside {
  background-color: #86c5a3;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.toggle-button {
  background-color: #4a5;
  font-size: 10px;
  line-height: 24px;
  cursor: pointer;
}
.el-menu {
  border-right: none;
}
.el-main {
  background-color: #b4e2da;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.iconfont {
  margin-right: 10px;
}
.one {
  font-size: 16px;
}
</style>
