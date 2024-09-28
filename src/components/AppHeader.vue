<script setup>
const {navLinksPrimary} = useNav()
const {data: authData, signOut, signIn} = useAuth()

const items = ref([
  [{
    label: 'Profile',
    avatar: {
      src: authData.value?.user?.image
    }
  }],
  [
    {
      label: 'Shopping Cart',
      icon: 'ic:sharp-shopping-cart'
    }
  ],
  [{
    label: 'Logout',
    icon: 'ic:round-log-out',
    click: () => signOut()
  }]
])
</script>

<template>
  <nav class="container mx-auto px-4">
    <div class="flex h-full items-center justify-between navbar-grid py-4">
      <div style="grid-area: logo">
        LOGO
      </div>
      <div style="grid-area: primary-menu" class="flex space-x-4">
        <ULink
            v-for="(navLink, index) in navLinksPrimary"
            :key="index"
            :label="navLink.text"
            :to="navLink.link"
            variant="link"
            class="hover:text-primary underline-offset-8"
            color="gray"
            active-class="text-primary underline"
            exact
        >{{ navLink.text }}
        </ULink>
      </div>
      <div style="grid-area: secondary-menu" class="flex items-center gap-2">
        <ColorModeToggle/>
        <UButton class="rounded-lg" variant="ghost" v-if="!authData">
          <UIcon name="ic:sharp-shopping-cart" class="text-2xl"/>
        </UButton>
        <UDropdown v-if="authData" :items="items" :popper="{ placement: 'bottom-start' }">
          <UAvatar
              :src="authData?.user.image"
              alt="Avatar"
          />
        </UDropdown>
        <UButton v-else label="Sign In" @click="signIn"/>

      </div>
      <div style="grid-area: search">
        <UFormGroup hint="Optional">
          <UInput
              placeholder="Search..."
              size="sm"
              trailing-icon="i-material-symbols-search-rounded"
              class="w-full"
          />
        </UFormGroup>
      </div>
    </div>
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