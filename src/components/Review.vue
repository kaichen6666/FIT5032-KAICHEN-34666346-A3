<template>
  <div class="review">
    <h3>Rate {{ target }}</h3>

    <!-- Rating Form -->
    <div class="review-form mb-4">
      <label>Rating:</label>
      <select v-model="rating">
        <option value="">Select rating</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }} ⭐</option>
      </select>

      <label class="mt-2">Comment:</label>
      <input type="text" v-model="comment" placeholder="Share your thoughts..." maxlength="200" />

      <button class="btn btn-primary mt-2" @click="submitReview" :disabled="!rating">
        Submit Review
      </button>
    </div>

    <!-- Rating Summary -->
    <div v-if="targetReviews.length" class="review-summary mt-4">
      <div class="rating-overview">
        <h4>Reviews for {{ target }}</h4>

        <!-- Aggregate score -->
        <div class="aggregate-rating">
          <div class="rating-score">
            <span class="avg-rating">{{ avgRating.toFixed(1) }}</span>
            <span class="rating-stars">{{ getStarDisplay(avgRating) }}</span>
          </div>
          <div class="rating-count">
            Based on {{ totalReviews }} review{{ totalReviews !== 1 ? 's' : '' }}
          </div>
        </div>

        <!-- Comment list -->
        <div class="reviews-list">
          <h5>Individual Reviews:</h5>
          <ul class="list-group mt-2">
            <li v-for="(r, index) in sortedReviews" :key="r.timestamp" class="list-group-item">
              <div class="review-header">
                <strong>{{ r.user }}</strong>
                <span class="rating-display">{{ getStarDisplay(r.rating) }} ({{ r.rating }}/5)</span>
              </div>
              <p class="review-comment">{{ r.comment || 'No comment provided' }}</p>
              <small class="review-date">{{ r.date }}</small>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="no-reviews">
      <p>No reviews yet. Be the first to review {{ target }}!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  target: { type: String, required: true }
})

// 从 localStorage 读取已有评论
const reviews = ref(JSON.parse(localStorage.getItem('reviews') || '[]'))

const rating = ref('')
const comment = ref('')

const submitReview = () => {
  if (!rating.value) return alert('Please select a rating!')

  const newReview = {
    user: 'CurrentUser',  // 登录用户名替换
    target: props.target,
    rating: parseInt(rating.value),
    comment: comment.value.trim(),
    date: new Date().toLocaleString(),
    timestamp: Date.now()
  }

  reviews.value.push(newReview)

  // 保存到 localStorage
  localStorage.setItem('reviews', JSON.stringify(reviews.value))

  // 重置表单
  rating.value = ''
  comment.value = ''
}

// 筛选当前 target 的评论
const targetReviews = computed(() => reviews.value.filter(r => r.target === props.target))

// 总数
const totalReviews = computed(() => targetReviews.value.length)

// 平均分
const avgRating = computed(() => {
  if (!targetReviews.value.length) return 0
  const sum = targetReviews.value.reduce((acc, r) => acc + r.rating, 0)
  return sum / targetReviews.value.length
})

// 按时间排序，最新在前
const sortedReviews = computed(() => [...targetReviews.value].sort((a, b) => b.timestamp - a.timestamp))

// 显示星星
const getStarDisplay = (rating) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  return '⭐'.repeat(fullStars) + '✨'.repeat(halfStar) + '☆'.repeat(5 - fullStars - halfStar)
}
</script>

<style scoped>
/* 样式保持原样即可 */
</style>
