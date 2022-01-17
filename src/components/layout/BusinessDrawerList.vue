<template>
  <q-expansion-item class="text-grey-9">
    <template v-slot:header>
      <q-item-section avatar top>
        <q-avatar size="md" icon="mdi-store" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">Entidades</q-item-label>
      </q-item-section>
    </template>
    <q-list class="q-pl-lg">
      <!-- Órganos add -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAIN }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-cube-outline" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Órganos / Empresas</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Órganos add -->

      <!-- Dep add -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAIN }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-cube-unfolded" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Unidades / Departamentos</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Dep add -->

      <!-- Dep add -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAIN }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-account-multiple" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-grey-9" lines="1">Cargos</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Dep add -->
    </q-list>
  </q-expansion-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { ROUTE_NAME } from 'src/router';
/**
 * BusinessDrawerList
 */
export default defineComponent({
  name: 'BusinessDrawerList',
  setup() {
    return {
      ROUTE_NAME
    }
  }
});
</script>