<template>
  <q-card class="no-box-shadow text-grey-9">
    <q-card-section>
      <div class="text-h6">Detalles</div>
    </q-card-section>
    <q-card-section class="q-gutter-y-xs">
      <div class="text-body1">Número: {{ tel.telf }}</div>
      <div
        class="text-body1 text-negative"
        v-if="sobregiro"
      >Sobregiro: ${{ Number(sobregiro).toFixed(2) }}</div>
      <div class="text-body1">Cargo: {{ tel.cargo?.nombre }}</div>
      <div class="text-body1">
        {{ tel.cargo?.departamento?.entidad?.tipo === 'MININT' ? 'Unidad' : 'Departamento' }}:
        {{ tel.cargo?.departamento?.nombre }}
      </div>
      <div class="text-body1">
        {{ tel.cargo?.departamento?.entidad?.tipo === 'MININT' ? 'Órgano' : 'Empresa' }}:
        : {{ tel.cargo?.departamento?.entidad?.nombre }}
      </div>
    </q-card-section>
    <q-card-actions v-if="isAuth && editEnable">
      <q-btn class="full-width" color="primary" @click="edit" icon="mdi-pencil" label="Editar" />
    </q-card-actions>
  </q-card>
</template>

<script lang='ts'>
import { injectStrict, ITel, userModuleKey } from 'src/modules';
import { ROUTE_NAME } from 'src/router';
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { useRouter } from 'vue-router';

/**
 * TelCard
 */
export default defineComponent({
  name: 'TelCard',
  props: {
    tel: {
      type: Object as PropType<ITel>,
      required: true
    },
    sobregiro: {
      type: Number,
      required: false
    },
    editEnable: {
      type: Boolean,
      default: true
    }
  }, setup(_props) {
    const $userModule = injectStrict(userModuleKey);
    const $router = useRouter();
    const { tel } = toRefs(_props);

    const isAuth = computed(() => $userModule.isAuth);

    function edit() {
      void $router.push({ name: ROUTE_NAME.PHONE_FORM, query: { id: tel.value.id } })
    }

    return { ..._props, isAuth, edit }
  }
});
</script>