<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <div v-if="isLoading">
        Loading...
        <LoadingSpinner vi-if="isLoading"></LoadingSpinner>
      </div>
      <ul>
        <postListItem
          v-for="postItem in postItems"
          v-bind:key="postItem._id"
          v-bind:postItem="postItem"
        ></postListItem>
      </ul>
    </div>
    <router-link to="/add" class="create-button">
      <i class="ion-md-add"></i>
    </router-link>
  </div>
</template>

<script>
import { fetchPosts } from '@/api/posts';
import PostListItem from '../components/posts/PostListItem.vue';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';
export default {
  components: { PostListItem, LoadingSpinner },
  data() {
    return {
      postItems: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      const { data } = await fetchPosts();
      this.isLoading = false;
      console.log(data.posts);
      this.postItems = data.posts;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
