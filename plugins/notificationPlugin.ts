export default defineNuxtPlugin((nuxtApp) => {
  // Метод для удаления уведомлений
  const removeNotification = (notification: HTMLElement) => {
    notification.parentNode?.removeChild(notification);
  };
  // Метод для инициализации поведения уведомлений
  const initializeNotifications = () => {
    document.querySelectorAll(".notification .delete").forEach(($delete) => {
      const $notification = $delete.parentNode as HTMLElement;
      $delete.addEventListener("click", () => {
        removeNotification($notification);
      });
    });
  };
  return {
    provide: {
      initializeNotifications,
    },
  };
});
