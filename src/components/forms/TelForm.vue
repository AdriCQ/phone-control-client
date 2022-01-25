<template>
  <q-card class="no-box-shadow">
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.tel" type="tel" label="Teléfono" />
        <q-input
          v-model="form.presupuesto"
          type="number"
          min="0"
          step="0.01"
          prefix="$"
          label="Presupuesto"
        />
        <q-select v-model="form.servicio" :options="['AUTOMATICO', 'EXTENSION']" label="Servicio" />
        <q-select v-model="form.tipo" :options="['PUBLICO', 'PRIVADO']" label="Tipo" />
        <q-select
          v-model="entidadId"
          :options="entidades"
          option-value="id"
          option-label="nombre"
          label="Seleccione el Órgano"
          map-options
          emit-value
        />
        <q-select
          v-model="lugarId"
          :options="lugares"
          option-value="id"
          option-label="nombre"
          label="Seleccione el Lugar"
          map-options
          emit-value
        />
        <q-select
          v-model="depId"
          :options="departamentos"
          option-value="id"
          option-label="nombre"
          label="Seleccione la Unidad"
          map-options
          emit-value
        />
        <q-select
          v-model="form.cargo_id"
          :options="cargos"
          option-value="id"
          option-label="nombre"
          label="Seleccione el Cargo"
          map-options
          emit-value
        />
        <q-input v-model="form.comentario" type="textarea" label="Comentario" />
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" icon="mdi-check" label="Guardar" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang='ts'>
import { AxiosError } from 'axios';
import { responseHandler } from 'src/helpers';
import { entidadModuleKey, injectStrict, ITel, telModuleKey } from 'src/modules';
import { computed, defineComponent, onBeforeMount, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

/**
 * TelForm
 */
export default defineComponent({
  name: 'TelForm',
  props: {
    updateId: {
      type: Number,
      default: 0
    }
  }, setup(_props) {
    const $telModule = injectStrict(telModuleKey);
    const $entidadModule = injectStrict(entidadModuleKey);
    const $router = useRouter();

    const $props = toRefs(_props);

    onBeforeMount(() => {
      if ($props.updateId.value > 0) {
        $telModule.find(Number($props.updateId.value)).then(_r => {
          form.value = _r;
          entidadId.value = _r.cargo?.departamento?.entidad_id ? _r.cargo?.departamento?.entidad_id : null;
          depId.value = _r.cargo?.dep_id ? _r.cargo?.dep_id : null;
          lugarId.value = _r.cargo?.departamento?.lugar_id ? _r.cargo?.departamento?.lugar_id : null;
        }).catch(_e => { console.log(_e) })
      }
    });
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const cargos = computed(() => $entidadModule.cargos.filter(_car => _car.dep_id === depId.value));
    const departamentos = computed(() => $entidadModule.departamentos.filter(_dep => _dep.entidad_id == entidadId.value && _dep.lugar_id === lugarId.value)
    );
    const depId = ref<null | number>(null);
    const entidades = computed(() => $entidadModule.entidades)
    const entidadId = ref<number | null>(null);

    const form = ref<ITel>({
      cargo_id: 0,
      fecha_alta: new Date(),
      id: 0,
      presupuesto: 0,
      servicio: 'AUTOMATICO',
      tel: '',
      tipo: 'PRIVADO',
      cargo: undefined
    });

    const lugares = computed(() => $entidadModule.lugares);
    const lugarId = ref<null | number>(null);

    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    async function onSubmit() {
      try {
        if (form.value.id > 0) {
          await $telModule.update(form.value.id, form.value)
        } else {
          await $telModule.create(form.value);
        }
        responseHandler.success(['Telefono Guardado']);
        void $router.back();
      } catch (error) {
        responseHandler.axiosError(error as AxiosError);
      }
    }

    return {
      ..._props, cargos, entidadId, entidades, departamentos, depId, form, lugares, lugarId, onSubmit
    }
  }
});
</script>