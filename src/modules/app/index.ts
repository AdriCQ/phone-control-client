import { InjectionKey, ref } from 'vue';

class AppModule {
  /**
   * -----------------------------------------
   *	Left Drawer
   * -----------------------------------------
   */
  private _sidebarOpen = ref(false);
  /**
   * sidebarOpen Setter & Getter
   */
  get sidebarOpen() { return this._sidebarOpen.value }
  set sidebarOpen(_open: boolean) { this._sidebarOpen.value = _open }
  /**
   * toggleSidebar
   */
  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen }
}

export const appModule = new AppModule();
export const appModuleKey: InjectionKey<AppModule> = Symbol('AppModule');