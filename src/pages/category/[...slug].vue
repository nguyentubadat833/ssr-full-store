<script setup>
definePageMeta({
  title: 'Category',
  navOrder: 2,
  // type: 'primary'
})

const route = useRoute()

const products = [
  {
    category: 'Sách trước 1975',
    name: 'Đức giáo hoàng',
    price: '300.000đ',
    image: 'https://muasachcu.com/wp-content/uploads/2023/11/Duc-Giao-Hoang-Gioan-XXIII-1962-300x300.jpg'
  },
  {
    category: 'Sách trước 1975',
    name: 'Việt Nam học giảng minh',
    price: '250.000đ',
    image: 'https://muasachcu.com/wp-content/uploads/2023/11/Viet-Nam-Van-Hoc-Giang-Minh-1974-300x300.jpg'
  },
  {
    category: 'Sách trước 1975',
    name: 'Việt nam sử học',
    price: '175.000đ',
    image: 'https://muasachcu.com/wp-content/uploads/2023/11/Viet-Nam-Su-Luoc-Tron-bo-2-tap-1971-300x300.jpg'
  },
  {
    category: 'Sách trước 1975',
    name: 'Pháp chế sử việt nam',
    price: '180.000đ',
    image: 'https://muasachcu.com/wp-content/uploads/2023/11/Phap-Che-Su-Viet-Nam-1968-300x300.jpg'
  },
  {
    category: 'Sách trước 1975',
    name: 'Đức giáo hoàng',
    price: '300.000đ',
    image: 'https://muasachcu.com/wp-content/uploads/2023/11/Duc-Giao-Hoang-Gioan-XXIII-1962-300x300.jpg'
  },
  {
    category: 'Sách trước 1975',
    name: 'Việt Nam học giảng minh',
    price: '250.000đ',
    image: 'https://muasachcu.com/wp-content/uploads/2023/11/Viet-Nam-Van-Hoc-Giang-Minh-1974-300x300.jpg'
  },
  {
    category: 'Sách trước 1975',
    name: 'Việt nam sử học',
    price: '175.000đ',
    image: 'https://muasachcu.com/wp-content/uploads/2023/11/Viet-Nam-Su-Luoc-Tron-bo-2-tap-1971-300x300.jpg'
  },
  {
    category: 'Sách trước 1975',
    name: 'Pháp chế sử việt nam',
    price: '180.000đ',
    image: 'https://muasachcu.com/wp-content/uploads/2023/11/Phap-Che-Su-Viet-Nam-1968-300x300.jpg'
  }
]

</script>

<template>
  <div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      <div v-for="item in products"
           class="w-full sm:aspect-[4/7] aspect-[4/8] border shadow flex flex-col items-center gap-2 overflow-hidden"
           :class="[{'border-b border-gray-700': useColorMode().value === 'dark'}]">
        <img :src="item.image" class="hover:scale-110 transition-transform duration-700 cursor-pointer w-full"/>
        <div class="flex flex-col items-center justify-between h-full w-full sm:py-2 py-1">
          <span class="text-gray-400 text-xs">{{ useToUpper(item?.category) }}</span>
          <span class="truncate sm:overflow-visible sm:whitespace-normal w-5/6 text-center text-sm hover:underline hover:text-primary cursor-pointer">{{ item.name }}</span>
          <div class="flex flex-col items-center w-full px-4 pb-2 gap-2">
            <span class="text-red-600 font-bold text-lg">{{ item.price }}</span>
            <UButton label="Add to cart" block/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>