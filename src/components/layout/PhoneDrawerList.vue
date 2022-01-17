<template>
  <q-expansion-item class="text-grey-9">
    <template v-slot:header>
      <q-item-section avatar top>
        <q-avatar size="md" icon="mdi-phone" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">Teléfonos</q-item-label>
      </q-item-section>
    </template>
    <q-list class="q-pl-lg">
      <!-- Phone suscribe -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.PHONE_FORM }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-phone-plus" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Alta</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Phone suscribe -->

      <!-- Phone Unsuscribe -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAIN }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-phone-minus" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Baja</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Phone Unsuscribe -->

      <!-- Phone Find -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.PHONE_SEARCH }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-magnify" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Buscar</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Phone Find -->
    </q-list>
  </q-expansion-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { ROUTE_NAME } from 'src/router';
/**
 * PhoneDrawerList
 */
export default defineComponent({
  name: 'PhoneDrawerList',
  setup() {
    return {
      ROUTE_NAME
    }
  }
});
</script>