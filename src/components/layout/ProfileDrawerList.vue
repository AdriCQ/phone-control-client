<template>
  <q-expansion-item class="text-grey-9">
    <template v-slot:header>
      <q-item-section avatar top>
        <q-avatar size="md" icon="mdi-account-settings" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">Perfil</q-item-label>
      </q-item-section>
    </template>
    <q-list class="q-pl-lg">
      <!-- Profile Settings -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.PROFILE_HOME }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-wrench" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Ajustes</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Profile Settings -->

      <!-- Change Password -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAIN }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-account-key" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Cambiar Contraseña</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Change Password -->

      <!-- Exit -->
      <q-item clickable v-ripple @click="logout">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-exit-to-app" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Salir</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Exit -->
    </q-list>
  </q-expansion-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { ROUTE_NAME } from 'src/router';
import { injectStrict, userModuleKey } from 'src/modules';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';
/**
 * BusinessDrawerList
 */
export default defineComponent({
  name: 'BusinessDrawerList',
  setup() {
    const $userModule = injectStrict(userModuleKey);
    const $router = useRouter();

    function logout() {
      Dialog.create({
        title: 'Cerrar Sesión',
        message: 'Está seguro que desea salir?',
        cancel: true,
        ok: true,
      }).onOk(() => {
        $userModule.logout();
        void $router.push({ name: ROUTE_NAME.MAIN });

      })
    }
    return {
      ROUTE_NAME, logout
    }
  }
});
</script>