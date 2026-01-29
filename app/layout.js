// import "./globals.css";
// import { ToastProvider } from "@/components/ui/ToastContext";
// import { SessionProvider } from "next-auth/react";

// export const metadata = {
//   title: "Uhrtur - Modern Web & Mobile Apps",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>
//           <ToastProvider>
//             {children}
//           </ToastProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }

import "./globals.css"; // ✅ global CSS must be imported here
import ClientRootLayout from "./ClientRootLayout";

export const metadata = {
  title: "Uhrtur - Modern Web & Mobile Apps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}



