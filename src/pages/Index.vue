<template>
  <q-page padding class="text-grey-9">
    <q-card>
      <q-card-section>
        <div class="text-h6">Sistema Automatizado de Gestión Telefónica</div>
      </q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil velit doloremque similique facilis repellendus. Exercitationem pariatur possimus, ea veritatis quaerat nisi provident dolor ipsam, facere aperiam, ipsum unde! Laborum, officia!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil velit doloremque similique facilis repellendus. Exercitationem pariatur possimus, ea veritatis quaerat nisi provident dolor ipsam, facere aperiam, ipsum unde! Laborum, officia!</p>
          <q-btn
            color="primary"
            icon="mdi-phone-log"
            label="Guía Telefónica"
            :to="{ name: ROUTE_NAME.PHONE_SEARCH }"
          />
        </div>
        <div class="col-xs-12 col-md-4" v-if="!isAuth">
          <login-form />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { injectStrict, userModuleKey } from 'src/modules';
import { computed, defineAsyncComponent, defineComponent } from 'vue';
import { ROUTE_NAME } from 'src/router';
/**
 * PageIndex
 */
export default defineComponent({
  name: 'PageIndex',
  components: {
    'login-form': defineAsyncComponent(() => import('src/components/forms/AuthLogin.vue'))
  },
  setup() {
    const $userModule = injectStrict(userModuleKey);

    const isAuth = computed(() => $userModule.isAuth);

    return {
      isAuth, ROUTE_NAME
    }

  }
});
</script>
