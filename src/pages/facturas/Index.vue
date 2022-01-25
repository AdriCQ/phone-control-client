<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>Lorem ipsum dolor sit amet, consectetur adipiscing elit</q-card-section>
      <q-card-section>
        <factura-zip-form />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent } from 'vue'

/**
 * facturaIndexPage
 */
export default defineComponent({
  name: 'facturaIndexPage',
  components: {
    'factura-zip-form': defineAsyncComponent(() => import('src/components/forms/UploadFactura.vue'))
  }
});
</script>