<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">id:</label>
          <input id="username" type="text" v-model="username" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && username">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="btn"
        >
          로그인
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>
<script>
import { loginUser } from '@/api/index';
import { validateEmail } from '@/utils/validation';
export default {
  data() {
    return {
      //form value
      username: '',
      password: '',
      //log
      logMessage: '',
      logEmail: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username); //username이 한글자한글자 바뀔 때마다 체크해줌
    },
  },
  methods: {
    async submitForm() {
      try {
        //비즈니스 로직
        const userData = {
          username: this.username,
          password: this.password,
        };
        const { data } = await loginUser(userData);
        console.log(data.user.username);
        console.log(data.token);
        this.$store.commit('setToken', data.token);

        this.$store.commit('setUsername', data.user.username);
        this.$router.push('/main'); //로그인 후 메인페이지로 이동

        // this.logMessage = `${data.user.username}님 환영합니다`;
      } catch (error) {
        console.log(error.response);
        this.logMessage = '로그인에 실패했습니다.';
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>
<style>
.btn {
  color: white;
}
</style>
