<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const curPath = computed(() => route.path)
function go(path: string) {
  router.push({
    path,
  })
}
const demos = computed(() => router.options.routes.filter(i => i.path.startsWith('/demos/')).reverse())
</script>

<template>
  <div fixed top-0 bottom-0 right-0 shadow overflow-overlay scrollbar="~ w-0px" style="width: 120px;">
    <ul list-none>
      <li>
        <button m-3 text-sm btn :class="{ 'bg-gray': curPath !== '/' }" @click="go('/')">
          HOME
        </button>
      </li>
      <li v-for="(i, idx) in demos" :key="i.path">
        <button
          m-3 text-sm btn
          :class="{ 'bg-gray': curPath !== i.path }"
          @click="go(i.path)"
        >
          DEMO {{ idx + 1 }}
        </button>
      </li>
    </ul>
  </div>
</template>
