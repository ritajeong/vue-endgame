<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="password">password: </label>
      <input id="password" type="text" v-model="password" />
    </div>
    <div>
      <label for="nickname">nickname: </label>
      <input id="nickname" type="text" v-model="nickname" />
    </div>
    <button type="submit">회원 가입</button>
    <p>{{ logMessage }}</p>
  </form>
</template>
<script>
import { registerUser } from '@/api/index';

export default {
  data() {
    return {
      //form value
      username: '',
      password: '',
      nickname: '',
      //log
      logMessage: '',
    };
  },
  methods: {
    async submitForm() {
      console.log('폼제출');
      const userDate = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      };
      const { data } = await registerUser(userDate); //destructuring(구조분해할당 or 비구조화할당)
      this.logMessage = `${data.username}님이 가입되었습니다.`; //ES6 템플릿 리터럴(백틱)
      console.log(data.username);
      this.initForm();
    },
    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>
<style></style>
