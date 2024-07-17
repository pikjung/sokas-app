// import { getToken } from "../utils/getToken";
// import { getRoleFromToken } from "../utils/auth";
// import { useRouter } from "next/navigation";

// export const adminChecker = () => {
//   const router = useRouter();
//   const token = getToken();
//   if (token) {
//     const userRole = getRoleFromToken(token);
//     if (userRole !== 'admin') {
//       router.push('/admin'); // Redirect to home if not admin
//     }
//   } else {
//     router.push('/admin/login'); // Redirect to login if no token
//   }
// }