<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id:</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="password">pw:</label>
      <input id="password" type="text" v-model="password" />
    </div>
    <button v-bind:disabled="!isUsernameValid || !password" type="submit">
      로그인
    </button>
    <p>{{ isUsernameValid ? '' : '이메일 형식으로 입력해주세요' }}</p>
    <p>{{ logMessage }}</p>
  </form>
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
        console.log(data);
        this.logMessage = `${data.user.username}님 환영합니다`;
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
<style></style>
