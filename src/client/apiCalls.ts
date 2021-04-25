export const fetchSession = () => fetch('/api/auth/session').then(res => res.json());

export const logoutUser = () => fetch('/api/auth/logout').then(res => res.json());
