import { InjectionKey, ref } from 'vue';


/**
 * AppModule
 */
class AppModule {
  private _counter = ref(0);
  private _sidebarOpen = ref(false);
  /**
   * Counter Setter & Getter
   */
  get counter() { return this._counter.value }
  set counter(_c: number) { this._counter.value = _c }
  /**
   * sidebarOpen Setter & Getter
   */
  get sidebarOpen() { return this._sidebarOpen.value }
  set sidebarOpen(_open: boolean) { this._sidebarOpen.value = _open }

  setCounter(_time: number, _type: '%' | 's' = '%') {
    if (_type === '%') {
      this.counter = 0;
      const interval = setInterval(() => {
        this.counter += 100 / _time;
        if (this.counter >= 100) {
          this.counter = 0;
          clearInterval(interval);
        }
      }, 1000);
    } else {
      this.counter = _time;
      const interval = setInterval(() => {
        this.counter = this.counter - 1;
        if (this.counter <= 0)
          clearInterval(interval);
      }, 1000);
    }
  }
  /**
   * toggleSidebar
   */
  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen }
}

export const appModule = new AppModule();
export const appModuleKey: InjectionKey<AppModule> = Symbol('AppModule');