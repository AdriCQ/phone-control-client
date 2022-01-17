<template>
  <q-page padding>
    <q-card>
      <tel-form style="max-width: 30rem;" :update-id="updateId" />
    </q-card>
  </q-page>
</template>

<script lang='ts'>
import { ref, defineAsyncComponent, defineComponent, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

/**
 * FormTelPage
 */
export default defineComponent({
  name: 'FormTelPage',
  components: {
    'tel-form': defineAsyncComponent(() => import('src/components/forms/TelForm.vue'))
  },
  setup() {
    const $route = useRoute();

    onBeforeMount(() => {
      if ($route.query.id && !isNaN(Number($route.query.id))) {
        updateId.value = Number($route.query.id);
      }
    })
    const updateId = ref(0);

    return { updateId }

  }
});
</script>