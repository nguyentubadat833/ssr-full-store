<script setup lang="tsx">

const route = useRoute()
const {navLinksPrimary, navLinksSecondary} = useNav()
const {data: authData, signOut, signIn} = useAuth()
const {pageName, contact, category} = await queryContent('/meta').findOne()

const isOpenToggleMenu = ref(false)
const categorySlideover = computed(() => {
  if (Array.isArray(category) && category.length > 0) {
    let result = []
    category.forEach(el => {
      if (Array.isArray(el) && el.length > 0) {
        el.forEach(e => {
          result.push(e)
        })
      }
    })
    return result
  }
  return []
})

async function toShoppingCartPage() {
  await navigateTo('/shopping/cart')
}

async function slideoverToPage(link: any) {
  await navigateTo(link)
  isOpenToggleMenu.value = false
}

const userDropdownItems = ref([
  [{
    label: 'Profile',
    icon: 'ic:baseline-account-circle',
    click: () => navigateTo('/profile')
  }],
  [
    {
      label: 'Shopping Cart',
      icon: 'ic:sharp-shopping-cart',
      click: async () => await toShoppingCartPage()
    }
  ],
  [{
    label: 'Logout',
    icon: 'ic:round-log-out',
    click: () => signOut()
  }]
])

const Logo = () => (
    <div style="grid-area: logo" class="flex items-center gap-3">
      <Icon name="fluent-emoji-flat:books" size="35"/>
      <span
          class="text-primary-600 dark:text-primary-200 font-extrabold font-serif text-xl">{pageName}</span>
    </div>
)

// async function toSignIn() {
//   const width = 500;
//   const height = 500;
//
//   const screenWidth = window.screen.width;
//   const screenHeight = window.screen.height;
//
//   const left = (screenWidth - width) / 2;
//   const top = (screenHeight - height) / 2;
//   await navigateTo('/auth/signIn', {
//     open: {
//       target: "_blank",
//       windowFeatures: {
//         width: 500,
//         height: 500 + 100,
//         top: top - 100,
//         left: left
//       }
//     }
//   })
//
</script>

<template>
  <nav>
    <div class="bg-orange-400">
      <div class="max-w-[70rem] mx-auto py-2 sm:px-4 pl-3">
        <div class="flex justify-between">
          <div class="flex items-center gap-1">
            <Icon name="ic:baseline-local-phone" size="18" class="text-zinc-700"/>
            <span class="text-sm text-zinc-700 font-medium">{{ contact?.phone }}</span>
          </div>
          <div class="flex text-sm gap-4 text-zinc-700 font-medium">
            <div class="flex gap-4 items-center">
              <span v-for="item in navLinksSecondary" class="cursor-pointer hover:underline"
                    :class="{'underline font-bold': route.fullPath === item?.link}"
                    @click="navigateTo(item.link)">{{ item.text }}</span>
            </div>
            <div class="h-5 flex items-center gap-2">
              <span v-if="!authData" class="hover:underline cursor-pointer" @click="signIn">Sign In</span>
              <span v-else class="hover:underline cursor-pointer" @click="signOut">Logout</span>
              <ColorModeToggle/>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="max-w-[70rem] mx-auto px-4">
      <div class="flex items-center justify-between navbar-grid py-7">
        <Logo @click="navigateTo('/')" class="cursor-pointer"/>
        <div style="grid-area: primary-menu" class="flex justify-center py-4">
          <!--          <UButton icon="ic:baseline-menu" class="w-9 flex justify-center md:hidden" @click="isOpenToggleMenu = true"/>-->
          <UButton icon="ic:baseline-menu" class="w-9 flex justify-center md:hidden" @click="isOpenToggleMenu = true"/>
          <UDropdown :items="[...category]" :popper="{ placement: 'bottom-start' }" class="md:block hidden"
                     :ui="{width: 'w-auto'}">
            <UButton color="orange" label="Category" trailing-icon="i-heroicons-chevron-down-20-solid"
                     icon="ic:baseline-menu"/>
            <template #item="{ item }">
              <span class="w-full text-left" @click="navigateTo(item.link)">{{ item.label }}</span>
            </template>
          </UDropdown>
          <!--          <ULink-->
          <!--              v-for="(navLink, index) in navLinksPrimary"-->
          <!--              :key="index"-->
          <!--              :label="navLink.text"-->
          <!--              :to="navLink.link"-->
          <!--              variant="link"-->
          <!--              class="hover:text-primary underline-offset-8 font-medium md:block hidden"-->
          <!--              active-class="text-primary underline"-->
          <!--              exact-->
          <!--          >{{ navLink.text }}-->
          <!--          </ULink>-->
        </div>
        <div style="grid-area: secondary-menu" class="flex items-center gap-3">
          <!--          <ColorModeToggle class="sm:block hidden"/>-->
          <div v-if="!authData" @click="toShoppingCartPage" class="flex items-center">
            <UButton class="rounded-lg md:block hidden" variant="ghost">
              <div class="flex items-center gap-2">
                <UIcon name="ic:sharp-shopping-cart" class="text-2xl"/>
                <span class="text-base">Buy Now</span>
              </div>
            </UButton>
            <Icon name="ic:sharp-shopping-cart" size="25" class="bg-primary md:hidden"/>
          </div>

          <UDropdown v-if="authData" :items="userDropdownItems" :popper="{ placement: 'bottom-start' }">
            <UAvatar
                :src="authData?.user.image"
                alt="Avatar"
                size="md"
            />
          </UDropdown>
          <!--          <UButton v-else label="Sign In" @click="signIn" class="sm:block hidden"/>-->

        </div>
        <div style="grid-area: search">
          <UInput
              placeholder="Search..."
              size="sm"
              trailing-icon="i-material-symbols-search-rounded"
              class="w-full min-w-64"
          />
        </div>
      </div>

    </div>

    <ClientOnly>
      <USlideover v-model="isOpenToggleMenu" side="left" class="w-80">
        <div class="px-4 py-8 flex flex-col min-h-screen">
          <div class="mb-16">
            <Logo/>
            <!--            <ColorModeToggle/>-->
          </div>

          <div class="flex flex-col gap-6 flex-1">
              <span v-for="item in categorySlideover" @click="slideoverToPage(item?.link)"
                    class="hover:text-primary underline-offset-8 text-xl w-full py-2 font-semibold border-b"
                    :class="{'text-primary font-bold border-primary': route.fullPath === item?.link}">{{
                  item?.label
                }}</span>
          </div>
          <div>
            <UButton v-if="!authData" label="Sign In" icon="ic:outline-log-in" @click="signIn" block/>
          </div>
        </div>
      </USlideover>
    </ClientOnly>
  </nav>
</template>

<style scoped lang="scss">
.navbar-grid {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-template-areas: 'primary-menu logo secondary-menu' 'search search search';
  gap: 20px;
}

@media (min-width: 900px) {
  .navbar-grid {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto;
    grid-template-areas: 'logo primary-menu search secondary-menu';
  }
}

//@media (min-width: 768px) {
//  .navbar-grid {
//    display: grid;
//    grid-template-columns: auto auto auto;
//    grid-template-rows: auto auto;
//    grid-template-areas: 'logo search secondary-menu' 'primary-menu primary-menu primary-menu';
//    gap: 20px;
//  }
//}
//
//@media (min-width: 1280px) {
//  .navbar-grid {
//    display: grid;
//    grid-template-columns: auto auto auto auto;
//    grid-template-rows: auto;
//    grid-template-areas: 'logo primary-menu search secondary-menu';
//  }
//}

</style>