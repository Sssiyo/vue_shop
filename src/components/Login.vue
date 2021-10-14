<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/log.png" alt="" />
      </div>

      <!-- 登录表单区 -->
      <el-form
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-yonghu-xianxing"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-lock"
            type="password"
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="success" @click="login">登录</el-button>
          <el-button type="info" @click="resetloginFormRef">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 这是登陆表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur",
          },
          { min: 3, max: 10, message: "名称长度在3-10之间哦", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 6, max: 15, message: "密码长度在6-15之间哦", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置表单
    resetloginFormRef() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200)
          return this.$message.error("用户名或密码错误");
        this.$message.success("登陆成功");
        // 登陆成功后
        // 将登陆成功后的tocken保存到客户端的sessionstorage中

        // 项目中除了登陆以外的其他API接口，必须在登陆之后才能访问
        // tocken只应当在当前网站打开期间生效，所以将tocken保存在sessionstorage中
        window.sessionStorage.setItem("token", res.data.token);
        // 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style scoped>
.login_container {
  position: relative;
  background-color: #2b4b;
  height: 100%;
}
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
}
.avatar_box {
  position: absolute;
  left: 37%;
  top: -20%;
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 3px;
  box-shadow: 0 0 5px #ddd;
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
