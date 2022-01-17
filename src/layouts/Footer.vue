<template>
  <q-footer elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title class="text-center text-body1">
        <div>
          Copyright
          <q-icon name="mdi-copyright" />
          OICC {{ new Date().getFullYear() }} MININT-CIENFUEGOS
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

/**
 * Footer
 */
export default defineComponent({
  name: 'Footer'
});
</script>