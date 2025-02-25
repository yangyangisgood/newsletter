export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie("auth_token");
  
    if (!token.value && 
      to.path.startsWith("/admin") && 
      to.path !== "/admin/login") {
      return navigateTo("/admin/login");
    }
  });
  