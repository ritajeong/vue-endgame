import { posts } from './index';

// 학습노트 CRUD API
// 학습 노트 데이터 조회 API
// 학습 노트 데이터 조회 API
function fetchPosts() {
  return posts.get('');
}

// 학습 노트 생성 API
function createPost(postData) {
  return posts.post('', postData);
}

// 학습 노트 수정 API
// 학습 노트 삭제 API

export { fetchPosts, createPost };
