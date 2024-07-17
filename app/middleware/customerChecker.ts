// import { getToken } from "../utils/getToken";
// import { getRoleFromToken } from "../utils/auth";
// import useRouter from "next/navigation";

// export const customerChecker = () => {
//   const router = useRouter()
//   const token = getToken();
//   if (token) {
//     const userRole = getRoleFromToken(token);
//     if (userRole !== 'store') {
//       router.push('/'); // Redirect to home if not admin
//     }
//   } else {
//     router.push('/login'); // Redirect to login if no token
//   }
// }