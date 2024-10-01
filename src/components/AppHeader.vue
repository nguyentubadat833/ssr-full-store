<script setup lang="tsx">

const route = useRoute()
const {navLinksPrimary} = useNav()
const {data: authData, signOut, signIn} = useAuth()
const {pageName} = await queryContent('/meta').findOne()

const isOpenToggleMenu = ref(false)

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
      <Icon name="i-fluent-emoji:shopping-bags" size="35"/>
      <span
          class="text-primary-600 dark:text-primary-200 font-extrabold font-serif sm:text-xl text-md">{pageName}</span>
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
    <div>
      <span></span>
    </div>
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between navbar-grid py-7">
        <Logo class="select-none"/>
        <div style="grid-area: primary-menu" class="flex justify-center space-x-4 py-4">
          <UButton icon="ic:baseline-menu" class="w-9 flex justify-center md:hidden" @click="isOpenToggleMenu = true"/>
          <ULink
              v-for="(navLink, index) in navLinksPrimary"
              :key="index"
              :label="navLink.text"
              :to="navLink.link"
              variant="link"
              class="hover:text-primary underline-offset-8 font-medium md:block hidden"
              active-class="text-primary underline"
              exact
          >{{ navLink.text }}
          </ULink>
        </div>
        <div style="grid-area: secondary-menu" class="flex items-center gap-3">
          <ColorModeToggle class="sm:block hidden"/>
          <UButton class="rounded-lg" variant="ghost" v-if="!authData" @click="toShoppingCartPage">
            <UIcon name="ic:sharp-shopping-cart" class="text-2xl"/>
          </UButton>
          <UDropdown v-if="authData" :items="userDropdownItems" :popper="{ placement: 'bottom-start' }">
            <UAvatar
                :src="authData?.user.image"
                alt="Avatar"
                size="md"
            />
          </UDropdown>
          <UButton v-else label="Sign In" @click="signIn" class="sm:block hidden"/>

        </div>
        <div style="grid-area: search">
          <UInput
              placeholder="Search..."
              size="sm"
              trailing-icon="i-material-symbols-search-rounded"
              class="w-full"
          />
        </div>
      </div>
    </div>

    <ClientOnly>
      <USlideover v-model="isOpenToggleMenu" side="left" class="w-80">
        <div class="px-4 py-8 flex flex-col min-h-screen">
          <div class="flex justify-between items-center mb-16">
            <Logo/>
            <ColorModeToggle/>
          </div>

          <div class="flex flex-col gap-6 flex-1">
              <span v-for="item in navLinksPrimary" @click="slideoverToPage(item?.link)"
                    class="hover:text-primary underline-offset-8 text-xl w-full py-2 font-semibold border-b"
                    :class="{'text-primary font-bold border-primary': route.fullPath === item?.link}">{{
                  item?.text
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

@media (min-width: 768px) {
  .navbar-grid {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    grid-template-areas: 'logo search secondary-menu' 'primary-menu primary-menu primary-menu';
    gap: 20px;
  }
}

@media (min-width: 1280px) {
  .navbar-grid {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto;
    grid-template-areas: 'logo primary-menu search secondary-menu';
  }
}

</style>