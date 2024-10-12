<script setup lang="tsx">

const route = useRoute()
const switchLocalePath = useSwitchLocalePath()
const categoryCodeSelected = ref()
const localePath = useLocalePath()
const {data} = useCategory
const {locale, locales, setLocale, t} = useI18n()
const {navLinksSecondary} = useNav()
const {data: authData, signOut, signIn} = useAuth()
const {pageName, contact, category} = await queryContent('/meta').findOne()

const {data: categoryDataDropDown} = await useLazyAsyncData('categoryDataDropDown', () => data(), {
  transform: (input) => {
    let result = []
    result.push(input)
    return result
  }
})

const isOpenToggleMenu = ref(false)
const {data: categorySlideover} = await useLazyAsyncData('categorySlideover', () => data())

async function slideoverToPage(link: string, code: string) {
  if (isString(link) && isString(code)) {
    categoryCodeSelected.value = code
    await navigateTo(link)
    isOpenToggleMenu.value = false
  }
}

const userDropdownItems = ref([
  [{
    label: 'Profile',
    icon: 'ic:baseline-account-circle',
    click: () => navigateTo(localePath('profile'))
  }],
  [
    {
      label: 'Shopping Cart',
      icon: 'ic:sharp-shopping-cart',
      click: () => navigateTo(localePath('shopping-cart'))
    },
    {
      label: "Shopping History",
      icon: 'ic:baseline-history',
      click: () => navigateTo(localePath('shopping-history'))
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

async function switchLang(lang: string) {
  setLocale(lang)
  const path = switchLocalePath(lang)
  await navigateTo(path)
}

const items = computed(() => {
  let result = []
  const items = [...locales.value]
  items.forEach(el => {
    if (el.code === 'en') {
      el.icon = 'flag:us-4x3'
      el.label = 'EN'
    } else if (el.code === 'vi') {
      el.icon = 'flag:vn-4x3'
      el.label = 'VI'
    }
  })
  result.push(items)
  return result
})


</script>

<template>
  <nav>
    <div class="bg-orange-400">
      <div class="max-w-[70rem] mx-auto py-2 sm:px-4 px-3">
        <div class="flex justify-between">
          <div class="flex items-center gap-1">
            <Icon name="ic:baseline-local-phone" size="18" class="text-zinc-700"/>
            <span class="text-sm text-zinc-700 font-medium">{{ contact?.phone }}</span>
          </div>
          <div class="flex text-sm gap-4 text-zinc-700 font-medium">
            <div class="flex gap-4 items-center">
              <NuxtLinkLocale v-for="item in navLinksSecondary" :to="item.link">
                <span class="cursor-pointer hover:underline"
                      :class="{'underline font-bold': route.fullPath === item?.link}">{{ item.text }}</span>
              </NuxtLinkLocale>
            </div>
            <div class="hover:underline cursor-pointer hidden md:block">
              <NuxtLinkLocale v-if="!authData" to="auth-signIn"> {{ t('signIn') }}</NuxtLinkLocale>
              <span v-else @click="signOut"> {{ t('signOut') }}</span>
            </div>
            <div class="h-5 flex items-center gap-2">
              <ColorModeToggle class="hidden md:block"/>
              <UDropdown :items="items" :popper="{ arrow: true }" class="flex items-center">
                <template #item="{item}">
                  <div class="flex items-center gap-3 w-full" @click="switchLang(item.code)">
                    <Icon :name="item.icon"/>
                    <span>{{ item.name }}</span>
                  </div>
                </template>
                <Icon v-if="locale === 'en'" name="flag:us-4x3" size="20"/>
                <Icon v-else name="flag:vn-4x3" size="20"/>
              </UDropdown>
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
          <UDropdown :items="[...categoryDataDropDown]" :popper="{ placement: 'bottom-start' }"
                     class="md:block hidden"
                     :ui="{width: 'w-auto'}">
            <UButton color="orange" :label="t('category')" trailing-icon="i-heroicons-chevron-down-20-solid"
                     icon="ic:baseline-menu"/>
            <template #item="{ item }">
              <!--              <span class="w-full text-left" @click="navigateTo(item.link)"-->
              <!--                    :class="[{'font-bold': route.fullPath === item.link}]">{{ item.label }}</span>-->
              <NuxtLinkLocale :to="`/category/${item.alias}`" class="max-w-80 text-left">
                <span class="truncate"
                      :class="[{'font-bold': route.fullPath === localePath(`/category/${item.alias}`)}]">{{ item.name }}</span>
              </NuxtLinkLocale>
            </template>
          </UDropdown>
        </div>
        <div style="grid-area: secondary-menu" class="flex items-center gap-3">
          <!--          <ColorModeToggle class="sm:block hidden"/>-->
          <div v-if="!authData" class="flex items-center">
            <NuxtLinkLocale to="shopping-cart">
              <UButton class="rounded-lg md:block hidden" variant="ghost">
                <div class="flex items-center gap-2">
                  <UIcon name="ic:sharp-shopping-cart" class="text-2xl"/>
                  <span class="text-base">{{ t('buyNow') }}</span>
                </div>
              </UButton>
              <Icon name="ic:sharp-shopping-cart" size="25" class="bg-primary md:hidden"/>
            </NuxtLinkLocale>
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
          <div class="mb-16 flex items-center justify-between">
            <Logo/>
            <ColorModeToggle/>
          </div>

          <div class="flex flex-col gap-6 flex-1 overflow-hidden overflow-y-scroll py-5">
              <span v-for="item in categorySlideover" @click="slideoverToPage(`/category/${item.alias, item.code}`)"
                    class="hover:text-primary underline-offset-8 text-xl w-full py-2 font-semibold border-b"
                    :class="{'text-primary font-bold border-primary': item.code === categoryCodeSelected}">{{
                  item?.name
                }}</span>
          </div>
          <div>
            <NuxtLinkLocale v-if="!authData" to="auth-signIn">
              <UButton :label="t('signIn')" block/>
            </NuxtLinkLocale>
            <UButton v-else :label="t('signOut')" block @click="signOut"/>
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