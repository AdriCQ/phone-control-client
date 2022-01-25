<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="text-center">
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="loginForm.nick" type="text" label="Usuario" placeholder="Usuario" />
        <q-input
          v-model="loginForm.password"
          type="password"
          label="Contraseña"
          placeholder="Contraseña"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" icon="mdi-check" label="Iniciar" type="submit" class="full-width" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang='ts'>
import { AxiosError } from 'axios';
import { responseHandler, LocalCrypt } from 'src/helpers';
import { injectStrict, IUserCredentials, userModuleKey } from 'src/modules';
import { defineComponent, ref } from 'vue';

/**
 * AuthLoginForm
 */
export default defineComponent({
  name: 'AuthLoginForm',
  setup() {
    const $userModule = injectStrict(userModuleKey);
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */

    const loginForm = ref<IUserCredentials>({
      nick: '',
      password: '',
      remember: 1,
      service_name: 'gestel'
    });


    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    async function onSubmit() {
      responseHandler.loading();
      try {
        const resp = await $userModule.authLogin({
          password: LocalCrypt(loginForm.value.password),
          nick: loginForm.value.nick,
          remember: 1,
          service_name: 'gestel'
        });
        responseHandler.success([`Bienvenido ${resp.profile.nombre}`]);
      } catch (error) {
        responseHandler.axiosError(error as AxiosError);
      }
      responseHandler.loading(false, 'Verificando Credenciales');
    }

    return {
      loginForm,
      // Methods
      onSubmit
    }
  }
});
</script>