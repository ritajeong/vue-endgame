<template>
  <div class="contents">
    <h1 class="page-header">Create Post</h1>
    <div class="form-wrapper">
      <form class="form" v-on:submit.prevent="submitForm">
        <div>
          <label for="title">Title:</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="contents">Contents:</label>
          <textarea id="contents" type="text" rows="5" v-model="contents" />
          <p class="validation-text warning" v-if="!isContentsValid">
            Contents must be less than 200
          </p>
        </div>
        <button type="submit" class="btn">Create</button>
      </form>
      <p>{{ logMessage }}</p>
    </div>
  </div>
</template>
<script>
import { createPost } from '@/api/posts';
export default {
  data() {
    return {
      title: '',
      contents: '',
      logMessage: '',
    };
  },
  computed: {
    isContentsValid() {
      return this.contents.length <= 200;
    },
  },
  methods: {
    async submitForm() {
      try {
        const response = await createPost({
          title: this.title,
          contents: this.contents,
        });
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = '글 등록에 실패했습니다.';
      }
    },
  },
};
</script>
<style scoped>
.form-wrapper .form {
  width: 100%;
}
.btn {
  color: white;
}
</style>
