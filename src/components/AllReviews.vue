<template>
  <div class="all-reviews">
    <h2>All Reviews</h2>

    <div v-if="allProducts.length">
      <div v-for="product in allProducts" :key="product" class="product-reviews">
        <h3>{{ product }}</h3>
        <p>Average Rating: {{ getAvgRating(product).toFixed(1) }}</p>

        <ul>
          <li v-for="r in getReviews(product)" :key="r.timestamp">
            <strong>{{ r.user }}</strong>:
            {{ r.rating }}/5 - {{ r.comment || 'No comment' }}
            <small>({{ r.date }})</small>
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <p>No reviews yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 读取 localStorage 中的评论
const reviews = ref(JSON.parse(localStorage.getItem('reviews') || '[]'))

// 获取所有产品名称（去重）
const allProducts = computed(() => {
  const products = reviews.value.map(r => r.target)
  return [...new Set(products)]
})

// 返回某个产品的评论
const getReviews = (product) => {
  return reviews.value
    .filter(r => r.target === product)
    .sort((a, b) => b.timestamp - a.timestamp) // 最新在前
}

// 返回某个产品的平均分
const getAvgRating = (product) => {
  const productReviews = reviews.value.filter(r => r.target === product)
  if (!productReviews.length) return 0
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0)
  return sum / productReviews.length
}
</script>

<style scoped>
.all-reviews {
  max-width: 700px;
  margin: 0 auto;
}

.product-reviews {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.product-reviews h3 {
  margin-bottom: 5px;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin-bottom: 8px;
}
</style>
